import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'interfaces';
import styles from './CardCreator.module.scss';
import Button from 'components/FormElements/Button';
import { faPaste } from '@fortawesome/free-solid-svg-icons';
import { cardToHttpCard, removeImgHttpCard } from 'utils/card';
import { useDispatch, useSelector } from 'react-redux';
import { useBeforeunload } from 'react-beforeunload';
import { setCardCreatorOptions } from 'redux/ducks/cardCreator/actions';
import { initialCardCreatorState } from 'redux/ducks/cardCreator/reducer';
import Motion from 'pages/Motion';
import { HttpCard, HttpCardNoImg } from 'interfaces/http';
import Creator from 'components/Creator';
import { selectCardCreatorOptions } from 'redux/ducks/cardCreator/selectors';
import { uploadCard } from 'redux/ducks/card/actions';
import { cardToFormData } from 'utils/creator';
import { useHistory } from 'react-router-dom';

const CardCreatorPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cardCreatorOptions = useSelector(selectCardCreatorOptions);
  const cardData = useRef<Card>();
  const [importCard, setImportCard] = useState<HttpCard>(initialCardCreatorState.card);

  /**
   * Load the previously saved card from the state
   */
  useEffect(() => {
    setImportCard(cardCreatorOptions);
  }, [cardCreatorOptions]);

  /**
   * Save the current card creator form state
   */
  const saveOnExit = () => {
    if(cardData.current) {
      const card: HttpCardNoImg = removeImgHttpCard(cardToHttpCard(cardData.current));
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

  const importFromClipboard = () => {
    navigator.clipboard.readText()
      .then((value: string) => {
        setImportCard(JSON.parse(value) as HttpCard);
      })
      .catch(console.error);
  }

  /**
   * The function that will be called upon pressing the 'Save Card' button.
   * Uploads the card to the database
   * @param card The card to upload
   */
  const upload = async (card: Card) => {
    const formData = await cardToFormData(card);
    if(formData) {
      dispatch(uploadCard({
        card: formData,
        history,
      }));
    }
  }

  return (
    <Motion>
      <Creator card={importCard} cardRef={cardData} saveFn={upload} withReset>
        <Button icon={faPaste} className={styles.buttonMargin} onClick={importFromClipboard}>
          {'Import from clipboard'}
        </Button>
      </Creator>
    </Motion>
  )
}

export default CardCreatorPage;
