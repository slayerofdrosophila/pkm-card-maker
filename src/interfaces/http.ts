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
  energy_cost: HttpMoveType[],
}

export interface HttpBaseMoveType {
  amount: number,
}

export interface HttpMoveType extends HttpBaseMoveType {
  type: number,
}

interface HttpBaseCard {
  id?: number,
  name: string,
  subname?: string,
  background_image?: File,
  card_image?: File,
  top_image?: File,
  type_image?: File,
  custom_set_icon?: File,
  card_number?: string,
  total_cards?: string,
  hitpoints?: number,
  illustrator?: string,
  weakness_amount?: number,
  resistance_amount?: number,
  retreat_cost?: number,
  prevolve_name?: string,
  prevolve_image?: File,
  pokedex_entry?: string,
  description?: string,
  raid_level?: number,
  supertype: number,
  base_set: number,
  rarity?: number,
  variation?: number,
  subtype?: number,
  set?: number,
  type: number,
  rotation?: number,
  rarity_icon?: number,
  weakness_type?: number,
  resistance_type?: number,
  full_card_image?: File,
}

export interface HttpRequestCard extends HttpBaseCard {
  ability?: string,
  move1?: string,
  move2?: string,
  move3?: string,
}

export interface HttpCard extends HttpBaseCard {
  ability?: {
    name: string,
    text: string,
  },
  move1?: HttpMove,
  move2?: HttpMove,
  move3?: HttpBaseMove,
}

export type HttpCardNoImg = Omit<HttpCard, 'background_image' | 'card_image' | 'top_image' | 'type_image' | 'prevolve_image' | 'full_card_image' | 'custom_set_icon'>;

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
  card: FormData,
}

export interface GetCardRequest {
  id: number,
  options: CardOptions,
}
