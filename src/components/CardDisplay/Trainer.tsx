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
      {card.illustrator && <span className={styles.illustrator}>{`Illus. ${card.illustrator}`}</span>}
      {card.set && <img src={`/assets/icons_symbols/sets/${card.set.number}_SetIcon_${card.set.shortName}.png`} alt={card.set.name} className={styles.setIcon} />}
      <img src={`/assets/icons_symbols/rotations/${card.rotation?.shortName}.png`} alt={card.rotation?.name} className={styles.rotation} />
      <span className={styles.setNumber}>{`${card.cardNumber || ''}${card.totalInSet ? `/${card.totalInSet}` : ''}`}</span>
      <img src={imagePath} className={styles.image} alt='Custom Card' />
    </div>
  )
}

export default TrainerCard;
