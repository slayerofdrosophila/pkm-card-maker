import { CardOptions } from "interfaces";

export interface ErrorResponse {
  ok: boolean,
  code: number,
  message: string,
}

interface HttpGenericInterface {
  id: number,
  short_name: string,
  name: string,
}

export interface HttpSupertype extends HttpGenericInterface {};

export interface HttpRarityIcon extends HttpGenericInterface {};

export interface HttpRarity extends HttpGenericInterface {
  has_name_outline?: boolean,
  has_black_top_text?: boolean,
  has_v_style?: boolean,
}

export interface HttpVariation extends HttpGenericInterface {
  subtypes: number[],
  rarities: number[],
}

export interface HttpSubtype extends HttpGenericInterface {
  has_prevolve?: boolean,
  has_pokedex_entry?: boolean,
  has_description?: boolean,
  has_white_top_text?: boolean,
  has_v_style?: boolean,
  has_v_symbol?: boolean,
  has_name_outline?: boolean,
  has_vmax_symbol?: boolean,
  rarities: number[],
  variations: number[],
  types: number[],
  supertypes: number[],
}

export interface HttpSet extends HttpGenericInterface {
  number: number,
}

export interface HttpBaseSet extends HttpGenericInterface {
  sets: HttpSet[],
}

export interface HttpRotation extends HttpGenericInterface {
  sub_sets: HttpSet[],
}

export interface HttpType extends HttpGenericInterface {
  subtype_required?: boolean,
  has_white_text?: boolean,
  has_sub_name?: boolean,
  has_special_style?: boolean,
  is_energy?: boolean,
  rarities: number[],
  supertypes: number[],
}

export interface HttpBaseMove {
  name: string,
  damage: string,
  text: string,
}

export interface HttpMove extends HttpBaseMove {
  energyCost: HttpMoveType[],
}

export interface HttpBaseMoveType {
  amount: number,
}

export interface HttpMoveType extends HttpBaseMoveType {
  type: number,
}

export interface HttpCard {
  id?: number,
  name: string,
  subname?: string,
  background_image?: string, // Image?
  image_layer1?: string, // Image?
  image_layer2?: string, // Image?
  type_image?: string, // Image?
  custom_set_icon?: string, // Image?
  card_number?: string,
  total_in_set?: string,
  hitpoints?: number,
  illustrator?: string,
  weakness_amount?: number,
  resistance_amount?: number,
  retreat_cost?: number,
  ability?: {
    name: string,
    text: string,
  },
  prevolve_name?: string,
  prevolve_image?: string,
  pokedex_entry?: string,
  description?: string,
  raid_level?: number,
  supertype?: number,
  base_set: number,
  rarity?: number,
  variation?: number,
  subtype?: number,
  set?: number,
  type?: number,
  rotation?: number,
  rarity_icon?: number,
  weakness_type?: number,
  resistance_type?: number,
  move1?: HttpMove,
  move2?: HttpMove,
  move3?: HttpBaseMove,
  full_card_image: string, // Image?
}

export interface HttpCardPreview {
  id: number,
  name: string,
  full_card_image: string,
}

export interface CardOptionsResponse {
  supertypes: HttpSupertype[],
  base_sets: HttpBaseSet[],
  rarities: HttpRarity[],
  variations: HttpVariation[],
  subtypes: HttpSubtype[],
  sets: HttpSet[],
  types: HttpType[],
  rotations: HttpRotation[],
  rarity_icons: HttpRarityIcon[],
}

export interface LoginResponse {
  access_token: string,
  expires_in: number,
  token_type: string,
  scope: string,
  refresh_token: string,
}

export interface LoginRequest {
  endpoint: '/o/token/' | '/auth/convert-token/',
  data: FormData,
}

export interface UploadCardRequest {
  card: HttpCard,
}

export interface GetCardRequest {
  id: number,
  options: CardOptions,
}
