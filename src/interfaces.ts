export interface Rarity {
  id: number,
  shortName: string,
  name: string,
  types: number[],
  subtypes: number[],
  variations: number[],
}

export interface Variation {
  id: number,
  shortName: string,
  name: string,
  subtypes: number[],
}

export interface Subtype {
  id: number,
  shortName: string,
  name: string,
  types: number[],
  hasVariations: boolean,
}

export interface Set {
  id: number,
  shortName: string,
  name: string,
}

export interface BaseSet {
  id: number,
  shortName: string,
  name: string,
  subSets: Set[],
}

export interface Type {
  id: number,
  shortName: string,
  name: string,
  supertype: 'Pokemon' | 'Trainer' | 'Energy',
  hasSubtypes: boolean,
  subtypeOptional: boolean | undefined,
}

export interface CardOptions {
  baseSets: BaseSet[],
  rarities: Rarity[],
  variations: Variation[],
  subtypes: Subtype[],
  sets: Set[],
  types: Type[],
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
  setNumber?: number,
  totalInSet?: number,
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
}

export interface CardOptionsAction {
  type: string,
  payload: {
    errorMessage?: string,
    cardOptions?: CardOptions,
  },
}
