import React, { useState, useEffect, useRef } from 'react';
import { State } from 'reducers';
import { connect } from 'react-redux';
import { CardOptionsState } from 'reducers/cardOptions';
import { Variation, Type, Subtype, Set, Rarity, BaseSet, Rotation, RarityIcon, MoveType, Card } from 'interfaces';
import { bindActionCreators } from 'redux';
import { requestCardOptions } from 'actions';
import htmlToImage from 'html-to-image';
import download from 'downloadjs';
import styles from './CardCreator.module.scss';
import CardDisplay from 'components/CardDisplay';
import EnergyPicker from './components/EnergyPicker';
import { relativePathPrefix } from 'services';

interface Props {
  cardOptionsState: CardOptionsState,
  requestCardOptions: () => Object,
}

const CardCreatorPage: React.FC<Props> = ({ cardOptionsState, requestCardOptions }) => {
  const importingCard = useRef<boolean>(false);
  // Selectors
  const [supertype, setSupertype] = useState<string>('Pokemon');
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
  const [totalInSet, setTotalInSet] = useState<string>('');
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [imageLayer1, setImageLayer1] = useState<string>('');
  const [imageLayer2, setImageLayer2] = useState<string>('');
  const [typeImage, setTypeImage] = useState<string>('');
  const [prevolveImage, setPrevolveImage] = useState<string>('');
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

  useEffect(() => {
    requestCardOptions();
  }, [requestCardOptions]);

  useEffect(() => {
    setType(cardOptionsState.cardOptions.types[0]);
    setWeaknessType(cardOptionsState.cardOptions.types[0]);
    setSet(cardOptionsState.cardOptions.sets[0]);
    setBaseSet(cardOptionsState.cardOptions.baseSets[0]);
    setSubtype(cardOptionsState.cardOptions.subtypes[0]);
    setRotation(cardOptionsState.cardOptions.rotations[0]);
  }, [cardOptionsState]);

  /**
   * Changes the types/subtypes etc to the first available one within their parent
   * For example, when Type is 'Item', and you switch Supertype to 'Pokemon', a Pokémon can't be an Item
   * so it switches to the first available Type within 'Pokemon', which is 'Grass'
   */
  useEffect(() => {
    if(importingCard.current) {
      return;
    }
    if(typeRef.current) {
      const { selectedIndex, options } = typeRef.current;
      const value: string | undefined = options[selectedIndex]?.value;
      const newType = cardOptionsState.cardOptions.types.find((a: Type) => a.id === +value);
      if(newType && newType !== type) {
        setType(newType);
      }
    } else {
      setType(undefined);
    }
    if(subtypeRef.current) {
      const { selectedIndex, options } = subtypeRef.current;
      const value: string | undefined = options[selectedIndex]?.value;
      const newSubtype = cardOptionsState.cardOptions.subtypes.find((a: Subtype) => a.id === +value);
      if(value === 'default' || (newSubtype && newSubtype !== subtype)) {
        setSubtype(newSubtype);
      }
    } else {
      setSubtype(undefined);
    }
    if(variationRef.current) {
      const { selectedIndex, options } = variationRef.current;
      const value: string | undefined = options[selectedIndex]?.value;
      const newVariation = cardOptionsState.cardOptions.variations.find((a: Variation) => a.id === +value);
      if(newVariation && newVariation !== variation) {
        setVariation(newVariation);
      }
    } else {
      setVariation(undefined);
    }
    if(rarityRef.current) {
      const { selectedIndex, options } = rarityRef.current;
      const value: string | undefined = options[selectedIndex]?.value;
      const newRarity = cardOptionsState.cardOptions.rarities.find((a: Rarity) => a.id === +value);
      if(value === 'default' || (newRarity && newRarity !== rarity)) {
        setRarity(newRarity);
      }
    } else {
      setRarity(undefined);
    }
  }, [cardOptionsState.cardOptions, supertype, type, subtype, variation, rarity]);

  /**
   * Turns state data into a Card object
   */
  const makeCard = (): Card => ({
    baseSet,
    supertype,
    type,
    set,
    variation,
    subtype,
    rarity,
    name,
    prevolveName,
    prevolveImage,
    hitpoints,
    subname,
    typeImage,
    pokedexEntry,
    ability: hasAbility ? {
      name: abilityName,
      text: abilityText,
    } : undefined,
    moves: [
      {
        name: move1Name,
        text: move1Text,
        damage: move1Damage,
        energyCost: move1Cost,
      },
      ...(!hasAbility && hasSecondMove ? [{
        name: move2Name,
        text: move2Text,
        damage: move2Damage,
        energyCost: move2Cost,
      }] : []),
    ],
    weaknessType,
    weaknessAmount,
    resistanceType,
    resistanceAmount,
    retreatCost,
    illustrator,
    cardNumber,
    totalInSet,
    rotation,
    rarityIcon,
    description,
    backgroundImage,
    imageLayer1,
    imageLayer2,
  });

  const downloadCard = () => {
    const card = document.getElementById('card');
    if(card) {
      htmlToImage.toPng(card)
        .then((dataUrl) => {
          download(dataUrl, `${name || 'card'}.png`);
        })
        .catch(console.error);
    }
  }

  const exportCard = () => {
    navigator.clipboard.writeText(JSON.stringify(makeCard()));
  }

  /**
   * Sets all card data, selectors and energy pickers to certain values based on stringified json
   */
  const importCard = () => {
    navigator.clipboard.readText()
      .then((value: string) => {
        const cardObj = JSON.parse(value);
        importingCard.current = true;
        // Base values
        setName(cardObj.name);
        setPrevolveName(cardObj.prevolveName);
        setPrevolveImage(relativePathPrefix(cardObj.prevolveImage));
        setHitpoints(cardObj.hitpoints);
        setSubname(cardObj.subname);
        setTypeImage(relativePathPrefix(cardObj.typeImage));
        setPokedexEntry(cardObj.pokedexEntry);
        setWeaknessAmount(cardObj.weaknessAmount);
        setResistanceAmount(cardObj.resistanceAmount);
        setRetreatCost(cardObj.retreatCost);
        setIllustrator(cardObj.illustrator);
        setCardNumber(cardObj.cardNumber);
        setTotalInSet(cardObj.totalInSet);
        setDescription(cardObj.description);
        setBackgroundImage(relativePathPrefix(cardObj.backgroundImage));
        setImageLayer1(relativePathPrefix(cardObj.imageLayer1));
        setImageLayer2(relativePathPrefix(cardObj.imageLayer2));
        if(cardObj.ability) {
          setHasAbility(true);
          setAbilityName(cardObj.ability.name);
          setAbilityText(cardObj.ability.text);
        }
        setMove1Name(cardObj.moves[0].name);
        setMove1Damage(cardObj.moves[0].damage);
        setMove1Text(cardObj.moves[0].text);
        setMove1Cost(cardObj.moves[0].energyCost);
        if(cardObj.moves[1]) {
          setHasSecondMove(true);
          setMove2Name(cardObj.moves[1].name);
          setMove2Damage(cardObj.moves[1].damage);
          setMove2Text(cardObj.moves[1].text);
          setMove2Cost(cardObj.moves[1].energyCost);
        }
        // Selectors
        const newBaseSet: BaseSet | undefined = cardOptionsState.cardOptions.baseSets.find((a) => a.id === cardObj.baseSet.id);
        if(newBaseSet) {
          setBaseSet(newBaseSet);
          if(baseSetRef.current && newBaseSet) {
            baseSetRef.current.selectedIndex = cardOptionsState.cardOptions.baseSets.indexOf(newBaseSet);
          }
        } else {
          if(baseSetRef.current) {
            baseSetRef.current.selectedIndex = 0;
          }
          setBaseSet(undefined);
        }
        const newSupertype = cardObj.supertype;
        if(newSupertype) {
          setSupertype(newSupertype);
          if(supertypeRef.current) {
            supertypeRef.current.selectedIndex = Array.from(supertypeRef.current.options).findIndex((t) => t.value === newSupertype);
          }
        } else {
          if(supertypeRef.current) {
            supertypeRef.current.selectedIndex = 0;
          }
          setSupertype('Pokemon');
        }
        const newType: Type | undefined = cardOptionsState.cardOptions.types.find((a) => a.id === cardObj.type.id);
        if(newType) {
          setType(newType);
          if(typeRef.current) {
            typeRef.current.selectedIndex = cardOptionsState.cardOptions.types.indexOf(newType);
          }
        } else {
          if(typeRef.current) {
            typeRef.current.selectedIndex = 0;
          }
          setType(undefined);
        }
        if(cardObj.subtype) {
          const newSubtype: Subtype | undefined = cardOptionsState.cardOptions.subtypes.find((a) => a.id === cardObj.subtype.id);
          if(newSubtype) {
            setSubtype(newSubtype);
            if(subtypeRef.current) {
              subtypeRef.current.selectedIndex = cardOptionsState.cardOptions.subtypes.indexOf(newSubtype);
            }
          }
        } else {
          if(subtypeRef.current) {
            subtypeRef.current.selectedIndex = 0;
          }
          setSubtype(undefined);
        }
        if(cardObj.set) {
          const newSet: Set | undefined = cardOptionsState.cardOptions.sets.find((a) => a.id === cardObj.set.id);
          if(newSet) {
            setSet(newSet);
            if(setIconRef.current) {
              setIconRef.current.selectedIndex = cardOptionsState.cardOptions.sets.indexOf(newSet);
            }
          }
        } else {
          if(setIconRef.current) {
            setIconRef.current.selectedIndex = 0;
          }
          setSubtype(undefined);
        }
        if(cardObj.weaknessType) {
          const newWeaknessType: Type | undefined = cardOptionsState.cardOptions.types.find((a) => a.id === cardObj.weaknessType.id);
          if(newWeaknessType) {
            setWeaknessType(newWeaknessType);
            if(weaknessTypeRef.current) {
              weaknessTypeRef.current.selectedIndex = cardOptionsState.cardOptions.types.indexOf(newWeaknessType);
            }
          }
        } else {
          if(weaknessTypeRef.current) {
            weaknessTypeRef.current.selectedIndex = 0;
          }
          setWeaknessType(undefined);
        }
        if(cardObj.resistanceType) {
          const newResistanceType: Type | undefined = cardOptionsState.cardOptions.types.find((a) => a.id === cardObj.resistanceType.id);
          if(newResistanceType) {
            setResistanceType(newResistanceType);
            if(resistanceTypeRef.current) {
              resistanceTypeRef.current.selectedIndex = cardOptionsState.cardOptions.types.indexOf(newResistanceType);
            }
          }
        } else {
          if(resistanceTypeRef.current) {
            resistanceTypeRef.current.selectedIndex = 0;
          }
          setResistanceType(undefined);
        }
        if(cardObj.rotation) {
          const newRotation: Rotation | undefined = cardOptionsState.cardOptions.rotations.find((a) => a.id === cardObj.rotation.id);
          if(newRotation) {
            setRotation(newRotation);
            if(rotationRef.current) {
              rotationRef.current.selectedIndex = cardOptionsState.cardOptions.rotations.indexOf(newRotation);
            }
          }
        } else {
          if(rotationRef.current) {
            rotationRef.current.selectedIndex = 0;
          }
          setRotation(undefined);
        }
        if(cardObj.variation) {
          const newVariation: Variation | undefined = cardOptionsState.cardOptions.variations.find((a) => a.id === cardObj.variation.id);
          if(newVariation) {
            setVariation(newVariation);
            if(variationRef.current) {
              variationRef.current.selectedIndex = cardOptionsState.cardOptions.variations.indexOf(newVariation);
            }
          }
        } else {
          if(variationRef.current) {
            variationRef.current.selectedIndex = 0;
          }
          setVariation(undefined);
        }
        if(cardObj.rarity) {
          const newRarity: Rarity | undefined = cardOptionsState.cardOptions.rarities.find((a) => a.id === cardObj.rarity.id);
          if(newRarity) {
            setRarity(newRarity);
            if(rarityRef.current) {
              rarityRef.current.selectedIndex = cardOptionsState.cardOptions.rarities.indexOf(newRarity);
            }
          }
        } else {
          if(rarityRef.current) {
            rarityRef.current.selectedIndex = 0;
          }
          setRarity(undefined);
        }
        if(cardObj.rarityIcon) {
          const newRarityIcon: RarityIcon | undefined = cardOptionsState.cardOptions.rarityIcons.find((a) => a.id === cardObj.rarityIcon.id);
          if(newRarityIcon) {
            setRarityIcon(newRarityIcon);
            if(rarityIconRef.current) {
              rarityIconRef.current.selectedIndex = cardOptionsState.cardOptions.rarityIcons.indexOf(newRarityIcon);
            }
          }
        } else {
          if(rarityIconRef.current) {
            rarityIconRef.current.selectedIndex = 0;
          }
          setRarityIcon(undefined);
        }
        importingCard.current = false;
      })
      .catch(console.error);
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <button className={styles.button} onClick={importCard}>Import from clipboard</button>
        <label htmlFor='baseSet' className={styles.input}>
          <span className={styles.inputLabel}>{'Base Set'}</span>
          <select id='baseSet' ref={baseSetRef} name='baseSet' className={styles.inputField}
            onChange={e => setBaseSet(cardOptionsState.cardOptions.baseSets.find((a: BaseSet) => a.id === +e.currentTarget.value))}>
            {cardOptionsState.cardOptions.baseSets.map((value: BaseSet, i: number) =>
              <option value={value.id} key={i}>{value.name}</option>
            )}
          </select>
        </label>
        <label htmlFor='supertype' className={styles.input}>
          <span className={styles.inputLabel}>{'Supertype'}</span>
          <select id='supertype' ref={supertypeRef} name='supertype' className={styles.inputField} onChange={e => setSupertype(e.currentTarget.value)}>
            <option value={'Pokemon'}>{'Pokémon'}</option>
            <option value={'Trainer'}>{'Trainer'}</option>
            <option value={'Energy'}>{'Energy'}</option>
          </select>
        </label>
        <label htmlFor='type' className={styles.input}>
          <span className={styles.inputLabel}>{'Type'}</span>
          <select ref={typeRef} id='type' name='type' className={styles.inputField}
            onChange={e => setType(cardOptionsState.cardOptions.types.find((a: Type) => a.id === +e.currentTarget.value))}>
            {cardOptionsState.cardOptions.types.map((value: Type, i: number) => {
              if(supertype !== value.supertype) {
                return false;
              } else {
                return <option disabled={supertype !== value.supertype} value={value.id} key={i}>{value.name}</option>;
              }
            })}
          </select>
        </label>
        {type?.hasSubtypes && supertype !== 'Energy' &&
          <label htmlFor='subtype' className={styles.input}>
            <span className={styles.inputLabel}>{'Subtype'}</span>
            <select ref={subtypeRef} id='subtype' name='subtype' className={styles.inputField}
              onChange={e => setSubtype(cardOptionsState.cardOptions.subtypes.find((a: Subtype) => a.id === +e.currentTarget.value))}>
              {type?.subtypeOptional && <option value={'default'}>{'Default'}</option>}
              {cardOptionsState.cardOptions.subtypes.map((value: Subtype, i: number) => {
                if(!value.types.includes(type?.id || 0)) {
                  return false;
                } else {
                  return <option value={value.id} key={i}>{value.name}</option>;
                }
              })}
            </select>
          </label>
        }
        {subtype?.hasVariations && supertype !== 'Energy' && supertype !== 'Trainer' &&
          <label htmlFor='variation' className={styles.input}>
            <span className={styles.inputLabel}>{'Variation'}</span>
            <select ref={variationRef} id='variation' name='variation' className={styles.inputField}
              onChange={e => setVariation(cardOptionsState.cardOptions.variations.find((a: Variation) => a.id === +e.currentTarget.value))}>
              {cardOptionsState.cardOptions.variations.map((value: Variation, i: number) => {
                if(!value.subtypes.includes(subtype?.id || 0)) {
                  return false;
                } else {
                  return <option value={value.id} key={i}>{value.name}</option>;
                }
              })}
            </select>
          </label>
        }
        {supertype !== 'Energy' && supertype !== 'Trainer' && (type?.rarities[0] || subtype?.rarities[0] || variation?.rarities[0]) &&
          <label htmlFor='rarity' className={styles.input}>
            <span className={styles.inputLabel}>{'Rarity'}</span>
            <select ref={rarityRef} id='rarity' name='rarity' className={styles.inputField}
              onChange={e => setRarity(cardOptionsState.cardOptions.rarities.find((a: Rarity) => a.id === +e.currentTarget.value))}>
              <option value={'default'}>{'Default'}</option>
              {cardOptionsState.cardOptions.rarities.map((value: Rarity, i: number) => {
                const includesType: boolean = type?.rarities.includes(value.id) || false;
                const includesSubtype: boolean = subtype?.rarities.includes(value.id) || false;
                const includesVariation: boolean = variation?.rarities.includes(value.id) || false;
                if((includesType && (includesSubtype || !subtype) && (includesVariation || !variation))
                  || (includesSubtype && (includesVariation || !variation))
                  || includesVariation) {
                  return <option value={value.id} key={i}>{value.name}</option>;
                } else {
                  return false;
                }
              })}
            </select>
          </label>
        }
        {!(supertype === 'Energy' && type?.shortName !== 'Special') && <>
          <label htmlFor='set' className={styles.input}>
            <span className={styles.inputLabel}>{'Set Icon'}</span>
            <select ref={setIconRef} id='set' name='set' className={styles.inputField}
              onChange={e => setSet(cardOptionsState.cardOptions.sets.find((a: Set) => a.id === +e.currentTarget.value))}>
              {cardOptionsState.cardOptions.sets.map((value: Set, i: number) =>
                <option value={value.id} key={i}>{value.name}</option>
              )}
            </select>
          </label>
          <label htmlFor='rotation' className={styles.input}>
            <span className={styles.inputLabel}>{'Rotation'}</span>
            <select ref={rotationRef} id='rotation' name='rotation' className={styles.inputField}
              onChange={e => setRotation(cardOptionsState.cardOptions.rotations.find((a: Rotation) => a.id === +e.currentTarget.value))}>
              {cardOptionsState.cardOptions.rotations.map((value: Rotation, i: number) =>
                <option value={value.id} key={i}>{value.name}</option>
              )}
            </select>
          </label>
          <label htmlFor='rarityIcon' className={styles.input}>
            <span className={styles.inputLabel}>{'Rarity Icon'}</span>
            <select ref={rarityIconRef} id='rarityIcon' name='rarityIcon' className={styles.inputField}
              onChange={e => setRarityIcon(cardOptionsState.cardOptions.rarityIcons.find((a: RarityIcon) => a.id === +e.currentTarget.value))}>
              <option value={'none'}>{'None'}</option>
              {cardOptionsState.cardOptions.rarityIcons.map((value: RarityIcon, i: number) =>
                <option value={value.id} key={i}>{value.name}</option>
              )}
            </select>
          </label>
          <label htmlFor='name' className={styles.input}>
            <span className={styles.inputLabel}>{'Name'}</span>
            <input type='text' id='name' name='name' className={styles.inputField}
              value={name} onChange={e => setName(e.currentTarget.value)} />
          </label>
          {supertype === 'Pokemon' &&
            <label htmlFor='hitpoints' className={styles.input}>
              <span className={styles.inputLabel}>{'Hitpoints'}</span>
              <input type='number' max='999' min='0' id='hitpoints' name='hitpoints' className={styles.inputField}
                value={hitpoints} onChange={e => setHitpoints(+e.currentTarget.value)} />
            </label>
          }
          {subtype?.hasPrevolve && <>
            <label htmlFor='prevolveName' className={styles.input}>
              <span className={styles.inputLabel}>{'Prevolve Name'}</span>
              <input type='text' id='prevolveName' name='prevolveName' className={styles.inputField}
                value={prevolveName} onChange={e => setPrevolveName(e.currentTarget.value)} />
            </label>
            <label htmlFor='prevolveImage' className={`${styles.input} ${styles.horizontal}`}>
              <span className={styles.inputLabel}>{'Prevolve Image'}</span>
              <input type='file' accept='image/*' id='prevolveImage' name='prevolveImage' className={styles.inputField} onChange={e => {
                if(e.target.files && e.target.files[0]) {
                  setPrevolveImage(window.URL.createObjectURL(e.target.files[0]));
                } else {
                  setPrevolveImage('');
                }
              }} />
          </label>
          </>}
          {subtype?.hasPokedexEntry &&
            <label htmlFor='pokedexEntry' className={`${styles.input} ${styles.horizontal}`}>
              <span className={styles.inputLabel}>{'Pokédex Entry'}</span>
              <input type='text' id='pokedexEntry' name='pokedexEntry' className={styles.inputField}
                value={pokedexEntry} onChange={e => setPokedexEntry(e.currentTarget.value)} />
            </label>
          }
          {type?.hasSubname &&
            <label htmlFor='subname' className={styles.input}>
              <span className={styles.inputLabel}>{'Subname'}</span>
              <input type='text' id='subname' name='subname' className={styles.inputField}
                value={subname} onChange={e => setSubname(e.currentTarget.value)} />
            </label>
          }
          {supertype === 'Pokemon' && <>
            <fieldset className={styles.fieldset}>
              <label htmlFor='hasAbility' className={styles.input}>
                <span className={styles.inputLabel}>{'Has Ability'}</span>
                <input type='checkbox' id='hasAbility' name='hasAbility' className={styles.inputCheckbox}
                  checked={hasAbility} onChange={e => setHasAbility(e.currentTarget.checked)} />
              </label>
              {hasAbility && <>
                <label htmlFor='abilityName' className={styles.input}>
                  <span className={styles.inputLabel}>{'Ability Name'}</span>
                  <input type='text' id='abilityName' name='abilityName' className={styles.inputField}
                    value={abilityName} onChange={e => setAbilityName(e.currentTarget.value)} />
                </label>
                <label htmlFor='abilityText' className={`${styles.input} ${styles.horizontal}`}>
                  <span className={styles.inputLabel}>{'Ability Text'}</span>
                  <textarea id='abilityText' name='abilityText' className={`${styles.inputField} ${styles.inputTextarea}`}
                    value={abilityText} onChange={e => setAbilityText(e.currentTarget.value)}></textarea>
                </label>
              </>}
            </fieldset>
            <fieldset className={styles.fieldset}>
              <label htmlFor='move1Name' className={styles.input}>
                <span className={styles.inputLabel}>{'Move Name'}</span>
                <input type='text' id='move1Name' name='move1Name' className={styles.inputField}
                  value={move1Name} onChange={e => setMove1Name(e.currentTarget.value)} />
              </label>
              <label htmlFor='move1Damage' className={styles.input}>
                <span className={styles.inputLabel}>{'Move Damage'}</span>
                <input type='text' id='move1Damage' name='move1Damage' className={styles.inputField}
                  value={move1Damage} onChange={e => setMove1Damage(e.currentTarget.value)} />
              </label>
              <label htmlFor='move1Text' className={`${styles.input} ${styles.horizontal}`}>
                <span className={styles.inputLabel}>{'Move Text'}</span>
                <textarea id='move1Text' name='move1Text' className={`${styles.inputField} ${styles.inputTextarea}`}
                  value={move1Text} onChange={e => setMove1Text(e.currentTarget.value)}></textarea>
              </label>
              <EnergyPicker label={'Move Cost'} types={cardOptionsState.cardOptions.types} moveCost={move1Cost} setMoveCost={setMove1Cost} />
            </fieldset>
            {!hasAbility && <fieldset className={styles.fieldset}>
              <label htmlFor='hasSecondMove' className={styles.input}>
                <span className={styles.inputLabel}>{'Has Second Move'}</span>
                <input type='checkbox' id='hasSecondMove' name='hasSecondMove' className={styles.inputCheckbox}
                  checked={hasSecondMove} onChange={e => setHasSecondMove(e.currentTarget.checked)} />
              </label>
              {hasSecondMove && <>
                <label htmlFor='move2Name' className={styles.input}>
                  <span className={styles.inputLabel}>{'Move Name'}</span>
                  <input type='text' id='move2Name' name='move2Name' className={styles.inputField}
                    value={move2Name} onChange={e => setMove2Name(e.currentTarget.value)} />
                </label>
                <label htmlFor='move2Damage' className={styles.input}>
                  <span className={styles.inputLabel}>{'Move Damage'}</span>
                  <input type='text' id='move2Damage' name='move2Damage' className={styles.inputField}
                    value={move2Damage} onChange={e => setMove2Damage(e.currentTarget.value)} />
                </label>
                <label htmlFor='move2Text' className={`${styles.input} ${styles.horizontal}`}>
                  <span className={styles.inputLabel}>{'Move Text'}</span>
                  <textarea id='move2Text' name='move2Text' className={`${styles.inputField} ${styles.inputTextarea}`}
                    value={move2Text} onChange={e => setMove2Text(e.currentTarget.value)}></textarea>
                </label>
                <EnergyPicker label={'Move Cost'} types={cardOptionsState.cardOptions.types} moveCost={move2Cost} setMoveCost={setMove2Cost} />
              </>}
            </fieldset>}
            <label htmlFor='weaknessType' className={styles.input}>
              <span className={styles.inputLabel}>{'Weakness Type'}</span>
              <select ref={weaknessTypeRef} id='weaknessType' name='weaknessType' className={styles.inputField}
                onChange={e => setWeaknessType(cardOptionsState.cardOptions.types.find((a: Type) => a.id === +e.currentTarget.value))}>
                {cardOptionsState.cardOptions.types.map((value: Type, i: number) => {
                    if(supertype !== value.supertype) {
                      return false;
                    } else {
                      return <option disabled={supertype !== value.supertype} value={value.id} key={i}>{value.name}</option>;
                    }
                })}
              </select>
            </label>
            <label htmlFor='weaknessAmount' className={styles.input}>
              <span className={styles.inputLabel}>{'Weakness Amount'}</span>
              <input type='number' max='99' min='0' id='weaknessAmount' name='weaknessAmount' className={styles.inputField}
                value={weaknessAmount} onChange={e => setWeaknessAmount(+e.currentTarget.value)} />
            </label>
            <label htmlFor='resistanceType' className={styles.input}>
              <span className={styles.inputLabel}>{'Resistance Type'}</span>
              <select ref={resistanceTypeRef} id='resistanceType' name='resistanceType' className={styles.inputField}
                onChange={e => setResistanceType(cardOptionsState.cardOptions.types.find((a: Type) => a.id === +e.currentTarget.value))}>
                <option value={'none'}>{'None'}</option>
                {cardOptionsState.cardOptions.types.map((value: Type, i: number) => {
                  if(supertype !== value.supertype) {
                    return false;
                  } else {
                    return <option disabled={supertype !== value.supertype} value={value.id} key={i}>{value.name}</option>;
                  }
                })}
              </select>
            </label>
            {resistanceType &&
              <label htmlFor='resistanceAmount' className={styles.input}>
                <span className={styles.inputLabel}>{'Weakness Amount'}</span>
                <input type='number' max='99' min='0' id='resistanceAmount' name='resistanceAmount' className={styles.inputField}
                  value={resistanceAmount} onChange={e => setResistanceAmount(+e.currentTarget.value)} />
              </label>
            }
            <label htmlFor='retreatCost' className={styles.input}>
              <span className={styles.inputLabel}>{'Retreat Cost'}</span>
              <input type='number' max='5' min='0' id='retreatCost' name='retreatCost' className={styles.inputField}
                value={retreatCost} onChange={e => setRetreatCost(+e.currentTarget.value)} />
            </label>
          </>}
          {subtype?.hasDescription &&
            <label htmlFor='description' className={`${styles.input} ${styles.horizontal}`}>
              <span className={styles.inputLabel}>{'Description'}</span>
              <textarea id='description' name='description' className={`${styles.inputField} ${styles.inputTextarea}`}
                value={description} onChange={e => setDescription(e.currentTarget.value)}></textarea>
            </label>
          }
          {supertype !== 'Energy' &&
            <label htmlFor='illustrator' className={styles.input}>
              <span className={styles.inputLabel}>{'Illustrator'}</span>
              <input type='text' id='illustrator' name='illustrator' className={styles.inputField}
                value={illustrator} onChange={e => setIllustrator(e.currentTarget.value)} />
            </label>
          }
          <label htmlFor='cardNumber' className={styles.input}>
            <span className={styles.inputLabel}>{'Card Number'}</span>
            <input type='string' id='cardNumber' name='cardNumber' className={styles.inputField}
              value={cardNumber} onChange={e => setCardNumber(e.currentTarget.value)} />
          </label>
          <label htmlFor='totalInSet' className={styles.input}>
            <span className={styles.inputLabel}>{'Total In Set'}</span>
            <input type='string' id='totalInSet' name='totalInSet' className={styles.inputField}
              value={totalInSet} onChange={e => setTotalInSet(e.currentTarget.value)} />
          </label>
        </>}
        <label htmlFor='backgroundImage' className={`${styles.input} ${styles.horizontal}`}>
          <span className={styles.inputLabel}>{'Background Image'}</span>
          <input type='file' accept='image/*' id='backgroundImage' name='backgroundImage' className={styles.inputField} onChange={e => {
            if(e.target.files && e.target.files[0]) {
              setBackgroundImage(window.URL.createObjectURL(e.target.files[0]));
            } else {
              setBackgroundImage('');
            }
          }} />
        </label>
        <label htmlFor='imageLayer1' className={`${styles.input} ${styles.horizontal}`}>
          <span className={styles.inputLabel}>{'Card Image'}</span>
          <input type='file' accept='image/*' id='imageLayer1' name='imageLayer1' className={styles.inputField} onChange={e => {
            if(e.target.files && e.target.files[0]) {
              setImageLayer1(window.URL.createObjectURL(e.target.files[0]));
            } else {
              setImageLayer1('');
            }
          }} />
        </label>
        <label htmlFor='imageLayer2' className={`${styles.input} ${styles.horizontal}`}>
          <span className={styles.inputLabel}>{'Top Image'}</span>
          <input type='file' accept='image/*' id='imageLayer2' name='imageLayer2' className={styles.inputField} onChange={e => {
            if(e.target.files && e.target.files[0]) {
              setImageLayer2(window.URL.createObjectURL(e.target.files[0]));
            } else {
              setImageLayer2('');
            }
          }} />
        </label>
        {supertype === 'Energy' &&
          <label htmlFor='typeImage' className={`${styles.input} ${styles.horizontal}`}>
            <span className={styles.inputLabel}>{'Type Image'}</span>
            <input type='file' accept='image/*' id='typeImage' name='typeImage' className={styles.inputField} onChange={e => {
              if(e.target.files && e.target.files[0]) {
                setTypeImage(window.URL.createObjectURL(e.target.files[0]));
              } else {
                setTypeImage('');
              }
            }} />
          </label>
        }
        <button className={styles.button} onClick={downloadCard}>Download as image</button>
        <button className={styles.button} onClick={exportCard}>Export to clipboard</button>
      </div>
      <CardDisplay card={makeCard()} />
    </div>
  )
}

const mapStateToProps = (state: State) => ({ cardOptionsState: state.cardOptions });
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ requestCardOptions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CardCreatorPage);
