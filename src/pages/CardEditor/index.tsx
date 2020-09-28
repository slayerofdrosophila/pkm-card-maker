import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'interfaces';
import { cardToHttpCard } from 'utils/card';
import { useDispatch, useSelector } from 'react-redux';
import { initialCardCreatorState } from 'redux/ducks/cardCreator/reducer';
import Motion from 'pages/Motion';
import { HttpCard } from 'interfaces/http';
import Creator from 'components/Creator';
import { useLocation } from 'react-router-dom';
import { selectCardOptions } from 'redux/ducks/cardOptions/selectors';
import { getCard } from 'redux/ducks/card/actions';
import { selectCard } from 'redux/ducks/card/selectors';

const CardEditorPage: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const options = useSelector(selectCardOptions);
  const card = useSelector(selectCard);
  const cardData = useRef<Card>();
  const [importCard, setImportCard] = useState<HttpCard>(initialCardCreatorState.card);

  useEffect(() => {
    const id: number = +location.pathname.replace('/edit/', '');
    if(card.id !== id) {
      dispatch(getCard({ id, options }));
    }
  }, [dispatch, location]);

  useEffect(() => {
    setImportCard(cardToHttpCard(card));
  }, [card]);

  const save = (card: Card) => {
    console.log(card);
  }

  return (
    <Motion>
      <Creator card={importCard} cardRef={cardData} saveFn={save} />
    </Motion>
  )
}

export default CardEditorPage;
