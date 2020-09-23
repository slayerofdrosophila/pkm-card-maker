import { ImagePathOptions, MoveType, Card, CardOptions, Type, Supertype } from "interfaces";
import { HttpCard, HttpMoveType } from "interfaces/http";
import { toCamelCase, toSnakeCase } from "./http";

export const cardToHttpCard = (card: Card): HttpCard => {
  const snakeCard: any = toSnakeCase(card);
  let httpCard: HttpCard = {
    ...snakeCard,
    supertype: snakeCard.supertype?.id,
    base_set: snakeCard.base_set?.id,
    set: snakeCard.set?.id,
    type: snakeCard.type?.id,
    weakness_type: snakeCard.weakness_type?.id,
    resistance_type: snakeCard.resistance_type?.id,
    subtype: snakeCard.subtype?.id,
    rarity: snakeCard.rarity?.id,
    variation: snakeCard.variation?.id,
    rotation: snakeCard.rotation?.id,
    rarity_icon: snakeCard.rarity_icon?.id,
    move1: snakeCard.move1 ? {
      name: snakeCard.move1.name,
      damage: snakeCard.move1.damage,
      text: snakeCard.move1.text,
      energy_cost: snakeCard.move1.energy_cost.map((moveType: MoveType) => ({
        amount: moveType.amount,
        type: moveType.type.id,
      })),
    } : undefined,
    move2: snakeCard.move2 ? {
      name: snakeCard.move2.name,
      damage: snakeCard.move2.damage,
      text: snakeCard.move2.text,
      energy_cost: snakeCard.move2.energy_cost.map((moveType: MoveType) => ({
        amount: moveType.amount,
        type: moveType.type.id,
      })),
    } : undefined,
  };

  // Remove undefined values from object
  type HttpCardKey = keyof HttpCard;
  Object.keys(httpCard).forEach((k: string) => {
    const key = k as HttpCardKey;
    if(httpCard[key] === undefined) {
      delete httpCard[key];
    }
  })

  return httpCard;
}

export const httpCardToCard = (httpCard: HttpCard, options: CardOptions): Card => {
  const camelCard: any = toCamelCase(httpCard);

  let card = {
    ...camelCard,
    baseSet: options.baseSets.find((a) => a.id === camelCard.baseSet),
    supertype: options.supertypes.find((a) => a.id === camelCard.supertype),
    type: options.types.find((a) => a.id === camelCard.type),
    subtype: options.subtypes.find((a) => a.id === camelCard.subtype),
    set: options.sets.find((a) => a.id === camelCard.set),
    weaknessType: options.types.find((a) => a.id === camelCard.weaknessType),
    resistanceType: options.types.find((a) => a.id === camelCard.resistanceType),
    rotation: options.rotations.find((a) => a.id === camelCard.rotation),
    variation: options.variations.find((a) => a.id === camelCard.variation),
    rarity: options.rarities.find((a) => a.id === camelCard.rarity),
    rarityIcon: options.rarityIcons.find((a) => a.id === camelCard.rarityIcon),
  };
  if(camelCard.move1) {
    card.move1 = {
      name: camelCard.move1.name,
      damage: camelCard.move1.damage,
      text: camelCard.move1.text,
      energyCost: httpMoveToMove(camelCard.move1.energyCost, options),
    }
  }
  if(camelCard.move2) {
    card.move2 = {
      name: camelCard.move2.name,
      damage: camelCard.move2.damage,
      text: camelCard.move2.text,
      energyCost: httpMoveToMove(camelCard.move2.energyCost, options),
    }
  }

  // Remove undefined values from object
  type CardKey = keyof Card;
  Object.keys(card).forEach((k: string) => {
    const key = k as CardKey;
    if(card[key] === undefined) {
      delete card[key];
    }
  })

  return card;
}

const cardOptionsToImage = (options: ImagePathOptions, folder?: string, supertype?: string) => {
  // Format the options according to the formatting defined in the README
  let filePath: string = `/assets/${options.supertype || supertype}/`;
  if(folder) {
    filePath += `${folder}/`;
  }
  Object.values(options).forEach((param: string, i: number) => {
    if(param !== undefined && param !== 'default') {
      if((param === 'Dynamax' && options.rarity === 'Rainbow') ||
        (param === 'Gigantamax' && options.rarity === 'Rainbow') ||
        (options.rarity === 'Promo' && param === 'Basic')) {
        return;
      }
      if(i !== 0) {
        filePath += '_';
      }
      filePath += param;
      if(param === 'Rainbow') {
        if(options.variation === 'Dynamax' || options.variation === 'Gigantamax') {
          filePath += `_${options.variation}`;
        }
      }
      if(param === 'V' && !options.rarity) {
        filePath += '_Basic';
      }
    }
  });
  return `${filePath}.png`;
}

export const getCardImage = (options: ImagePathOptions): string => {
  let imagePath: string;
  switch(options.supertype) {
    case 'Pokemon':
      imagePath = cardOptionsToImage({ baseSet: options.baseSet, subtype: options.subtype, variation: options.variation,
        rarity: options.rarity, type: options.type }, options.type, options.supertype);
      break;
    case 'Energy':
      imagePath = cardOptionsToImage({ baseSet: options.baseSet, supertype: options.supertype, type: options.type });
      break;
    case 'Trainer':
      imagePath = cardOptionsToImage({ baseSet: options.baseSet, supertype: options.supertype, type: options.type, subtype: options.subtype });
      break;
    case 'RaidBoss':
      return '/assets/RaidBoss/pikachu.png';
    default:
      imagePath = '';
  }
  return imagePath;
}

const httpMoveToMove = (moveType: HttpMoveType[], options: CardOptions): MoveType[] =>
  moveType.reduce((result: MoveType[], moveType: HttpMoveType) => {
    const newType: Type | undefined = options.types.find((a) => a.id === moveType.type);
    if(newType) {
      result.push({
        amount: moveType.amount,
        type: newType,
      });
    }
    return result;
  }, []);

export const isPokemon = (supertype?: Supertype): boolean => !!(supertype && supertype.shortName === 'Pokemon');
export const isTrainer = (supertype?: Supertype): boolean => !!(supertype && supertype.shortName === 'Trainer');
export const isEnergy = (supertype?: Supertype): boolean => !!(supertype && supertype.shortName === 'Energy');
export const isRaidBoss = (supertype?: Supertype): boolean => !!(supertype && supertype.shortName === 'RaidBoss');
