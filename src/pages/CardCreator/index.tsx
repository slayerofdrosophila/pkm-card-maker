import React, { useState, useEffect, useRef } from 'react';
import { State } from 'reducers';
import { connect } from 'react-redux';
import { CardOptionsState } from 'reducers/cardOptions';
import { Variation, Type, Subtype, Set, Rarity, BaseSet } from 'interfaces';
import { bindActionCreators } from 'redux';
import { requestCardOptions } from 'actions';
import styles from './CardCreator.module.scss';

interface Props {
  cardOptionsState: CardOptionsState,
  requestCardOptions: () => Object,
}

interface ImagePathOptions {
  baseSet: string,
  type: string,
  subtype?: string,
  variation?: string,
  rarity?: string,
  supertype?: string,
}

const CardCreatorPage: React.FC<Props> = ({ cardOptionsState, requestCardOptions }) => {
  const [imagePath, setImagePath] = useState<string>('');
  const [supertype, setSupertype] = useState<string>('Pokemon');
  const [type, setType] = useState<Type>();
  const [baseSet, setBaseSet] = useState<BaseSet>();
  const [set, setSet] = useState<Set>();
  const [variation, setVariation] = useState<Variation>();
  const [subtype, setSubtype] = useState<Subtype>();
  const [rarity, setRarity] = useState<Rarity>();
  const typeRef = useRef<HTMLSelectElement>(null);
  const subtypeRef = useRef<HTMLSelectElement>(null);
  const variationRef = useRef<HTMLSelectElement>(null);
  const rarityRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    requestCardOptions();
  }, [requestCardOptions]);

  useEffect(() => {
    setType(cardOptionsState.cardOptions.types[0]);
    setSet(cardOptionsState.cardOptions.sets[0]);
    setBaseSet(cardOptionsState.cardOptions.baseSets[0]);
    setSubtype(cardOptionsState.cardOptions.subtypes[0]);
  }, [cardOptionsState]);

  useEffect(() => {
    // Reset selected options of they are no longer available
    if(typeRef.current) {
      const { selectedIndex, options } = typeRef.current;
      const value: string | undefined = options[selectedIndex]?.value;
      const newType = cardOptionsState.cardOptions.types.filter((a: Type) => a.id === +value)[0];
      if(newType && newType !== type) {
        setType(newType);
      }
    } else {
      setType(undefined);
    }
    if(subtypeRef.current) {
      console.log(subtypeRef.current)
      const { selectedIndex, options } = subtypeRef.current;
      const value: string | undefined = options[selectedIndex]?.value;
      const newSubtype = cardOptionsState.cardOptions.subtypes.filter((a: Subtype) => a.id === +value)[0];
      if(value === 'default' || newSubtype && newSubtype !== subtype) {
        setSubtype(newSubtype);
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
      if(value === 'default' || newRarity && newRarity !== rarity) {
        setRarity(newRarity);
      }
    } else {
      setRarity(undefined);
    }

    const getImage = (options: ImagePathOptions, folder: string | undefined = undefined): string => {
      console.log(options);
      // Format the options according to the formatting defined in the README
      let filePath: string = `/assets/${supertype}/`;
      if(folder) {
        filePath += `${folder}/`;
      }
      Object.values(options).forEach((param: string, i: number) => {
        if(param !== undefined && param !== 'default') {
          if(param === 'Dynamax' && options.rarity === 'Rainbow' ||
            param === 'Gigantamax' && options.rarity === 'Rainbow' ||
            options.rarity === 'Promo' && param === 'Basic') {
            return;
          }
          if(i !== 0) {
            filePath += '_';
          }
          filePath += param;
          if(param === 'Rainbow') {
            if(options.variation === 'Dynamax' || options.variation === 'Gigantamax') {
              filePath += `_${options.variation}`;
            }
          }
          if(param === 'V' && !options.rarity) {
            filePath += '_Basic';
          }
        }
      });
      return `${filePath}.png`;
    }

    if(supertype && type && baseSet) {
      let imagePath: string;
      switch(supertype) {
        case 'Pokemon':
          imagePath = getImage({ baseSet: baseSet.shortName, subtype: subtype?.shortName, variation: variation?.shortName,
            rarity: rarity?.shortName, type: type.shortName }, type.shortName);
          break;
        case 'Energy':
          imagePath = getImage({ baseSet: baseSet.shortName, supertype, type: type.shortName });
          break;
        case 'Trainer':
          imagePath = getImage({ baseSet: baseSet.shortName, supertype, type: type.shortName, subtype: subtype?.shortName });
          break;
        default:
          return;
      }
      setImagePath(imagePath);
    }
  }, [supertype, type, baseSet, set, variation, subtype, rarity]);

  return (
    <div className={styles.wrapper}>
      <div>
        <label htmlFor='supertype' className={styles.input}>
          <span className={styles.inputLabel}>{'Supertype'}</span>
          <select id='supertype' name='supertype' onChange={e => setSupertype(e.currentTarget.value)}>
            <option value={'Pokemon'}>{'Pokémon'}</option>
            <option value={'Trainer'}>{'Trainer'}</option>
            <option value={'Energy'}>{'Energy'}</option>
          </select>
        </label>
        <label htmlFor='type' className={styles.input}>
          <span className={styles.inputLabel}>{'Type'}</span>
          <select ref={typeRef} id='type' name='type'
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
        <label htmlFor='baseSet' className={styles.input}>
          <span className={styles.inputLabel}>{'Base Set'}</span>
          <select id='baseSet' name='baseSet'
            onChange={e => setBaseSet(cardOptionsState.cardOptions.baseSets.filter((a: BaseSet) => a.id === +e.currentTarget.value)[0])}>
            {cardOptionsState.cardOptions.baseSets.map((value: BaseSet, i: number) =>
              <option value={value.id} key={i}>{value.name}</option>
            )}
          </select>
        </label>
        {type?.hasSubtypes && supertype !== 'Energy' &&
          <label htmlFor='subtype' className={styles.input}>
            <span className={styles.inputLabel}>{'Subtype'}</span>
            <select ref={subtypeRef} id='subtype' name='subtype'
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
            <select ref={variationRef} id='variation' name='variation'
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
        {supertype !== 'Energy' && supertype !== 'Trainer' &&
          <label htmlFor='rarity' className={styles.input}>
            <span className={styles.inputLabel}>{'Rarity'}</span>
            <select ref={rarityRef} id='rarity' name='rarity'
              onChange={e => setRarity(cardOptionsState.cardOptions.rarities.filter((a: Rarity) => a.id === +e.currentTarget.value)[0])}>
              <option value={'default'}>{'Default'}</option>
              {cardOptionsState.cardOptions.rarities.map((value: Rarity, i: number) => {
                const includesType: boolean = value.types.includes(type?.id || 0);
                const includesSubtype: boolean = value.subtypes.includes(subtype?.id || 0);
                const includesVariation: boolean = value.variations.includes(variation?.id || 0);
                if((includesType && (includesSubtype || !subtype) && (includesVariation || !variation)
                  || (includesSubtype && (includesVariation || !variation))
                  || includesVariation)) {
                  return <option value={value.id} key={i}>{value.name}</option>;
                } else {
                  return false;
                }
              })}
            </select>
          </label>
        }
        <label htmlFor='set' className={styles.input}>
          <span className={styles.inputLabel}>{'Set'}</span>
          <select id='set' name='set'
            onChange={e => setSet(cardOptionsState.cardOptions.types.filter((a: Set) => a.id === +e.currentTarget.value)[0])}>
            {cardOptionsState.cardOptions.sets.map((value: Set, i: number) =>
              <option value={value.id} key={i}>{value.name}</option>
            )}
          </select>
        </label>
      </div>
      <img src={imagePath} className={styles.card} alt='Custom Card' />
    </div>
  )
}

const mapStateToProps = (state: State) => ({ cardOptionsState: state.cardOptions });
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ requestCardOptions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CardCreatorPage);
