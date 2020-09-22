import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'interfaces';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadCard } from 'redux/ducks/card/actions';
import { selectCredentials } from 'redux/ducks/user/selectors';
import { isLoggedIn } from 'utils/auth';
import { cardToHttpCard } from 'utils/card';
import Button from './FormElements/Button';

interface Props {
  card: Card,
  className?: string,
}

const SaveCard: React.FC<Props> = ({ card, className }) => {
  const dispatch = useDispatch();
  const credentials = useSelector(selectCredentials);
  const loggedIn = isLoggedIn(credentials);

  const upload = () => {
    dispatch(uploadCard({ card: cardToHttpCard(card) }));
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
