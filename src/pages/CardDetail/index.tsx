import React, { useEffect, useState } from 'react';
import styles from './CardDetail.module.scss';
import CardDisplay from 'components/CardDisplay';
import { useDispatch, useSelector } from 'react-redux';
import { selectCardOptions } from 'redux/ducks/cardOptions/selectors';
import Motion from 'pages/Motion';
import CardInfo from './CardInfo';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { deleteCard, getCard } from 'redux/ducks/card/actions';
import { selectCard } from 'redux/ducks/card/selectors';
import { getCardOptions } from 'redux/ducks/cardOptions/actions';
import Button from 'components/FormElements/Button';
import { faDownload, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import download from 'downloadjs';

const CardDetailPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const options = useSelector(selectCardOptions);
  const card = useSelector(selectCard);
  const [cardOptionsRetrieved, setCardOptionsRetrieved] = useState<boolean>(false);
  const [cardRetrieved, setCardRetrieved] = useState<boolean>(false);

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
          id: +location.pathname.replace('/card/', ''),
          options
        }));
        setCardRetrieved(true);
      })();
    }
  }, [dispatch, location, options, cardOptionsRetrieved, cardRetrieved]);

  /**
   * Deletes card from the database
   */
  const remove = () => {
    if(card.id) {
      dispatch(deleteCard({
        id: card.id,
        history,
      }));
    }
  }

  const downloadCard = () => {
    if(card.fullCardImage) {
      download(card.fullCardImage);
    }
  }

  return (
    <Motion>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <CardDisplay card={card} />
        </div>
        <div className={styles.info}>
          <CardInfo card={card} />
          <div className={styles.buttons}>
            <Link to={`/edit/${card.id}`} className={styles.margin}>
              <Button icon={faPen}>Edit</Button>
            </Link>
            <Button onClick={remove} icon={faTrash} className={styles.margin}>Delete</Button>
            <Button onClick={downloadCard} icon={faDownload}>Download</Button>
          </div>
        </div>
      </div>
    </Motion>
  )
}

export default CardDetailPage;
