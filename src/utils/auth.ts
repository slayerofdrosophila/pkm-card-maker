import { Credentials } from "interfaces";

const adminPrefix = '/admin';

export const getAdminPath = (url = ''): string => {
  return adminPrefix + url;
};

export const isLoggedIn = (credentials: Credentials): boolean => !!credentials.accessToken;
