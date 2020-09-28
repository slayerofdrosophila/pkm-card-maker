import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'interfaces';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCredentials } from 'redux/ducks/user/selectors';
import { isLoggedIn } from 'utils/auth';
import Button from './FormElements/Button';

interface Props {
  card: Card,
  saveFn: (card: Card) => void,
  className?: string,
}

const SaveCard: React.FC<Props> = ({ card, saveFn, className }) => {
  const credentials = useSelector(selectCredentials);
  const loggedIn = isLoggedIn(credentials);

  if(!loggedIn) {
    return null;
  }
  return (
    <Button icon={faSave} className={className} onClick={() => saveFn(card)}>
      Save card
    </Button>
  )
}

export default SaveCard;
