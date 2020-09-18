import CardList from 'components/CardList';
import { CardPreview } from 'interfaces';
import Motion from 'pages/Motion';
import React from 'react';
import styles from './MyCards.module.scss';

const butter: CardPreview = { fullCardImage: 'https://images.pokemontcg.io/sma/SV43.png', id: 1, name: 'NOIIBAT'};

const MyCardsPage: React.FC = () => {
  return (
    <Motion>
      <div className={styles.wrapper}>
        <h2 className={styles.header}>My Cards</h2>
        <CardList cards={[butter, butter, butter, butter, butter, butter, butter, butter, butter, butter, butter, butter, butter, butter, butter, butter]} />
      </div>
    </Motion>
  )
}

export default MyCardsPage;
