import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'interfaces';
import styles from './CardCreator.module.scss';
import Button from 'components/FormElements/Button';
import { faPaste, faRecycle } from '@fortawesome/free-solid-svg-icons';
import { cardToHttpCard, cardToRequestCard, HttpRequestCardKey } from 'utils/card';
import { useDispatch, useSelector } from 'react-redux';
import { useBeforeunload } from 'react-beforeunload';
import { setCardCreatorOptions } from 'redux/ducks/cardCreator/actions';
import { initialCardCreatorState } from 'redux/ducks/cardCreator/reducer';
import Motion from 'pages/Motion';
import { HttpCard } from 'interfaces/http';
import Creator from 'components/Creator';
import { selectCardCreatorOptions } from 'redux/ducks/cardCreator/selectors';
import { uploadCard } from 'redux/ducks/card/actions';
import { blobToFile } from 'utils/file';
import htmlToImage from 'html-to-image';

const CardCreatorPage: React.FC = () => {
  const dispatch = useDispatch();
  const cardCreatorOptions = useSelector(selectCardCreatorOptions);
  const cardData = useRef<Card>();
  const [importCard, setImportCard] = useState<HttpCard>(initialCardCreatorState.card);

  useEffect(() => {
    setImportCard(cardCreatorOptions);
  }, [cardCreatorOptions]);

  /**
   * Save the current card creator form state
   */
  const saveOnExit = () => {
    if(cardData.current) {
      const card: HttpCard = cardToHttpCard(cardData.current);
      dispatch(setCardCreatorOptions(card));
    }
  }

  /**
   * Saves the card on page close
   */
  useBeforeunload(saveOnExit);

  /**
   * Saves the card after component unmount
   */
  useEffect(() => saveOnExit, []);

  /**
   * Sets the card data to the defaults
   */
  const resetCardCreatorState = async () => {
    // Change the card prop to the default
    setImportCard(initialCardCreatorState.card);
  }

  const importFromClipboard = () => {
    navigator.clipboard.readText()
      .then((value: string) => {
        setImportCard(JSON.parse(value) as HttpCard);
      })
      .catch(console.error);
  }

  const upload = async (card: Card) => {
    const cardHtml = document.getElementById('card');
    if(cardHtml) {
      const fullBlob = await htmlToImage.toBlob(cardHtml);
      const formData = new FormData();
      const reqCard = await cardToRequestCard(card);

      if(fullBlob) {
        const fullCardImage = blobToFile(fullBlob, `${reqCard.name}_fullCardImage`);
        formData.set('full_card_image', fullCardImage);
        Object.keys(reqCard).forEach(async (k: string) => {
          const key = k as HttpRequestCardKey;
          const value = reqCard[key];
          if(value !== undefined) {
            if((value as File).name) {
              formData.append(key, value as File);
            } else {
              formData.append(key, ''+value);
            }
          }
        });
        dispatch(uploadCard({ card: formData}));
      }
    }
  }

  return (
    <Motion>
      <Creator card={importCard} cardRef={cardData} saveFn={upload}>
        <Button icon={faPaste} className={styles.buttonMargin} onClick={importFromClipboard}>
          {'Import from clipboard'}
        </Button>
        <Button icon={faRecycle} onClick={resetCardCreatorState}>
          {'Reset form'}
        </Button>
      </Creator>
    </Motion>
  )
}

export default CardCreatorPage;
