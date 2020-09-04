interface HttpGenericInterface {
  id: number,
  short_name: string,
  name: string,
}

export interface HttpSupertype extends HttpGenericInterface {};

export interface HttpRarityIcon extends HttpGenericInterface {};

export interface HttpRarity extends HttpGenericInterface {
  types: number[],
  subtypes: number[],
  variations: number[],
  has_name_outline?: boolean,
  has_black_top_text?: boolean,
}

export interface HttpVariation extends HttpGenericInterface {
  subtypes: number[],
  rarities: number[],
}

export interface HttpSubtype extends HttpGenericInterface {
  supertypes: number[],
  types: number[],
  has_variations: boolean,
  has_prevolve?: boolean,
  no_description?: boolean,
  has_pokedex_entry?: boolean,
  has_white_top_text?: boolean,
  has_v_style?: boolean,
  has_v_symbol?: boolean,
  has_vmax_symbol?: boolean,
  has_name_outline?: boolean,
  rarities: number[],
}

export interface HttpSet extends HttpGenericInterface {
  number: number,
}

export interface HttpBaseSet extends HttpGenericInterface {
  sub_sets: HttpSet[],
}

export interface HttpRotation extends HttpGenericInterface {
  sub_sets: HttpSet[],
}

export interface HttpType extends HttpGenericInterface {
  supertypes: number[],
  has_subtypes?: boolean,
  subtype_optional?: boolean,
  has_subname?: boolean,
  rarities: number[],
  has_white_text?: boolean,
  has_special_style?: boolean,
  is_energy?: boolean,
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
