import React, { useState, useEffect } from 'react';
import { State } from 'reducers';
import { connect } from 'react-redux';
import { CardOptionsState } from 'reducers/cardOptions';
import { Variation, Type, Stage, Set, Rarity } from 'interfaces';
import { bindActionCreators } from 'redux';
import { requestCardOptions } from 'actions';
import styles from './CardCreator.module.scss';

interface Props {
  cardOptionsState: CardOptionsState,
  requestCardOptions: () => Object,
}

const CardCreatorPage: React.FC<Props> = ({ cardOptionsState, requestCardOptions }) => {
  const [imagePath, setImagePath] = useState<string>('');
  const [supertype, setSupertype] = useState<string>('Pokemon');
  const [type, setType] = useState<string>();
  const [baseSet, setBaseSet] = useState<string>('SS');
  const [set, setSet] = useState<string>();
  const [variation, setVariation] = useState<string>('default');
  const [stage, setStage] = useState<string>('default');
  const [rarity, setRarity] = useState<string>('default');

  useEffect(() => {
    requestCardOptions();
  }, [requestCardOptions]);

  useEffect(() => {
    setType(cardOptionsState.cardOptions.types[0]?.shortName);
    setSet(cardOptionsState.cardOptions.sets[0]?.shortName);
  }, [cardOptionsState]);

  useEffect(() => {
    const getImage = (fileNameArr: string[]): string => {
      let filePath: string = `/assets/${supertype}/`;
      fileNameArr.forEach((param: string, i: number) => {
        if(param !== '' && param !== 'default') {
          if(i !== 0) {
            filePath += '_';
          }
          filePath += param;
        }
      });
      return filePath + '.png';
    }

    if(supertype && type && baseSet) {
      let imagePath: string;
      switch(supertype) {
        case 'Pokemon':
          imagePath = getImage([baseSet, variation, rarity, stage, type]);
          break;
        case 'Energy':
          imagePath = getImage([baseSet, supertype, type]);
          break;
        case 'Trainer':
          imagePath = getImage([baseSet, supertype, type, variation]);
          break;
        default:
          return;
      }
      setImagePath(imagePath);
    }
  }, [supertype, type, baseSet, set, variation, stage, rarity]);

  return (
    <div>
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
          <select id='type' name='type' onChange={e => setType(e.currentTarget.value)}>
            {cardOptionsState.cardOptions.types.map((value: Type, i: number) =>
              <option value={value.shortName} key={i}>{value.name}</option>
            )}
          </select>
        </label>
        <label htmlFor='baseSet' className={styles.input}>
          <span className={styles.inputLabel}>{'Base Set'}</span>
          <select id='baseSet' name='baseSet' onChange={e => setBaseSet(e.currentTarget.value)}>
            <option value={'SS'}>{'Sword & Shield'}</option>
          </select>
        </label>
        <label htmlFor='set' className={styles.input}>
          <span className={styles.inputLabel}>{'Set'}</span>
          <select id='set' name='set' onChange={e => setSet(e.currentTarget.value)}>
            {cardOptionsState.cardOptions.sets.map((value: Set, i: number) =>
              <option value={value.shortName} key={i}>{value.name}</option>
            )}
          </select>
        </label>
        <label htmlFor='variation' className={styles.input}>
          <span className={styles.inputLabel}>{'Variation'}</span>
          <select id='variation' name='variation' onChange={e => setVariation(e.currentTarget.value)}>
            <option value={'default'}>{'Default'}</option>
            {cardOptionsState.cardOptions.variations.map((value: Variation, i: number) =>
              <option value={value.shortName} key={i}>{value.name}</option>
            )}
          </select>
        </label>
        <label htmlFor='stage' className={styles.input}>
          <span className={styles.inputLabel}>{'Stage'}</span>
          <select id='stage' name='stage' onChange={e => setStage(e.currentTarget.value)}>
            <option value={'default'}>{'Default'}</option>
            {cardOptionsState.cardOptions.stages.map((value: Stage, i: number) =>
              <option value={value.shortName} key={i}>{value.name}</option>
            )}
          </select>
        </label>
        <label htmlFor='rarity' className={styles.input}>
          <span className={styles.inputLabel}>{'Rarity'}</span>
          <select id='rarity' name='rarity' onChange={e => setRarity(e.currentTarget.value)}>
            <option value={'default'}>{'Default'}</option>
            {cardOptionsState.cardOptions.rarities.map((value: Rarity, i: number) =>
              <option value={value.shortName} key={i}>{value.name}</option>
            )}
          </select>
        </label>
      </div>
      <img src={imagePath} alt='Custom Card' />
    </div>
  )
}

const mapStateToProps = (state: State) => ({ cardOptionsState: state.cardOptions });
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ requestCardOptions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CardCreatorPage);
