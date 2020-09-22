import React, { useEffect } from 'react';
import { Card } from 'interfaces';
import styles from './CardDetail.module.scss';
import CardDisplay from 'components/CardDisplay';
import { useDispatch, useSelector } from 'react-redux';
import { selectCardOptions } from 'redux/ducks/cardOptions/selectors';
import Motion from 'pages/Motion';
import CardInfo from './CardInfo';
import { useLocation } from 'react-router-dom';
import { getCard } from 'redux/ducks/card/actions';
import { selectCard } from 'redux/ducks/card/selectors';

const CardDetailPage: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const cardOptions = useSelector(selectCardOptions);
  const card = useSelector(selectCard);

  useEffect(() => {
    dispatch(getCard({
      id: +location.pathname.replace('/card/', ''),
      options: cardOptions,
    }));
  }, [dispatch, location]);

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
