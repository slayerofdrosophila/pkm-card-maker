import { Card } from 'interfaces';
import React from 'react';
import { formatText } from 'utils/ptcgText';
import styles from '../CardDetail.module.scss';

interface Props {
  card: Card,
}

const CardInfoTrainer: React.FC<Props> = ({ card }) => {

  return (
    <>
      <p>
        <b><u>{formatText(card.name)}</u></b>
      </p>
      <p>
        <span>{card.supertype?.name}</span>
        <span> - {card.type?.name}</span>
        {card.subtype && <span> - {card.subtype?.name}</span>}
      </p>
      {card.subtype?.shortName === 'Tool' && <>
        <br />
        <p>Attach a Pokémon Tool to 1 of your Pokémon that doesn’t already have a Pokémon Tool attached.</p>
      </>}
      {card.description && <>
        <br />
        <p className={styles.multiline}>{formatText(card.description)}</p>
      </>}
      <p>
        {card.type?.shortName === 'Supporter' && <>
          <br />
          <span>You may play only 1 Supporter card during your turn.</span>
        </>}
        {card.type?.shortName === 'Item' && <>
          <br />
          <span>You may play any number of Item cards during your turn.</span>
        </>}
      </p>
    </>
  )
}

export default CardInfoTrainer;
