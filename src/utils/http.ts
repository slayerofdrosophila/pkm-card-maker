import camelcaseKeys from 'camelcase-keys';

export const httpToNormalType = <HttpType, NormalType>(obj: HttpType): NormalType =>
  camelcaseKeys(obj, { deep: true }) as unknown as NormalType;

