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

export interface ErrorResponse {
  code: number;
  message: string;
}
