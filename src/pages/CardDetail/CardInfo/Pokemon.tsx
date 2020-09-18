import { Card, Move } from 'interfaces';
import React from 'react';
import { formatText, moveTypeToText, typeToText } from 'utils/ptcgText';
import styles from '../CardDetail.module.scss';

interface Props {
  card: Card,
}

const CardInfoPokemon: React.FC<Props> = ({ card }) => {
  const formatMove = (move: Move): JSX.Element => <>
    <br />
    <p>
      {move.energyCost.length > 0 &&
        <span className={styles.iconText}>
          {moveTypeToText(move.energyCost)}&nbsp;
        </span>
      }
      <span><b>{move.name}</b></span>
      {move.damage && <span> : {move.damage}</span>}
      {move.text && <p>{formatText(move.text)}</p>}
    </p>
  </>

  return (
    <>
      <p>
        <span><b><u>{formatText(card.name)}</u></b></span>
        <span> - </span>
        <span>{card.hitpoints} HP</span>
        <span> - </span>
        <span className={styles.iconText}>{card.type && typeToText(card.type)}</span>
      </p>
      <p>
        <span>{card.subtype?.name}</span>
        {card.prevolveName && <span> - Evolves from <u>{card.prevolveName}</u></span>}
      </p>
      {card.ability && <>
        <br />
        <p>
          <span><i>Ability</i>: </span>
          <span><b>{card.ability.name}</b></span>
          <p>{formatText(card.ability.text)}</p>
        </p>
      </>}
      {card.move1 && formatMove(card.move1)}
      {card.move2 && formatMove(card.move2)}
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
    </>
  )
}

export default CardInfoPokemon;
