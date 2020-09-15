import { Route, Redirect, useLocation } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCredentials } from 'redux/ducks/user/selectors';
import { getAdminPath, isLoggedIn } from 'utils/auth';

const ProtectedRoute: React.ReactType = ({ children, ...rest }) => {
  const credentials = useSelector(selectCredentials);
  const loggedIn = isLoggedIn(credentials);
  // const userRole = useSelector(selectUserRoleLevel);
  const isAdminRole = false;
  const { pathname } = useLocation();
  const isAdminPage = pathname.includes(getAdminPath());
  const isLoginPage = pathname.includes('login');
  const isUnauthorizedEntry = !loggedIn && !isLoginPage;

  if (isUnauthorizedEntry) {
    return <Redirect to="/login" />;
  }

  if (loggedIn) {
    if (isLoginPage || (!isAdminRole && isAdminPage)) {
      return <Redirect to="/" />;
    }
  }

  return <Route {...rest}>{children}</Route>;
};

export default ProtectedRoute;
