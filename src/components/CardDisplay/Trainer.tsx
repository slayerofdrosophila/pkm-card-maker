import React from 'react';
import { Card } from 'interfaces';
import styles from './CardDisplay.module.scss';
import { formatText } from './index';

interface Props {
  imagePath?: string,
  card: Card,
  research?: boolean,
}

const TrainerCard: React.FC<Props> = ({ imagePath, card, research }) => {
  return (
    <div className={`${styles.card} ${research ? styles.research : ''}`}>
      <span className={styles.name}>{formatText(card.name)}</span>
      <span className={styles.subname}>{formatText(card.subname)}</span>
      <div className={styles.descriptionWrapper}>
        <p className={styles.description}>{formatText(card.description)}</p>
      </div>
      <span className={styles.illustrator}>{card.illustrator ? `Illus. ${card.illustrator}` : ''}</span>
      <img src={imagePath} className={styles.image} alt='Custom Card' />
    </div>
  )
}

export default TrainerCard;
