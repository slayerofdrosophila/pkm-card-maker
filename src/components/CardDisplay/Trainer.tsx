import React from 'react';
import { Card } from 'interfaces';
import styles from './CardDisplay.module.scss';
import { formatText } from './index';

interface Props {
  imagePath?: string,
  card: Card,
}

const TrainerCard: React.FC<Props> = ({ imagePath, card }) => {
  return (
    <div className={styles.card}>
      <span className={styles.name}>{formatText(card.name)}</span>
      <div className={styles.descriptionWrapper}>
        <p className={styles.description}>{formatText(card.description)}</p>
      </div>
      <img src={imagePath} className={styles.image} alt='Custom Card' />
    </div>
  )
}

export default TrainerCard;
