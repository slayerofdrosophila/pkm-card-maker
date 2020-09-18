import React from 'react';
import { Card } from 'interfaces';
import styles from './CardDetail.module.scss';
import garb from 'garbodor.json';
import CardDisplay from 'components/CardDisplay';
import { importedCardToCard } from 'utils/card';
import { useSelector } from 'react-redux';
import { selectCardOptions } from 'redux/ducks/cardOptions/selectors';
import Motion from 'pages/Motion';
import CardInfo from './CardInfo';

const CardDetailPage: React.FC = () => {
  const cardOptions = useSelector(selectCardOptions);

  const card: Card = importedCardToCard(garb, cardOptions);

  return (
    <Motion>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <CardDisplay card={card} />
        </div>
        <div className={styles.info}>
          <CardInfo card={card} />
        </div>
      </div>
    </Motion>
  )
}

export default CardDetailPage;
