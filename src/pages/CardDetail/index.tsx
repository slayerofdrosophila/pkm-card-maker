import React from 'react';
import { Card, ImportedCard, MoveType, Type } from 'interfaces';
import styles from './CardDetail.module.scss';
import garb from 'garbodor.json';
import CardDisplay from 'components/CardDisplay';
import { importedCardToCard } from 'utils/card';
import { useSelector } from 'react-redux';
import { selectCardOptions } from 'redux/ducks/cardOptions/selectors';
import Motion from 'pages/Motion';

const CardDetailPage: React.FC = () => {
  const cardOptions = useSelector(selectCardOptions);

  const typeToText = (type: Type): string => {
    switch(type.shortName) {
      case 'Grass':
        return 'G';
      case 'Fire':
        return 'R';
      case 'Water':
        return 'W';
      case 'Lightning':
        return 'L';
      case 'Psychic':
        return 'P';
      case 'Fighting':
        return 'F';
      case 'Dark':
        return 'D';
      case 'Metal':
        return 'M';
      case 'Colorless':
        return 'C';
      default:
        return '';
    }
  }

  const moveTypeToText = (moveTypes: MoveType[]): string[] =>
    moveTypes.map((moveType) => {
      let text = '';
      const typeText = typeToText(moveType.type);
      for(let i = 0; i < moveType.amount; i++) {
        text += typeText;
      }
      return text;
    });

  const card: Card = importedCardToCard(garb, cardOptions);

  return (
    <Motion>
      <h2>{card.name}</h2>
      <div className={styles.wrapper}>
      <div className={styles.card}>
        <CardDisplay card={card} />
      </div>
      <div className={styles.info}>
        <p>
          <span>{card.name}</span>
          -
          <span>{card.hitpoints} HP</span>
          -
          <span className={styles.iconText}>{card.type && typeToText(card.type)}</span>
        </p>
        <p>
          <span>{card.subtype?.name}</span>
          {card.prevolveName && <>
            -
            <span>Evolves from {card.prevolveName}</span>
          </>}
        </p>
        <br />
        {card.ability &&
          <p>
            <span><i>Ability</i>: </span>
            <span><b>{card.ability.name}</b></span>
            <p>{card.ability.text}</p>
          </p>
        }
        <br />
        {card.move1 &&
          <p>
            {card.move1.energyCost.length > 0 &&
              <span className={styles.iconText}>
                {moveTypeToText(card.move1.energyCost)}
              </span>
            }
            <span><b>{card.move1.name}</b></span>
            {card.move1.damage && <>
              :
              <span> {card.move1.damage}</span>
            </>}
          </p>
        }
        <br />
        {card.move2 &&
          <p>
            {card.move2.energyCost.length > 0 &&
              <span className={styles.iconText}>
                {moveTypeToText(card.move2.energyCost)}
              </span>
            }
            <span><b>{card.move2.name}</b></span>
            {card.move2.damage && <>
              :
              <span> {card.move2.damage}</span>
            </>}
          </p>
        }
        <br />
        {card.supertype?.shortName === 'Pokemon' && <>
          {card.weaknessType &&
            <p>weakness:
              <span className={styles.iconText}> {typeToText(card.weaknessType)}</span>
              <span> × {card.weaknessAmount}</span>
            </p>
          }
          <p>
            resistance:
            {card.resistanceType && <>
              <span className={styles.iconText}> {typeToText(card.resistanceType)}</span>
              <span> × {card.resistanceAmount}</span>
            </>}
          </p>
          <p>
            retreat:
            <span> {card.retreatCost}</span>
          </p>
        </>}
      </div>
      </div>
    </Motion>
  )
}

export default CardDetailPage;
