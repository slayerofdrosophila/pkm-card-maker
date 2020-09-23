import React from 'react';
import { CardPreview } from 'interfaces';
import styles from './CardList.module.scss';
import { Link } from 'react-router-dom';
import { formatText } from 'utils/ptcgText';

interface Props {
  cards: CardPreview[],
}

const CardList: React.FC<Props> = ({ cards }) => {
  return (
    <div className={styles.wrapper}>
      {cards.map((card, i) =>
        <Link key={i} to={`/card/${card.id}`} className={styles.card}>
          <img src={card.fullCardImage} className={styles.image} alt={card.name} />
          <span className={styles.name}>{formatText(card.name)}</span>
        </Link>
      )}
    </div>
  )
}

export default CardList;
