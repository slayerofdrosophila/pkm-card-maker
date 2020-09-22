import CardList from 'components/CardList';
import { CardPreview } from 'interfaces';
import Motion from 'pages/Motion';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCards } from 'redux/ducks/card/actions';
import { selectCards } from 'redux/ducks/card/selectors';
import styles from './MyCards.module.scss';

const MyCardsPage: React.FC = () => {
  const dispatch = useDispatch();
  const cards: CardPreview[] = useSelector(selectCards);

  useEffect(() => {
    dispatch(getCards());
  }, [dispatch]);

  return (
    <Motion>
      <div className={styles.wrapper}>
        <h2 className={styles.header}>My Cards</h2>
        <CardList cards={cards} />
      </div>
    </Motion>
  )
}

export default MyCardsPage;
