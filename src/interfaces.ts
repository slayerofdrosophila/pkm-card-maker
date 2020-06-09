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
  hasNameOutline?: boolean,
  hasBlackTopText?: boolean,
}

export interface Variation extends GenericInterface {
  subtypes: number[],
  rarities: number[],
}

export interface Subtype extends GenericInterface {
  types: number[],
  hasVariations: boolean,
  hasPrevolve?: boolean,
  hasDescription?: boolean,
  hasPokedexEntry?: boolean,
  hasWhiteTopText?: boolean,
  hasVStyle?: boolean,
  hasVSymbol?: boolean,
  hasVMaxSymbol?: boolean,
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

export interface MoveType {
  type: Type,
  amount: number,
}

export interface Move {
  name: string,
  damage: string,
  text: string,
  energyCost: MoveType[],
}

export interface Ability {
  name: string,
  text: string,
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
  backgroundImage?: string,
  imageLayer1?: string,
  imageLayer2?: string,
  typeImage?: string,
  type?: Type,
  cardNumber?: string,
  totalInSet?: string,
  icon?: string,
  hitpoints?: number,
  illustrator?: string,
  weaknessType?: Type,
  weaknessAmount?: number,
  resistanceType?: Type,
  resistanceAmount?: number,
  retreatCost: number,
  subtype?: Subtype,
  ability?: Ability,
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
