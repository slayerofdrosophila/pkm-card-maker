interface Card {
  id: number,
  name: string,
  set: Set,
  image: string,
  type: Type,
  setNumber: number,
  totalInSet: number,
}

export interface Rarity {
  id: number,
  shortName: string,
  name: string,
}

export interface Variation {
  id: number,
  shortName: string,
  name: string,
}

export interface Stage {
  id: number,
  shortName: string,
  name: string,
}

export interface Set {
  id: number,
  shortName: string,
  name: string,
}

export interface Type {
  id: number,
  shortName: string,
  name: string,
}

export interface CardOptions {
  rarities: Rarity[],
  variations: Variation[],
  stages: Stage[],
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

export interface Trainer extends Card {
  text: string,
  artist: string,
  rarity?: Rarity,
  variation?: Variation,
}

export interface Energy extends Card {
  icon: string,
}

export interface Pokemon extends Card {
  hitpoints: number,
  artist: string,
  weakness: Type,
  weaknessAmount: number,
  resistance: Type,
  resistanceAmount: number,
  retreatCost: number,
  stage: Stage,
  moves: Move[],
  rarity?: Rarity,
  variation?: Variation,
  prevolveName?: string,
  prevolveImage?: string,
  pokedexInfo?: string,
  pokedexEntry?: string,
}

export interface CardOptionsAction {
  type: string,
  payload: {
    errorMessage?: string,
    cardOptions?: CardOptions,
  },
}
