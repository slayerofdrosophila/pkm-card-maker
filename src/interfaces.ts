interface GenericInterface {
  id: number,
  shortName: string,
  name: string,
}

export interface RarityIcon extends GenericInterface {};

export interface Rarity extends GenericInterface {
  types: number[],
  subtypes: number[],
  variations: number[],
}

export interface Variation extends GenericInterface {
  subtypes: number[],
  rarities: number[],
}

export interface Subtype extends GenericInterface {
  types: number[],
  hasVariations: boolean,
  rarities: number[],
}

export interface Set extends GenericInterface {
  number: number,
}

export interface BaseSet extends GenericInterface {
  subSets: Set[],
}

export interface Rotation extends GenericInterface {
  subSets: Set[],
}

export interface Type extends GenericInterface {
  supertype: 'Pokemon' | 'Trainer' | 'Energy',
  hasSubtypes?: boolean,
  subtypeOptional?: boolean,
  hasSubname?: boolean,
  rarities: number[],
  hasWhiteText?: boolean,
}

export interface CardOptions {
  baseSets: BaseSet[],
  rarities: Rarity[],
  variations: Variation[],
  subtypes: Subtype[],
  sets: Set[],
  types: Type[],
  rotations: Rotation[],
  rarityIcons: RarityIcon[],
}

export interface Move {
  id: number,
  name: string,
  damage: number,
  text: string,
  energyCost: Type[],
}

export interface User {
  id: number,
  displayName: string,
  email: string,
  photo: string,
}

export interface Card {
  baseSet?: BaseSet,
  supertype?: string,
  name?: string,
  subname?: string,
  set?: Set,
  image?: string,
  type?: Type,
  cardNumber?: string,
  totalInSet?: string,
  icon?: string,
  hitpoints?: number,
  illustrator?: string,
  weakness?: Type,
  weaknessAmount?: number,
  resistance?: Type,
  resistanceAmount?: number,
  retreatCost?: number,
  subtype?: Subtype,
  moves?: Move[],
  rarity?: Rarity,
  variation?: Variation,
  prevolveName?: string,
  prevolveImage?: string,
  pokedexInfo?: string,
  pokedexEntry?: string,
  description?: string,
  rotation?: Rotation,
  rarityIcon?: RarityIcon,
}

export interface CardOptionsAction {
  type: string,
  payload: {
    errorMessage?: string,
    cardOptions?: CardOptions,
  },
}
