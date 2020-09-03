import camelcaseKeys from 'camelcase-keys';

export const httpToNormalType = <HttpType, NormalType>(obj: HttpType): NormalType =>
  camelcaseKeys(obj) as unknown as NormalType;

