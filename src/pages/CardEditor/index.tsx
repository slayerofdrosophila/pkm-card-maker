import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'interfaces';
import { cardToHttpCard } from 'utils/card';
import { useDispatch, useSelector } from 'react-redux';
import { initialCardCreatorState } from 'redux/ducks/cardCreator/reducer';
import Motion from 'pages/Motion';
import { HttpCard } from 'interfaces/http';
import Creator from 'components/Creator';
import { useHistory, useLocation } from 'react-router-dom';
import { selectCardOptions } from 'redux/ducks/cardOptions/selectors';
import { getCard, updateCard } from 'redux/ducks/card/actions';
import { selectCard } from 'redux/ducks/card/selectors';
import { getCardOptions } from 'redux/ducks/cardOptions/actions';
import { cardToFormData } from 'utils/creator';

const CardEditorPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const options = useSelector(selectCardOptions);
  const detailCard = useSelector(selectCard);
  const cardData = useRef<Card>();
  const [cardOptionsRetrieved, setCardOptionsRetrieved] = useState<boolean>(false);
  const [cardRetrieved, setCardRetrieved] = useState<boolean>(false);
  const [importCard, setImportCard] = useState<HttpCard>(initialCardCreatorState.card);

  /**
   * Retrieve card option data on page load
   */
  useEffect(() => {
    (async () => {
      await dispatch(getCardOptions());
      setCardOptionsRetrieved(true);
    })();
  }, [dispatch]);

  /**
   * Retrieve card by path id
   */
  useEffect(() => {
    if(cardOptionsRetrieved && !cardRetrieved) {
      (async () => {
        await dispatch(getCard({
          id: +location.pathname.replace('/edit/', ''),
          options
        }));
        setCardRetrieved(true);
      })();
    }
  }, [dispatch, location, options, cardOptionsRetrieved, cardRetrieved]);

  useEffect(() => {
    setImportCard(cardToHttpCard(detailCard));
  }, [detailCard]);

  const save = async (card: Card) => {
    const formData = await cardToFormData(card);
    if(detailCard.id && formData) {
      dispatch(updateCard({
        card: formData,
        id: detailCard.id,
        options,
        history,
      }));
    }
  }

  return (
    <Motion>
      <Creator card={importCard} cardRef={cardData} saveFn={save} />
    </Motion>
  )
}

export default CardEditorPage;
