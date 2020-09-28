import { ImagePathOptions, MoveType, Card, CardOptions, Type, Supertype } from "interfaces";
import { HttpCard, HttpCardNoImg, HttpMoveType, HttpRequestCard } from "interfaces/http";
import { fetchImage } from "services/http/image";
import { blobToFile } from "./file";
import { toCamelCase, toSnakeCase } from "./http";

type HttpCardKey = keyof HttpCard;
export const cardToHttpCardWithImg = async (card: Card): Promise<HttpCard> => {
  const httpCard = cardToHttpCard(card);

  const cardName: string = card.name || 'card';

  if(card.backgroundImage) {
    const res = await fetchImage(card.backgroundImage);
    if((res as Blob).type) {
      httpCard.background_image = blobToFile(res as Blob, `${cardName}_backgroundImage`);
    }
  }
  if(card.cardImage) {
    const res = await fetchImage(card.cardImage);
    if((res as Blob).type) {
      httpCard.card_image = blobToFile(res as Blob, `${cardName}_cardImage`);
    }
  }
  if(card.topImage) {
    const res = await fetchImage(card.topImage);
    if((res as Blob).type) {
      httpCard.top_image = blobToFile(res as Blob, `${cardName}_topImage`);
    }
  }
  if(card.typeImage) {
    const res = await fetchImage(card.typeImage);
    if((res as Blob).type) {
      httpCard.type_image = blobToFile(res as Blob, `${cardName}_typeImage`);
    }
  }
  if(card.prevolveImage) {
    const res = await fetchImage(card.prevolveImage);
    if((res as Blob).type) {
      httpCard.prevolve_image = blobToFile(res as Blob, `${cardName}_prevolveImage`);
    }
  }
  if(card.customSetIcon) {
    const res = await fetchImage(card.customSetIcon);
    if((res as Blob).type) {
      httpCard.custom_set_icon = blobToFile(res as Blob, `${cardName}_customSetIcon`);
    }
  }

  return httpCard;
}

export const cardToHttpCard = (card: Card) => {
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
   Object.keys(httpCard).forEach((k: string) => {
    const key = k as HttpCardKey;
    if(httpCard[key] === undefined) {
      delete httpCard[key];
    }
  });

  return httpCard;
}

type CardKey = keyof Card;
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
  Object.keys(card).forEach((k: string) => {
    const key = k as CardKey;
    if(card[key] === undefined) {
      delete card[key];
    }
  });

  return card;
}

export const httpCardToCardWithImg = async (httpCard: HttpCard, options: CardOptions) => {
  const card = httpCardToCard(httpCard, options);
  if(card.cardImage) {
    const img = await fetchImage(card.cardImage)
    if((img as Blob).type) {
      card.cardImage = URL.createObjectURL(img);
    }
  }
  if(card.backgroundImage) {
    const img = await fetchImage(card.backgroundImage);
    if((img as Blob).type) {
      card.backgroundImage = URL.createObjectURL(img);
    }
  }
  if(card.topImage) {
    const img = await fetchImage(card.topImage);
    if((img as Blob).type) {
      card.topImage = URL.createObjectURL(img);
    }
  }
  if(card.customSetIcon) {
    const img = await fetchImage(card.customSetIcon);
    if((img as Blob).type) {
      card.customSetIcon = URL.createObjectURL(img);
    }
  }
  if(card.prevolveImage) {
    const img = await fetchImage(card.prevolveImage);
    if((img as Blob).type) {
      card.prevolveImage = URL.createObjectURL(img);
    }
  }
  if(card.typeImage) {
    const img = await fetchImage(card.typeImage);
    if((img as Blob).type) {
      card.typeImage = URL.createObjectURL(img);
    }
  }

  return card;
}

export type HttpRequestCardKey = keyof HttpRequestCard;
export const httpToRequestCard = (card: HttpCard): HttpRequestCard => {
  const reqCard: HttpRequestCard = {
    ...card,
    ability: card.ability ? JSON.stringify(card.ability) : undefined,
    move1: card.move1 ? JSON.stringify(card.move1) : undefined,
    move2: card.move2 ? JSON.stringify(card.move2) : undefined,
    move3: card.move3 ? JSON.stringify(card.move3) : undefined,
  }

  return reqCard;
}

export const cardToRequestCard = async (card: Card): Promise<HttpRequestCard> => {
  const httpCard = await cardToHttpCardWithImg(card);
  return httpToRequestCard(httpCard);
}

export const removeImgHttpCard = (card: HttpCard): HttpCardNoImg => {
  const noImg: HttpCard = {...card};
  delete noImg.background_image;
  delete noImg.card_image;
  delete noImg.top_image;
  delete noImg.type_image;
  delete noImg.custom_set_icon;
  delete noImg.prevolve_image;
  delete noImg.full_card_image;
  return noImg as HttpCardNoImg;
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
