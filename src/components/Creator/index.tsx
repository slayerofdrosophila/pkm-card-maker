import React, { useState, useEffect, useRef, Dispatch, SetStateAction, MutableRefObject } from 'react';
import { Variation, Type, Subtype, Set, Rarity, BaseSet, Rotation, RarityIcon, MoveType, Card, Supertype } from 'interfaces';
import htmlToImage from 'html-to-image';
import download from 'downloadjs';
import styles from './Creator.module.scss';
import CardDisplay from 'components/CardDisplay';
import { Select, Input, Checkbox, ImageInput, EnergyPicker} from 'components/FormElements';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import getCroppedImg from 'cropImage';
import Button from 'components/FormElements/Button';
import { faFileDownload, faCheckSquare, faRecycle } from '@fortawesome/free-solid-svg-icons';
import { getCardImage, httpCardToCard, isEnergy, isPokemon, isRaidBoss } from 'utils/card';
import { useSelector, useDispatch } from 'react-redux';
import { selectCardOptions } from 'redux/ducks/cardOptions/selectors';
import { getCardOptions } from 'redux/ducks/cardOptions/actions';
import SaveCard from 'components/SaveCard';
import { HttpCard } from 'interfaces/http';

interface Props {
  card: HttpCard,
  cardRef: MutableRefObject<Card | undefined>,
  saveFn: (card: Card) => void,
}

const Creator: React.FC<Props> = ({ card, cardRef, saveFn, children }) => {
  // Redux
  const dispatch = useDispatch();
  const cardOptions = useSelector(selectCardOptions);

  const importingCard = useRef<boolean>(false);
  const initialImported = useRef<boolean>(false);
  const [importingTrigger, setImportingTrigger] = useState<boolean>(false);
  // Selectors
  const [supertype, setSupertype] = useState<Supertype>();
  const [type, setType] = useState<Type>();
  const [baseSet, setBaseSet] = useState<BaseSet>();
  const [set, setSet] = useState<Set>();
  const [rotation, setRotation] = useState<Rotation>();
  const [variation, setVariation] = useState<Variation>();
  const [subtype, setSubtype] = useState<Subtype>();
  const [rarity, setRarity] = useState<Rarity>();
  const [rarityIcon, setRarityIcon] = useState<RarityIcon>();
  const [weaknessType, setWeaknessType] = useState<Type>();
  const [resistanceType, setResistanceType] = useState<Type>();
  const [raidLevel, setRaidLevel] = useState<number>(1);
  // Selector refs
  const baseSetRef = useRef<HTMLSelectElement>(null);
  const supertypeRef = useRef<HTMLSelectElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const subtypeRef = useRef<HTMLSelectElement>(null);
  const variationRef = useRef<HTMLSelectElement>(null);
  const rarityRef = useRef<HTMLSelectElement>(null);
  const setIconRef = useRef<HTMLSelectElement>(null);
  const rotationRef = useRef<HTMLSelectElement>(null);
  const rarityIconRef = useRef<HTMLSelectElement>(null);
  const weaknessTypeRef = useRef<HTMLSelectElement>(null);
  const resistanceTypeRef = useRef<HTMLSelectElement>(null);
  const raidLevelRef = useRef<HTMLSelectElement>(null);
  // Inputs
  const [name, setName] = useState<string>('');
  const [prevolveName, setPrevolveName] = useState<string>('');
  const [hitpoints, setHitpoints] = useState<number>(100);
  const [subname, setSubname] = useState<string>('');
  const [pokedexEntry, setPokedexEntry] = useState<string>('');
  const [weaknessAmount, setWeaknessAmount] = useState<number>(2);
  const [resistanceAmount, setResistanceAmount] = useState<number>(30);
  const [retreatCost, setRetreatCost] = useState<number>(1);
  const [description, setDescription] = useState<string>('');
  const [illustrator, setIllustrator] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [totalCards, setTotalCards] = useState<string>('');
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [cardImage, setCardImage] = useState<string>('');
  const [topImage, setTopImage] = useState<string>('');
  const [typeImage, setTypeImage] = useState<string>('');
  const [prevolveImage, setPrevolveImage] = useState<string>('');
  const [hasCustomSetIcon, setHasCustomSetIcon] = useState<boolean>(false);
  const [customSetIcon, setCustomSetIcon] = useState<string>('');
  // Image cropper
  const [cropArea, setCropArea] = useState<Point>({ x: 0, y: 0 });
  const [cropZoom, setCropZoom] = useState<number>(1);
  const [cropImage, setCropImage] = useState<string>('');
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({ x: 0, y: 0, height: 0, width: 0 });
  const [currentCropSetter, setCurrentCropSetter] = useState<Dispatch<SetStateAction<string>>>();
  // Ability/Moves
  const [hasAbility, setHasAbility] = useState<boolean>(false);
  const [abilityName, setAbilityName] = useState<string>('');
  const [abilityText, setAbilityText] = useState<string>('');
  const [move1Name, setMove1Name] = useState<string>('');
  const [move1Damage, setMove1Damage] = useState<string>('');
  const [move1Text, setMove1Text] = useState<string>('');
  const [move1Cost, setMove1Cost] = useState<MoveType[]>([]);
  const [hasSecondMove, setHasSecondMove] = useState<boolean>(false);
  const [move2Name, setMove2Name] = useState<string>('');
  const [move2Text, setMove2Text] = useState<string>('');
  const [move2Damage, setMove2Damage] = useState<string>('');
  const [move2Cost, setMove2Cost] = useState<MoveType[]>([]);
  const [move3Name, setMove3Name] = useState<string>('');
  const [move3Text, setMove3Text] = useState<string>('');
  const [move3Damage, setMove3Damage] = useState<string>('');

  /**
   * @returns whether the data has been retrieved and intitialized yet
   */
  const dataInitialised = (): boolean => !!supertype;

  /**
   * Retrieve card option cata on page load
   */
  useEffect(() => {
    dispatch(getCardOptions());
  }, [dispatch]);

  /**
   * Initialize selectors from retrieved cardOptions data
   */
  useEffect(() => {
    if(!dataInitialised()) {
      setSupertype(cardOptions.supertypes[0]);
      setType(cardOptions.types[0]);
      setWeaknessType(cardOptions.types[0]);
      setSet(cardOptions.sets[0]);
      setBaseSet(cardOptions.baseSets[0]);
      setSubtype(cardOptions.subtypes[0]);
      setRotation(cardOptions.rotations[0]);
    }
  }, [cardOptions, dataInitialised]);

  /**
   * Changes the types/subtypes etc to the first available one within their parent
   * For example, when Type is 'Item', and you switch Supertype to 'Pokemon', a Pokémon can't be an Item
   * so it switches to the first available Type within 'Pokemon', which is 'Grass'
   */
  const resetSelectors = () => {
    if(supertypeRef.current) {
      const { selectedIndex, options } = supertypeRef.current;
      const value: string | undefined = options[selectedIndex]?.value;
      const newSupertype = cardOptions.supertypes.find((a: Supertype) => a.id === +value);
      if(newSupertype?.id !== supertype?.id) {
        setSupertype(newSupertype);
      }
    } else {
      setSupertype(undefined);
    }
    if(typeRef.current) {
      const { selectedIndex, options } = typeRef.current;
      const value: string | undefined = options[selectedIndex]?.value;
      const newType = cardOptions.types.find((a: Type) => a.id === +value);
      if(newType?.id !== type?.id) {
        setType(newType);
      }
    } else {
      setType(undefined);
    }
    if(subtypeRef.current) {
      const { selectedIndex, options } = subtypeRef.current;
      const value: string | undefined = options[selectedIndex]?.value;
      const newSubtype = cardOptions.subtypes.find((a: Subtype) => a.id === +value);
      if(value === 'default' || (newSubtype?.id !== subtype?.id)) {
        setSubtype(newSubtype);
      }
    } else {
      setSubtype(undefined);
    }
    if(variationRef.current) {
      const { selectedIndex, options } = variationRef.current;
      const value: string | undefined = options[selectedIndex]?.value;
      const newVariation = cardOptions.variations.find((a: Variation) => a.id === +value);
      if(newVariation?.id !== variation?.id) {
        setVariation(newVariation);
      }
    } else {
      setVariation(undefined);
    }
    if(rarityRef.current) {
      const { selectedIndex, options } = rarityRef.current;
      const value: string | undefined = options[selectedIndex]?.value;
      const newRarity = cardOptions.rarities.find((a: Rarity) => a.id === +value);
      if(value === 'default' || (newRarity?.id !== rarity?.id)) {
        setRarity(newRarity);
      }
    } else {
      setRarity(undefined);
    }
  }

  /**
   * Changes the types/subtypes etc to the first available one within their parent
   * For example, when Type is 'Item', and you switch Supertype to 'Pokemon', a Pokémon can't be an Item
   * so it switches to the first available Type within 'Pokemon', which is 'Grass'
   */
  useEffect(() => {
    if(dataInitialised() && !importingCard.current) {
      resetSelectors();
    }
  }, [cardOptions, dataInitialised, resetSelectors, supertype, type, subtype, variation, rarity]);

  /**
   * Turns state data into a Card object
   */
  const makeCard = (): Card => {
    const typePokemon: boolean = isPokemon(supertype);
    const typeEnergy: boolean = isEnergy(supertype);
    const typeRaidBoss: boolean = isRaidBoss(supertype);

    return {
      supertype,
      baseSet,
      type,
      variation,
      subtype,
      rarity,
      name: name || undefined,
      prevolveName: prevolveName || undefined,
      prevolveImage: prevolveImage || undefined,
      hitpoints: hitpoints || undefined,
      subname : subname || undefined,
      typeImage: typeImage || undefined,
      pokedexEntry: pokedexEntry || undefined,
      ability: hasAbility ? {
        name: abilityName,
        text: abilityText,
      } : undefined,
      move1: move1Name ? {
        name: move1Name,
        text: move1Text,
        damage: move1Damage,
        energyCost: move1Cost,
      } : undefined,
      move2: (!hasAbility && hasSecondMove) || typeRaidBoss ? {
        name: move2Name,
        text: move2Text,
        damage: move2Damage,
        energyCost: move2Cost,
      } : undefined,
      move3: move3Name ? {
        name: move3Name,
        text: move3Text,
        damage: move3Damage,
      } : undefined,
      weaknessType: typePokemon ? weaknessType : undefined,
      weaknessAmount: typePokemon ? weaknessAmount : undefined,
      resistanceType: typePokemon ? resistanceType : undefined,
      resistanceAmount: typePokemon ? resistanceAmount : undefined,
      retreatCost: typePokemon ? retreatCost : undefined,
      illustrator: illustrator || undefined,
      cardNumber: cardNumber || undefined,
      totalCards: totalCards || undefined,
      customSetIcon: hasCustomSetIcon && !(typeEnergy && !type?.hasSpecialStyle) && !typeRaidBoss ? customSetIcon : undefined,
      set: !(typeEnergy && !type?.hasSpecialStyle) && !typeRaidBoss ? set : undefined,
      rotation: !(typeEnergy && !type?.hasSpecialStyle) && !typeRaidBoss ? rotation : undefined,
      rarityIcon: !(typeEnergy && !type?.hasSpecialStyle) && !typeRaidBoss ? rarityIcon : undefined,
      description: description || undefined,
      backgroundImage: backgroundImage || undefined,
      cardImage: cardImage || undefined,
      topImage: topImage || undefined,
      raidLevel: typeRaidBoss ? raidLevel : undefined,
    }
  };

  /**
   * Downloads the card as an image to the browser
   */
  const downloadCard = () => {
    const card = document.getElementById('card');
    if(card) {
      htmlToImage.toPng(card)
        .then((dataUrl) => {
          download(dataUrl, `${name || 'card'}${subtype?.hasVSymbol ? ' V' : subtype?.hasVMaxSymbol ? ' VMAX' : ''}.png`);
        })
        .catch(console.error);
    }
  }

  /**
   * Sets all card data, selectors and energy pickers to certain values based on the cardObj parameter
   */
  const importCard = async (cardObj: HttpCard) => {
    const card = httpCardToCard(cardObj, cardOptions);
    importingCard.current = true;
    // Base values
    setName(card.name || '');
    setPrevolveName(card.prevolveName || '');
    setPrevolveImage(card.prevolveImage || '');
    setHitpoints(card.hitpoints || 0);
    setSubname(card.subname || '');
    setTypeImage(card.typeImage || '');
    setPokedexEntry(card.pokedexEntry || '');
    setWeaknessAmount(card.weaknessAmount || 0);
    setResistanceAmount(card.resistanceAmount || 0);
    setRetreatCost(card.retreatCost || 0);
    setIllustrator(card.illustrator || '');
    setCardNumber(card.cardNumber || '');
    setTotalCards(card.totalCards || '');
    setDescription(card.description || '');
    setBackgroundImage(card.backgroundImage || '');
    setCardImage(card.cardImage || '');
    setTopImage(card.topImage || '');
    if(card.customSetIcon) {
      setHasCustomSetIcon(true);
      setCustomSetIcon(card.customSetIcon);
    }
    if(card.ability) {
      setHasAbility(true);
      setAbilityName(card.ability.name);
      setAbilityText(card.ability.text);
    } else {
      setHasAbility(false);
      setAbilityName('');
      setAbilityText('');
    }
    if(card.move1) {
      setMove1Name(card.move1.name);
      setMove1Damage(card.move1.damage);
      setMove1Text(card.move1.text);
      setMove1Cost(card.move1.energyCost);
    } else {
      setMove1Name('');
      setMove1Damage('');
      setMove1Text('');
      setMove1Cost([]);
    }
    if(card.move2) {
      setHasSecondMove(true);
      setMove2Name(card.move2.name);
      setMove2Damage(card.move2.damage);
      setMove2Text(card.move2.text);
      setMove2Cost(card.move2.energyCost);
    } else {
      setMove2Name('');
      setMove2Damage('');
      setMove2Text('');
      setMove2Cost([]);
    }
    if(card.move3) {
      setMove3Name(card.move3.name);
      setMove3Damage(card.move3.damage);
      setMove3Text(card.move3.text);
    } else {
      setMove3Name('');
      setMove3Damage('');
      setMove3Text('');
    }
    // Selectors
    if(card.baseSet) {
      await setBaseSet(card.baseSet);
      if(baseSetRef.current) {
        baseSetRef.current.selectedIndex = Array.from(baseSetRef.current.options).findIndex((t) => +t.value === card.baseSet?.id);
      }
    } else {
      if(baseSetRef.current) {
        baseSetRef.current.selectedIndex = 0;
      }
      await setBaseSet(undefined);
    }
    if(card.supertype) {
      await setSupertype(card.supertype);
      if(supertypeRef.current) {
        supertypeRef.current.selectedIndex = Array.from(supertypeRef.current.options).findIndex((t) => +t.value === card.supertype?.id);
      }
    } else {
      if(supertypeRef.current) {
        supertypeRef.current.selectedIndex = 0;
      }
      await setSupertype(undefined);
    }
    if(card.type) {
      await setType(card.type);
      if(typeRef.current) {
        typeRef.current.selectedIndex = Array.from(typeRef.current.options).findIndex((t) => +t.value === card.type?.id);
      }
    } else {
      if(typeRef.current) {
        typeRef.current.selectedIndex = 0;
      }
      await setType(undefined);
    }
    if(card.subtype) {
      await setSubtype(card.subtype);
      if(subtypeRef.current) {
        subtypeRef.current.selectedIndex = Array.from(subtypeRef.current.options).findIndex((t) => +t.value === card.subtype?.id);
      }
    } else {
      if(subtypeRef.current) {
        subtypeRef.current.selectedIndex = 0;
      }
      await setSubtype(undefined);
    }
    if(card.set) {
      setSet(card.set);
      if(setIconRef.current) {
        setIconRef.current.selectedIndex = Array.from(setIconRef.current.options).findIndex((t) => +t.value === card.set?.id);
      }
    } else {
      if(setIconRef.current) {
        setIconRef.current.selectedIndex = 0;
      }
      setSet(undefined);
    }
    if(card.weaknessType) {
      setWeaknessType(card.weaknessType);
      if(weaknessTypeRef.current) {
        weaknessTypeRef.current.selectedIndex = Array.from(weaknessTypeRef.current.options).findIndex((t) => +t.value === card.weaknessType?.id);
      }
    } else {
      if(weaknessTypeRef.current) {
        weaknessTypeRef.current.selectedIndex = 0;
      }
      setWeaknessType(undefined);
    }
    if(card.resistanceType) {
      setResistanceType(card.resistanceType);
      if(resistanceTypeRef.current) {
        resistanceTypeRef.current.selectedIndex = Array.from(resistanceTypeRef.current.options).findIndex((t) => +t.value === card.resistanceType?.id);
      }
    } else {
      if(resistanceTypeRef.current) {
        resistanceTypeRef.current.selectedIndex = 0;
      }
      setResistanceType(undefined);
    }
    if(card.rotation) {
      setRotation(card.rotation);
      if(rotationRef.current) {
        rotationRef.current.selectedIndex = Array.from(rotationRef.current.options).findIndex((t) => +t.value === card.rotation?.id);
      }
    } else {
      if(rotationRef.current) {
        rotationRef.current.selectedIndex = 0;
      }
      setRotation(undefined);
    }
    if(card.variation) {
      await setVariation(card.variation);
      if(variationRef.current) {
        variationRef.current.selectedIndex = Array.from(variationRef.current.options).findIndex((t) => +t.value === card.variation?.id);
      }
    } else {
      if(variationRef.current) {
        variationRef.current.selectedIndex = 0;
      }
      await setVariation(undefined);
    }
    if(card.rarity) {
      await setRarity(card.rarity);
      if(rarityRef.current) {
        rarityRef.current.selectedIndex = Array.from(rarityRef.current.options).findIndex((t) => +t.value === card.rarity?.id);
      }
    } else {
      if(rarityRef.current) {
        rarityRef.current.selectedIndex = 0;
      }
      await setRarity(undefined);
    }
    if(card.rarityIcon) {
      setRarityIcon(card.rarityIcon);
      if(rarityIconRef.current) {
        rarityIconRef.current.selectedIndex = Array.from(rarityIconRef.current.options).findIndex((t) => +t.value === card.rarityIcon?.id);
      }
    } else {
      if(rarityIconRef.current) {
        rarityIconRef.current.selectedIndex = 0;
      }
      setRarityIcon(undefined);
    }
    if(card.raidLevel) {
      setRaidLevel(card.raidLevel);
      if(raidLevelRef.current) {
        raidLevelRef.current.selectedIndex = Array.from(raidLevelRef.current.options).findIndex((t) => +t.value === card.raidLevel);
      }
    } else {
      if(raidLevelRef.current) {
        raidLevelRef.current.selectedIndex = 0;
      }
      setRaidLevel(1);
    }
    setImportingTrigger(!importingTrigger);
  }

  /**
   * Callback for the function above
   */
  useEffect(() => {
    importingCard.current = false;
  }, [importingTrigger]);

  /**
   * This terrible performance function has to exist for the saveOnExit to work on page change.
   * While componentWillUnmount does not exist yet with React Hooks, this is necessary.
   */
  useEffect(() => {
    cardRef.current = makeCard();
  }, [
    supertype, baseSet, type, variation, subtype, rarity, name, prevolveName, prevolveImage, hitpoints, subname, typeImage, pokedexEntry,
    abilityName, abilityText, move1Name, move1Text, move1Damage, move1Cost, move2Name, move2Text, move2Damage, move2Cost, move3Name, move3Text,
    move3Damage, weaknessType, weaknessAmount, resistanceType, resistanceAmount, retreatCost, illustrator, cardNumber, totalCards, customSetIcon,
    set, rotation, rarityIcon, description, backgroundImage, cardImage, topImage, raidLevel
  ]);

  /**
   * Loads the saved card data from the store
   */
  useEffect(() => {
    if(dataInitialised()) {
      importCard(card);
    }
  }, [card]);

  /**
   * Resets the cropper status
   * @param newImage The new image the cropper should crop
   * @param imageSetter The state set function for the image provided
   */
  const resetCropper = (newImage: string, imageSetter: () => void) => {
    setCropImage(newImage);
    setCurrentCropSetter(imageSetter);
    setCropArea({ x: 0, y: 0});
    setCroppedAreaPixels({ ...croppedAreaPixels, x: 0, y: 0});
    setCropZoom(1);
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.form}>
          {children}
          <div className={styles.seperator}>
            <Select name='Base Set' shortName='baseSet' selectRef={baseSetRef} onChange={e => setBaseSet(cardOptions.baseSets.find((a: BaseSet) => a.id === +e.currentTarget.value))}>
              {cardOptions.baseSets.map((value: BaseSet, i: number) =>
                <option value={value.id} key={i}>{value.name}</option>
              )}
            </Select>
            <Select name='Supertype' shortName='supertype' selectRef={supertypeRef} onChange={e => setSupertype(cardOptions.supertypes.find((a: Supertype) => a.id === +e.currentTarget.value))}>
              {cardOptions.supertypes.map((value: Supertype, i: number) =>
                <option value={value.id} key={i}>{value.name}</option>
              )}
            </Select>
            <Select name='Type' shortName='type' selectRef={typeRef} onChange={e => setType(cardOptions.types.find((a: Type) => a.id === +e.currentTarget.value))}>
              {cardOptions.types.map((value: Type, i: number) => {
                if(!value.supertypes.includes(supertype?.id || 0)) {
                  return false;
                } else {
                  return <option value={value.id} key={i}>{value.name}</option>;
                }
              })}
            </Select>
            {cardOptions.subtypes.filter((value: Subtype) => !!value.types.includes(type?.id || 0)).length !== 0 &&
              <Select name='Subtype' shortName='subtype' selectRef={subtypeRef} onChange={e => setSubtype(cardOptions.subtypes.find((a: Subtype) => a.id === +e.currentTarget.value))}>
                {type && !type?.subtypeRequired && <option value={'default'}>{'Default'}</option>}
                {cardOptions.subtypes.map((value: Subtype, i: number) => {
                  if((type && !value.types.includes(type?.id || 0)) || !value.supertypes.includes(supertype?.id || 0)) {
                    return false;
                  } else {
                    return <option value={value.id} key={i}>{value.name}</option>;
                  }
                })}
              </Select>
            }
            {subtype && subtype?.variations.length !== 0 &&
              <Select name='Variation' shortName='variation' selectRef={variationRef} onChange={e => setVariation(cardOptions.variations.find((a: Variation) => a.id === +e.currentTarget.value))}>
                {cardOptions.variations.map((value: Variation, i: number) => {
                  if(!subtype?.variations.includes(value?.id || 0)) {
                    return false;
                  } else {
                    return <option value={value.id} key={i}>{value.name}</option>;
                  }
                })}
              </Select>
            }
            {(isPokemon(supertype) && (type?.rarities[0] || subtype?.rarities[0])) &&
              <Select name='Rarity' shortName='rarity' selectRef={rarityRef} onChange={e => setRarity(cardOptions.rarities.find((a: Rarity) => a.id === +e.currentTarget.value))}>
                <option value={'default'}>{'Default'}</option>
                {cardOptions.rarities.map((value: Rarity, i: number) => {
                  const includesType: boolean = type?.rarities.includes(value.id) || false;
                  const includesSubtype: boolean = subtype?.rarities.includes(value.id) || false;
                  if((includesType && (includesSubtype || !subtype)) || includesSubtype) {
                    return <option value={value.id} key={i}>{value.name}</option>;
                  } else {
                    return false;
                  }
                })}
              </Select>
            }
            {(!(isEnergy(supertype) && type?.shortName !== 'Special') && !isRaidBoss(supertype)) && <>
              <Select name='Rotation' shortName='rotation' selectRef={rotationRef} onChange={e => setRotation(cardOptions.rotations.find((a: Rotation) => a.id === +e.currentTarget.value))}>
                {cardOptions.rotations.map((value: Rotation, i: number) =>
                  <option value={value.id} key={i}>{value.name}</option>
                )}
              </Select>
              <Select name='Rarity Icon' shortName='rarityIcon' selectRef={rarityIconRef} onChange={e => setRarityIcon(cardOptions.rarityIcons.find((a: RarityIcon) => a.id === +e.currentTarget.value))}>
                <option value={'none'}>{'None'}</option>
                {cardOptions.rarityIcons.map((value: RarityIcon, i: number) =>
                  <option value={value.id} key={i}>{value.name}</option>
                )}
              </Select>
              <Checkbox name='Custom Set Icon' shortName='customSetIcon' checked={hasCustomSetIcon} setter={setHasCustomSetIcon} />
              {hasCustomSetIcon ?
                <ImageInput shortName='customSetIcon' setter={setCustomSetIcon} />
                :
                <Select name='Set Icon' shortName='set' selectRef={setIconRef} onChange={e => setSet(cardOptions.sets.find((a: Set) => a.id === +e.currentTarget.value))}>
                  {cardOptions.sets.map((value: Set, i: number) =>
                    <option value={value.id} key={i}>{value.name}</option>
                  )}
                </Select>
              }
            </>}
            {isRaidBoss(supertype) &&
              <Select name='Raid Level' shortName='raidLevel' selectRef={raidLevelRef} onChange={e => setRaidLevel(+e.currentTarget.value)}>
                <option value={1}>{1}</option>
                <option value={2}>{2}</option>
                <option value={3}>{3}</option>
              </Select>
            }
          </div>
          {!(isEnergy(supertype) && type?.shortName !== 'Special') && <>
            <div className={styles.seperator}>
              <Input type='text' name='Name' shortName='name' value={name} setter={setName} />
              {(isPokemon(supertype) || isRaidBoss(supertype)) &&
                <Input type='number' name='Hitpoints' shortName='hitpoints' value={hitpoints} setter={setHitpoints} min={0} />
              }
              {!isRaidBoss(supertype) && <>
                {subtype?.hasPrevolve && <>
                  <Input type='text' name='Prevolve Name' shortName='prevolveName' value={prevolveName} setter={setPrevolveName} />
                  <ImageInput name='Prevolve Image' shortName='prevolveImage' setter={setPrevolveImage} />
                </>}
                {subtype?.hasPokedexEntry &&
                  <Input type='text' horizontal name='Pokédex Entry' shortName='pokedexEntry' value={pokedexEntry} setter={setPokedexEntry} />
                }
                {type?.hasSubname &&
                  <Input type='text' name='Subname' shortName='subname' value={subname} setter={setSubname} />
                }
              </>}
            </div>
            {((supertype && isPokemon(supertype)) || (supertype && isRaidBoss(supertype))) && <>
              {!isRaidBoss(supertype) &&
                <div className={styles.seperator}>
                  <Checkbox name='Has Ability' shortName='hasAbility' checked={hasAbility} setter={setHasAbility} />
                  {hasAbility && <>
                    <Input type='text' name='Ability Name' shortName='abilityName' value={abilityName} setter={setAbilityName} />
                    <Input type='textarea' name='Ability Text' shortName='abilityText' value={abilityText} setter={setAbilityText} />
                  </>}
                </div>
              }
              <div className={styles.seperator}>
                <Input type='text' name='Move Name' shortName='move1Name' value={move1Name} setter={setMove1Name} />
                <Input type='text' name='Move Damage' shortName='move1Damage' value={move1Damage} setter={setMove1Damage} />
                <Input type='textarea' horizontal name='Move Text' shortName='move1Text' value={move1Text} setter={setMove1Text} />
                {!isRaidBoss(supertype) &&
                  <EnergyPicker label={'Move Cost'} types={cardOptions.types} moveCost={move1Cost} setMoveCost={setMove1Cost} />
                }
              </div>
              {(!hasAbility || isRaidBoss(supertype)) &&
                <div className={styles.seperator}>
                  {!isRaidBoss(supertype) &&
                    <Checkbox name='Has Second Move' shortName='hasSecondMove' checked={hasSecondMove} setter={setHasSecondMove} />
                  }
                  {(hasSecondMove || isRaidBoss(supertype)) && <>
                    <Input type='text' name='Move Name' shortName='move2Name' value={move2Name} setter={setMove2Name} />
                    <Input type='text' name='Move Damage' shortName='move2Damage' value={move2Damage} setter={setMove2Damage} />
                    <Input type='textarea' name='Move Text' shortName='move2Text' value={move2Text} setter={setMove2Text} />
                    {!isRaidBoss(supertype) &&
                      <EnergyPicker label={'Move Cost'} types={cardOptions.types} moveCost={move2Cost} setMoveCost={setMove2Cost} />
                  }
                  </>}
                </div>
              }
              {isRaidBoss(supertype) &&
                <div className={styles.seperator}>
                  <Input type='text' name='Move Name' shortName='move3Name' value={move3Name} setter={setMove3Name} />
                  <Input type='text' name='Move Damage' shortName='move3Damage' value={move3Damage} setter={setMove3Damage} />
                  <Input type='textarea' name='Move Text' shortName='move3Text' value={move3Text} setter={setMove3Text} />
                </div>
              }
            </>}
            {isPokemon(supertype) && <>
              <div className={styles.seperator}>
                <Select name='Weakness Type' shortName='weaknessType' selectRef={weaknessTypeRef} onChange={e => setWeaknessType(cardOptions.types.find((a: Type) => a.id === +e.currentTarget.value))}>
                  {cardOptions.types.map((value: Type, i: number) => {
                    if(!value.isEnergy) {
                      return false;
                    } else {
                      return <option value={value.id} key={i}>{value.name}</option>;
                    }
                  })}
                </Select>
                <Input type='number' name='Weakness Amount' shortName='weaknessAmount' value={weaknessAmount} setter={setWeaknessAmount} max={999} min={0} />
                <Select name='Resistance Type' shortName='resistanceType' selectRef={resistanceTypeRef} onChange={e => setResistanceType(cardOptions.types.find((a: Type) => a.id === +e.currentTarget.value))}>
                  <option value={'none'}>{'None'}</option>
                  {cardOptions.types.map((value: Type, i: number) => {
                    if(!value.isEnergy) {
                      return false;
                    } else {
                      return <option value={value.id} key={i}>{value.name}</option>;
                    }
                  })}
                </Select>
                {resistanceType &&
                  <Input type='number' name='Resistance Amount' shortName='resistanceAmount' value={resistanceAmount} setter={setResistanceAmount} max={999} min={0} />
                }
                <Input type='number' name='Retreat Cost' shortName='retreatCost' value={retreatCost} setter={(newValue: number) => setRetreatCost(Math.round(newValue))} max={5} min={0} />
              </div>
            </>}
            {(!subtype || (subtype?.hasDescription && !isRaidBoss(supertype))) &&
              <div className={styles.seperator}>
                <Input type='textarea' name='Description' shortName='description' value={description} setter={setDescription} />
              </div>
            }
            <div className={styles.seperator}>
              {!isEnergy(supertype) && !isRaidBoss(supertype) &&
                <Input type='text' name='Illustrator' shortName='illustrator' value={illustrator} setter={setIllustrator} />
              }
              <Input type='text' name='Card Number' shortName='cardNumber' value={cardNumber} setter={setCardNumber} />
              {!isRaidBoss(supertype) &&
                <Input type='text' name='Total Cards' shortName='totalCards' value={totalCards} setter={setTotalCards} />
              }
            </div>
          </>}
          <div className={styles.seperator}>
            <span className={styles.info}>{'Card dimensions are 747w × 1038h'}</span>
            {currentCropSetter &&
              <>
                <div className={styles.cropperWrapper}>
                  <Cropper
                    image={cropImage}
                    crop={cropArea}
                    zoom={cropZoom}
                    cropSize={{ width: 320, height: 444.66 }} // Based on aspect ratio
                    maxZoom={100}
                    minZoom={.1}
                    restrictPosition={false}
                    zoomSpeed={.1}
                    aspect={747 / 1038}
                    onCropChange={(location: Point) => setCropArea(location)}
                    onCropComplete={async (croppedArea: Area, cap: Area) => setCroppedAreaPixels(cap)}
                    onZoomChange={(newZoom: number) => setCropZoom(newZoom)}
                  />
                  <img alt='' src={getCardImage({baseSet: baseSet?.shortName, type: type?.shortName, rarity: rarity?.shortName, subtype: subtype?.shortName, supertype: supertype?.shortName, variation: variation?.shortName})} className={styles.cropperImage} />
                </div>
                <Button icon={faCheckSquare} className={styles.buttonMargin} onClick={async () => {
                  const croppedImage = await getCroppedImg(cropImage, croppedAreaPixels);
                  currentCropSetter && currentCropSetter(croppedImage);
                }}>
                  {'Apply crop'}
                </Button>
              </>
            }
            <ImageInput name='Background Image' shortName='backgroundImage' info='Placed behind everything'
              setter={setBackgroundImage}
              croppable cropperSetter={resetCropper}
            />
            <ImageInput name='Card Image' shortName='cardImage' info='Placed in front of background'
              setter={setCardImage}
              croppable cropperSetter={resetCropper}
            />
            <ImageInput name='Top Image' shortName='topImage' info='Placed on top of the card image'
              setter={setTopImage}
              croppable cropperSetter={resetCropper}
            />
            {isEnergy(supertype) &&
              <ImageInput name='Type Image' shortName='typeImage' info="The energy's top right icon" setter={setTypeImage} />
            }
          </div>
          <Button icon={faFileDownload} onClick={downloadCard}>{'Download as image'}</Button>
          <SaveCard card={makeCard()} saveFn={saveFn} className={styles.buttonSave} />
        </div>
        <div className={styles.cardWrapper}>
          <CardDisplay card={makeCard()} />
        </div>
      </div>
    </>
  )
}

export default Creator;
