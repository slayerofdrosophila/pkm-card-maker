import { ImportedCard, Card, Move, MoveType } from 'interfaces';

export const relativePathPrefix = (path: string): string  => `${process.env.REACT_APP_RELATIVE_PREFIX || ''}${path}`;

export const cardToImportedCard = (card: Card): ImportedCard => ({
  supertype: card.supertype,
  name: card.name,
  subname: card.subname,
  backgroundImage: card.backgroundImage,
  imageLayer1: card.imageLayer1,
  imageLayer2: card.imageLayer2,
  typeImage: card.typeImage,
  cardNumber: card.cardNumber,
  totalInSet: card.totalInSet,
  hitpoints: card.hitpoints,
  illustrator: card.illustrator,
  weaknessAmount: card.weaknessAmount,
  resistanceAmount: card.resistanceAmount,
  retreatCost: card.retreatCost,
  ability: card.ability,
  prevolveName: card.prevolveName,
  prevolveImage: card.prevolveImage,
  pokedexEntry: card.pokedexEntry,
  description: card.description,
  baseSetId: card.baseSet?.id,
  setId: card.set?.id,
  typeId: card.type?.id,
  weaknessTypeId: card.weaknessType?.id,
  resistanceTypeId: card.resistanceType?.id,
  subtypeId: card.subtype?.id,
  rarityId: card.rarity?.id,
  variationId: card.variation?.id,
  rotationId: card.rotation?.id,
  rarityIconId: card.rarityIcon?.id,
  moves: card.moves?.map((move: Move) => ({
    name: move.name,
    damage: move.damage,
    text: move.text,
    energyCost: move.energyCost.map((moveType: MoveType) => ({
      amount: moveType.amount,
      typeId: moveType.type.id,
    })),
  })),
});
