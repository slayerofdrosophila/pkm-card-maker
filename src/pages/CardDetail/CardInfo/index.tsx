import { Card } from 'interfaces';
import React from 'react';
import { isPokemon } from 'utils/card';
import CardInfoPokemon from './Pokemon';

interface Props {
  card: Card,
}

const CardInfo: React.FC<Props> = ({ card }) => {
  console.log(card);
  return (
    <>
      {isPokemon(card.supertype) && <CardInfoPokemon card={card} />}
      {card.illustrator && <p>Illus. <u>{card.illustrator}</u></p>}
      <p>
        {card.set && card.baseSet && <span>{card.baseSet.name} - {card.set.name}</span>}
        {card.rotation && <span> - {card.rotation.name}</span>}
        {card.cardNumber && <span> - {card.cardNumber}</span>}
        {card.totalInSet && <span>/{card.totalInSet}</span>}
        {card.rarity && <span> - {card.rarity.name}</span>}
      </p>
      {isPokemon(card.supertype) && card.description && <>
        <br />
        <p><i>{card.description}</i></p>
      </>}
    </>
  )
}

export default CardInfo;
