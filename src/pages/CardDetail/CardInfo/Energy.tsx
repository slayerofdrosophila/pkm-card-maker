import { Card, Move } from 'interfaces';
import React from 'react';
import { formatText } from 'utils/ptcgText';
import styles from '../CardDetail.module.scss';

interface Props {
  card: Card,
}

const CardInfoEnergy: React.FC<Props> = ({ card }) => {

  return (
    <>
      <p>
        <b><u>{formatText(card.name)}</u></b>
      </p>
      <p>
        <span>{card.supertype?.name}</span>
        <span> - {card.type?.name}</span>
      </p>
      {card.description && <>
        <br />
        <p className={styles.multiline}>{formatText(card.description)}</p>
      </>}
    </>
  )
}

export default CardInfoEnergy;
