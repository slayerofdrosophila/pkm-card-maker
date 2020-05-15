import React, { useState, useEffect, useRef } from 'react';
import { State } from 'reducers';
import { connect } from 'react-redux';
import { CardOptionsState } from 'reducers/cardOptions';
import { Variation, Type, Subtype, Set, Rarity, BaseSet, Rotation, RarityIcon, MoveType } from 'interfaces';
import { bindActionCreators } from 'redux';
import { requestCardOptions } from 'actions';
import styles from './CardCreator.module.scss';
import CardDisplay from 'components/CardDisplay';

interface Props {
  cardOptionsState: CardOptionsState,
  requestCardOptions: () => Object,
}

const CardCreatorPage: React.FC<Props> = ({ cardOptionsState, requestCardOptions }) => {
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
  const typeRef = useRef<HTMLSelectElement>(null);
  const subtypeRef = useRef<HTMLSelectElement>(null);
  const variationRef = useRef<HTMLSelectElement>(null);
  const rarityRef = useRef<HTMLSelectElement>(null);
  // Inputs
  const [name, setName] = useState<string>('Garbodor');
  const [prevolveName, setPrevolveName] = useState<string>('Trubbish');
  const [hitpoints, setHitpoints] = useState<number>(120);
  const [subname, setSubname] = useState<string>('');
  const [pokedexEntry, setPokedexEntry] = useState<string>('NO. 569 Trash Heap Pokémon HT: 6\'3" WT: 236.6 lbs');
  const [weaknessAmount, setWeaknessAmount] = useState<number>(2);
  const [resistanceAmount, setResistanceAmount] = useState<number>(30);
  const [retreatCost, setRetreatCost] = useState<number>(2);
  const [description, setDescription] = useState<string>('This Pokémon eats trash, which turns into poison inside its body. The main component of the poison depends on what sort of trash was eaten.');
  const [illustrator, setIllustrator] = useState<string>('tetsuya koizumi');
  const [cardNumber, setcardNumber] = useState<string>('SWSH025');
  const [totalInSet, setTotalInSet] = useState<string>('');
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [imageLayer1, setImageLayer1] = useState<string>('/temp/garb.png');
  const [imageLayer2, setImageLayer2] = useState<string>('');
  const [typeImage, setTypeImage] = useState<string>('');
  const [prevolveImage, setPrevolveImage] = useState<string>('/temp/troembies.png');
  // Ability/Moves
  const [hasAbility, setHasAbility] = useState<boolean>(true);
  const [abilityName, setAbilityName] = useState<string>('Poisonous Puddle');
  const [abilityText, setAbilityText] = useState<string>('Once during your turn, if a Stadium is in play, you may make your opponent\'s Active Pokémon Poisoned.');
  const [move1Name, setMove1Name] = useState<string>('Sludge Bomb');
  const [move1Text, setMove1Text] = useState<string>('');
  const [move1Damage, setMove1Damage] = useState<string>('80');
  const [move1Cost] = useState<MoveType[]>([]);

  useEffect(() => {
    requestCardOptions();
  }, [requestCardOptions]);

  useEffect(() => {
     // Indexes all should be 0
    setType(cardOptionsState.cardOptions.types[1]);
    setWeaknessType(cardOptionsState.cardOptions.types[2]);
    setSet(cardOptionsState.cardOptions.sets[2]);
    setBaseSet(cardOptionsState.cardOptions.baseSets[0]);
    setSubtype(cardOptionsState.cardOptions.subtypes[0]);
    setRotation(cardOptionsState.cardOptions.rotations[0]);
  }, [cardOptionsState]);

  useEffect(() => {
    if(subname && !type?.hasSubname) {
      setSubname('');
    }
  }, [type, subname]);

  useEffect(() => {
    if(typeRef.current) {
      const { selectedIndex, options } = typeRef.current;
      const value: string | undefined = options[selectedIndex]?.value;
      const newType = cardOptionsState.cardOptions.types.filter((a: Type) => a.id === +value)[1];
      if(newType && newType !== type) {
        setType(newType);
      }
    } else {
      setType(undefined);
    }
    if(subtypeRef.current) {
      const { selectedIndex, options } = subtypeRef.current;
      const value: string | undefined = options[selectedIndex]?.value;
      const newSubtype = cardOptionsState.cardOptions.subtypes.filter((a: Subtype) => a.id === +value)[0];
      if(value === 'default' || (newSubtype && newSubtype !== subtype)) {
        setSubtype(cardOptionsState.cardOptions.subtypes[1]); // Should be removed
        // setSubtype(newSubtype);
      }
    } else {
      setSubtype(undefined);
    }
    if(variationRef.current) {
      const { selectedIndex, options } = variationRef.current;
      const value: string | undefined = options[selectedIndex]?.value;
      const newVariation = cardOptionsState.cardOptions.variations.filter((a: Variation) => a.id === +value)[0];
      if(newVariation && newVariation !== variation) {
        setVariation(newVariation);
      }
    } else {
      setVariation(undefined);
    }
    if(rarityRef.current) {
      const { selectedIndex, options } = rarityRef.current;
      const value: string | undefined = options[selectedIndex]?.value;
      const newRarity = cardOptionsState.cardOptions.rarities.filter((a: Rarity) => a.id === +value)[0];
      if(value === 'default' || (newRarity && newRarity !== rarity)) {
        setRarity(newRarity);
      }
    } else {
      setRarity(undefined);
    }
  }, [cardOptionsState.cardOptions, supertype, type, subtype, variation, rarity]);

  return (
    <div className={styles.wrapper}>
      <div>
        <label htmlFor='baseSet' className={styles.input}>
          <span className={styles.inputLabel}>{'Base Set'}</span>
          <select id='baseSet' name='baseSet' className={styles.inputField}
            onChange={e => setBaseSet(cardOptionsState.cardOptions.baseSets.filter((a: BaseSet) => a.id === +e.currentTarget.value)[0])}>
            {cardOptionsState.cardOptions.baseSets.map((value: BaseSet, i: number) =>
              <option value={value.id} key={i}>{value.name}</option>
            )}
          </select>
        </label>
        <label htmlFor='supertype' className={styles.input}>
          <span className={styles.inputLabel}>{'Supertype'}</span>
          <select id='supertype' name='supertype' className={styles.inputField} onChange={e => setSupertype(e.currentTarget.value)}>
            <option value={'Pokemon'}>{'Pokémon'}</option>
            <option value={'Trainer'}>{'Trainer'}</option>
            <option value={'Energy'}>{'Energy'}</option>
          </select>
        </label>
        <label htmlFor='type' className={styles.input}>
          <span className={styles.inputLabel}>{'Type'}</span>
          <select ref={typeRef} id='type' name='type' className={styles.inputField}
            onChange={e => setType(cardOptionsState.cardOptions.types.filter((a: Type) => a.id === +e.currentTarget.value)[0])}>
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
              onChange={e => setSubtype(cardOptionsState.cardOptions.subtypes.filter((a: Subtype) => a.id === +e.currentTarget.value)[0])}>
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
              onChange={e => setVariation(cardOptionsState.cardOptions.variations.filter((a: Variation) => a.id === +e.currentTarget.value)[0])}>
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
              onChange={e => setRarity(cardOptionsState.cardOptions.rarities.filter((a: Rarity) => a.id === +e.currentTarget.value)[0])}>
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
            <select id='set' name='set' className={styles.inputField}
              onChange={e => setSet(cardOptionsState.cardOptions.sets.filter((a: Set) => a.id === +e.currentTarget.value)[0])}>
              {cardOptionsState.cardOptions.sets.map((value: Set, i: number) =>
                <option value={value.id} key={i}>{value.name}</option>
              )}
            </select>
          </label>
          <label htmlFor='rotation' className={styles.input}>
            <span className={styles.inputLabel}>{'Rotation'}</span>
            <select id='rotation' name='rotation' className={styles.inputField}
              onChange={e => setRotation(cardOptionsState.cardOptions.rotations.filter((a: Rotation) => a.id === +e.currentTarget.value)[0])}>
              {cardOptionsState.cardOptions.rotations.map((value: Rotation, i: number) =>
                <option value={value.id} key={i}>{value.name}</option>
              )}
            </select>
          </label>
          <label htmlFor='rarityIcon' className={styles.input}>
            <span className={styles.inputLabel}>{'Rarity Icon'}</span>
            <select id='rarityIcon' name='rarityIcon' className={styles.inputField}
              onChange={e => setRarityIcon(cardOptionsState.cardOptions.rarityIcons.filter((a: RarityIcon) => a.id === +e.currentTarget.value)[0])}>
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
            <label htmlFor='prevolveImage' className={styles.input}>
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
            <label htmlFor='move1Name' className={styles.input}>
              <span className={styles.inputLabel}>{'Move Name'}</span>
              <input type='text' id='move1Name' name='move1Name' className={styles.inputField}
                value={move1Name} onChange={e => setMove1Name(e.currentTarget.value)} />
            </label>
            <label htmlFor='move1Text' className={`${styles.input} ${styles.horizontal}`}>
              <span className={styles.inputLabel}>{'Move Text'}</span>
              <textarea id='move1Text' name='move1Text' className={`${styles.inputField} ${styles.inputTextarea}`}
                value={move1Text} onChange={e => setMove1Text(e.currentTarget.value)}></textarea>
            </label>
            <label htmlFor='move1Damage' className={styles.input}>
              <span className={styles.inputLabel}>{'Move Damage'}</span>
              <input type='text' id='move1Damage' name='move1Damage' className={styles.inputField}
                value={move1Damage} onChange={e => setMove1Damage(e.currentTarget.value)} />
            </label>
            <label htmlFor='retreatCost' className={styles.input}>
              <span className={styles.inputLabel}>{'Retreat Cost'}</span>
              <input type='number' max='5' min='0' id='retreatCost' name='retreatCost' className={styles.inputField}
                value={retreatCost} onChange={e => setRetreatCost(+e.currentTarget.value)} />
            </label>
            <label htmlFor='weaknessType' className={styles.input}>
              <span className={styles.inputLabel}>{'Weakness Type'}</span>
              <select id='weaknessType' name='weaknessType' className={styles.inputField}
                onChange={e => setWeaknessType(cardOptionsState.cardOptions.types.filter((a: Type) => a.id === +e.currentTarget.value)[0])}>
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
              <select id='resistanceType' name='resistanceType' className={styles.inputField}
                onChange={e => setResistanceType(cardOptionsState.cardOptions.types.filter((a: Type) => a.id === +e.currentTarget.value)[0])}>
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
          </>}
          <label htmlFor='description' className={`${styles.input} ${styles.horizontal}`}>
            <span className={styles.inputLabel}>{'Description'}</span>
            <textarea id='description' name='description' className={`${styles.inputField} ${styles.inputTextarea}`}
              value={description} onChange={e => setDescription(e.currentTarget.value)}></textarea>
          </label>
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
              value={cardNumber} onChange={e => setcardNumber(e.currentTarget.value)} />
          </label>
          <label htmlFor='totalInSet' className={styles.input}>
            <span className={styles.inputLabel}>{'Total In Set'}</span>
            <input type='string' id='totalInSet' name='totalInSet' className={styles.inputField}
              value={totalInSet} onChange={e => setTotalInSet(e.currentTarget.value)} />
          </label>
        </>}
        <label htmlFor='backgroundImage' className={styles.input}>
          <span className={styles.inputLabel}>{'Background Image'}</span>
          <input type='file' accept='image/*' id='backgroundImage' name='backgroundImage' className={styles.inputField} onChange={e => {
            if(e.target.files && e.target.files[0]) {
              setBackgroundImage(window.URL.createObjectURL(e.target.files[0]));
            } else {
              setBackgroundImage('');
            }
          }} />
        </label>
        <label htmlFor='imageLayer1' className={styles.input}>
          <span className={styles.inputLabel}>{'Card Image'}</span>
          <input type='file' accept='image/*' id='imageLayer1' name='imageLayer1' className={styles.inputField} onChange={e => {
            if(e.target.files && e.target.files[0]) {
              setImageLayer1(window.URL.createObjectURL(e.target.files[0]));
            } else {
              setImageLayer1('');
            }
          }} />
        </label>
        <label htmlFor='imageLayer2' className={styles.input}>
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
          <label htmlFor='typeImage' className={styles.input}>
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
      </div>
      <CardDisplay card={{
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
      }} />
    </div>
  )
}

const mapStateToProps = (state: State) => ({ cardOptionsState: state.cardOptions });
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ requestCardOptions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CardCreatorPage);
