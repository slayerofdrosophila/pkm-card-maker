import React, { useState, useEffect } from 'react';
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
          if(param === 'V' && options.rarity === 'default') {
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
          <select id='type' name='type'
            onChange={e => setType(cardOptionsState.cardOptions.types.filter((a: Type) => a.id === +e.currentTarget.value)[0])}>
            {cardOptionsState.cardOptions.types.map((value: Type, i: number) =>
              <option disabled={supertype !== value.supertype} value={value.id} key={i}>{value.name}</option>
            )}
          </select>
        </label>
        <label htmlFor='baseSet' className={styles.input}>
          <span className={styles.inputLabel}>{'Base Set'}</span>
          <select id='baseSet' name='baseSet' disabled={supertype === 'Energy'}
            onChange={e => setBaseSet(cardOptionsState.cardOptions.baseSets.filter((a: BaseSet) => a.id === +e.currentTarget.value)[0])}>
            {cardOptionsState.cardOptions.baseSets.map((value: BaseSet, i: number) =>
              <option value={value.id} key={i}>{value.name}</option>
            )}
          </select>
        </label>
        <label htmlFor='subtype' className={styles.input}>
          <span className={styles.inputLabel}>{'Subtype'}</span>
          <select id='subtype' name='subtype' disabled={!type?.hasSubtypes || supertype === 'Energy'}
            onChange={e => setSubtype(cardOptionsState.cardOptions.subtypes.filter((a: Subtype) => a.id === +e.currentTarget.value)[0])}>
            {type?.subtypeOptional && <option value={'default'}>{'Default'}</option>}
            {cardOptionsState.cardOptions.subtypes.map((value: Subtype, i: number) =>
              <option selected={i === 0} disabled={!value.types.includes(type?.id || 0)} value={value.id} key={i}>{value.name}</option>
            )}
          </select>
        </label>
        <label htmlFor='variation' className={styles.input}>
          <span className={styles.inputLabel}>{'Variation'}</span>
          <select id='variation' name='variation' disabled={supertype === 'Energy' || supertype === 'Trainer'}
            onChange={e => setVariation(cardOptionsState.cardOptions.variations.filter((a: Variation) => a.id === +e.currentTarget.value)[0])}>
            {cardOptionsState.cardOptions.variations.map((value: Variation, i: number) =>
              <option value={value.id} key={i}>{value.name}</option>
            )}
          </select>
        </label>
        <label htmlFor='rarity' className={styles.input}>
          <span className={styles.inputLabel}>{'Rarity'}</span>
          <select id='rarity' name='rarity' disabled={supertype === 'Energy' || supertype === 'Trainer'}
            onChange={e => setRarity(cardOptionsState.cardOptions.rarities.filter((a: Rarity) => a.id === +e.currentTarget.value)[0])}>
            <option value={'default'}>{'Default'}</option>
            {cardOptionsState.cardOptions.rarities.map((value: Rarity, i: number) =>
              <option value={value.id} key={i}>{value.name}</option>
            )}
          </select>
        </label>
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
