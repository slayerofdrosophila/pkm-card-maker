import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'interfaces';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCardError } from 'redux/ducks/card/selectors';
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
  const error = useSelector(selectCardError);
  const loggedIn = isLoggedIn(credentials);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClick = () => {
    setIsLoading(true);
    saveFn(card);
  }

  useEffect(() => {
    if(error) {
      setIsLoading(false);
    }
  }, [error])

  if(!loggedIn) {
    return null;
  }
  return (
    <Button icon={faSave} isLoading={isLoading} disabled={isLoading} className={className} onClick={onClick}>
      Save card
    </Button>
  )
}

export default SaveCard;
