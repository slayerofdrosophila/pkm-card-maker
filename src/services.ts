export const relativePathPrefix = (path: string): string  => `${process.env.REACT_APP_RELATIVE_PREFIX || ''}${path}`;
