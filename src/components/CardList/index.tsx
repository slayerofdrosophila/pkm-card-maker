import React from 'react';
import { CardPreview } from 'interfaces';
import styles from './CardList.module.scss';
import { Link } from 'react-router-dom';

interface Props {
  cards: CardPreview[],
}

const CardList: React.FC<Props> = ({ cards }) => {
  return (
    <div className={styles.wrapper}>
      {cards.map((card) =>
        <Link to={`/card/${card.id}`} className={styles.card}>
          <img src={card.fullCardImage} className={styles.image} alt={card.name} />
          <span className={styles.name}>{card.name}</span>
        </Link>
      )}
    </div>
  )
}

export default CardList;
