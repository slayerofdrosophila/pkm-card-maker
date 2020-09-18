import React from 'react';
import { Card, ImportedCard } from 'interfaces';
import styles from './CardDetail.module.scss';
import garb from 'garbodor.json';
import CardDisplay from 'components/CardDisplay';
import { importedCardToCard } from 'utils/card';
import { useSelector } from 'react-redux';
import { selectCardOptions } from 'redux/ducks/cardOptions/selectors';
import Motion from 'pages/Motion';

const card: ImportedCard = garb;

const CardDetailPage: React.FC = () => {
  const cardOptions = useSelector(selectCardOptions);

  return (
    <Motion>
      <h2>{card.name}</h2>
      <div className={styles.card}>
        <CardDisplay card={importedCardToCard(card, cardOptions)} />
      </div>
    </Motion>
  )
}

export default CardDetailPage;
