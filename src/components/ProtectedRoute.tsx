import { Route, Redirect, useLocation } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'redux/ducks/user/selectors';
import { getAdminPath } from 'utils/role';

const ProtectedRoute: React.ReactType = ({ children, ...rest }) => {
  const token = useSelector(selectAccessToken);
  const isLoggedIn = !!token;
  // const userRole = useSelector(selectUserRoleLevel);
  const isAdminRole = false;
  const { pathname } = useLocation();
  const isAdminPage = pathname.includes(getAdminPath());
  const isLoginPage = pathname.includes('login');
  const isUnauthorizedEntry = !isLoggedIn && !isLoginPage;

  if (isUnauthorizedEntry) {
    return <Redirect to="/login" />;
  }

  if (isLoggedIn) {
    if (isLoginPage || (!isAdminRole && isAdminPage)) {
      return <Redirect to="/" />;
    }
  }

  return <Route {...rest}>{children}</Route>;
};

export default ProtectedRoute;
