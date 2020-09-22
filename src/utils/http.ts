import camelcaseKeys from 'camelcase-keys';
import snakeCaseKeys from 'snakecase-keys';

export const toCamelCase = <SnakeCaseType, CamelCaseType>(obj: SnakeCaseType): CamelCaseType =>
  camelcaseKeys(obj, { deep: true }) as unknown as CamelCaseType;

export const toSnakeCase = <CamelCaseType, SnakeCaseType>(obj: CamelCaseType): SnakeCaseType =>
  snakeCaseKeys(obj, { deep: true }) as unknown as SnakeCaseType;

