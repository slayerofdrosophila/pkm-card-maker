import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'interfaces';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadCard } from 'redux/ducks/card/actions';
import { selectCredentials } from 'redux/ducks/user/selectors';
import { isLoggedIn } from 'utils/auth';
import { HttpRequestCardKey, cardToRequestCard } from 'utils/card';
import Button from './FormElements/Button';

interface Props {
  card: Card,
  className?: string,
}

const SaveCard: React.FC<Props> = ({ card, className }) => {
  const dispatch = useDispatch();
  const credentials = useSelector(selectCredentials);
  const loggedIn = isLoggedIn(credentials);

  const upload = async () => {
    const formData = new FormData();
    const reqCard = await cardToRequestCard(card);
    await Object.keys(reqCard).forEach(async (k: string) => {
      const key = k as HttpRequestCardKey;
      const value = reqCard[key];
      if(value !== undefined) {
        if((value as File).name) {
          formData.append(key, value as File);
          formData.set('full_card_image', value as File);
        } else {
          formData.append(key, ''+value);
        }
      }
    });
    dispatch(uploadCard({ card: formData}));
  }

  if(!loggedIn) {
    return null;
  }
  return (
    <Button icon={faSave} className={className} onClick={upload}>
      Save card
    </Button>
  )
}

export default SaveCard;
