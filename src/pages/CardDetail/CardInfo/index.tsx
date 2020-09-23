import { Card } from 'interfaces';
import React from 'react';
import { isEnergy, isPokemon, isTrainer } from 'utils/card';
import CardInfoEnergy from './Energy';
import CardInfoPokemon from './Pokemon';
import CardInfoTrainer from './Trainer';

interface Props {
  card: Card,
}

const CardInfo: React.FC<Props> = ({ card }) => {
  return (
    <>
      {isPokemon(card.supertype) && <CardInfoPokemon card={card} />}
      {isTrainer(card.supertype) && <CardInfoTrainer card={card} />}
      {isEnergy(card.supertype) && <CardInfoEnergy card={card} />}
      <br />
      {card.illustrator && !(isEnergy(card.supertype) && card.subtype?.shortName !== 'Special') && <p>Illus. <u>{card.illustrator}</u></p>}
      <p>
        {card.set && card.baseSet && <span>{card.baseSet.name} - {card.set.name}</span>}
        {card.rotation && <span> - {card.rotation.name}</span>}
        {card.cardNumber && <span> - {card.cardNumber}</span>}
        {card.totalCards && <span>/{card.totalCards}</span>}
        {card.rarityIcon && <span> - {card.rarityIcon.name}</span>}
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
