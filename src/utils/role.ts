const adminPrefix = '/admin';

export const getAdminPath = (url = ''): string => {
  return adminPrefix + url;
};
