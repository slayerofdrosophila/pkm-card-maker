import mime from 'mime-types';

export const blobToFile = (blob: Blob, fileName: string): File =>
  new File([blob], `${fileName}.${mime.extension(blob.type)}`, { type: blob.type });
