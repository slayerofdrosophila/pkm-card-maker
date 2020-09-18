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
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <CardDisplay card={card} />
        </div>
        <div className={styles.info}>
          <p>
            <span><b><u>{card.name}</u></b></span>
            <span> - </span>
            <span>{card.hitpoints} HP</span>
            <span> - </span>
            <span className={styles.iconText}>{card.type && typeToText(card.type)}</span>
          </p>
          <p>
            <span>{card.subtype?.name}</span>
            {card.prevolveName && <>
              -
              <span>Evolves from <u>{card.prevolveName}</u></span>
            </>}
          </p>
          {card.ability && <>
            <br />
            <p>
              <span><i>Ability</i>: </span>
              <span><b>{card.ability.name}</b></span>
              <p>{card.ability.text}</p>
            </p>
          </>}
          {card.move1 && <>
            <br />
            <p>
              {card.move1.energyCost.length > 0 &&
                <span className={styles.iconText}>
                  {moveTypeToText(card.move1.energyCost)}&nbsp;
                </span>
              }
              <span><b>{card.move1.name}</b></span>
              {card.move1.damage && <>
                :
                <span> {card.move1.damage}</span>
              </>}
            </p>
          </>}
          {card.move2 && <>
            <br />
            <p>
              {card.move2.energyCost.length > 0 &&
                <span className={styles.iconText}>
                  {moveTypeToText(card.move2.energyCost)}&nbsp;
                </span>
              }
              <span><b>{card.move2.name}</b></span>
              {card.move2.damage && <>
                :
                <span> {card.move2.damage}</span>
              </>}
            </p>
          </>}
          {card.supertype?.shortName === 'Pokemon' && <>
            <br />
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
          <br />
          {card.illustrator &&
            <p>Illus. <u>{card.illustrator}</u></p>
          }
          <p>
            {card.set && card.baseSet &&
              <span>{card.baseSet.name} - {card.set.name}</span>
            }
            {card.rotation &&
              <span> - {card.rotation.name}</span>
            }
            {card.cardNumber &&
              <span> - {card.cardNumber}</span>
            }
            {card.totalInSet &&
              <span>/{card.totalInSet}</span>
            }
            {card.rarity &&
              <span> - {card.rarity.name}</span>
            }
          </p>
          {card.description && <>
            <br />
            <p><i>{card.description}</i></p>
          </>}
        </div>
      </div>
    </Motion>
  )
}

export default CardDetailPage;
