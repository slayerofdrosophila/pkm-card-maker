import React from 'react';
import CardCreatorPage from 'pages/CardCreator';
import { Switch, Route, Redirect, useLocation, } from 'react-router-dom';
import AppLayout from 'layouts/AppLayout';
import { AnimatePresence } from 'framer-motion';
import Motion from 'pages/Motion';
import LoginPage from 'pages/Login/LoginPage';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import ProtectedRoute from 'components/ProtectedRoute';
import LogoutPage from 'pages/Logout';

library.add(fab);

const App: React.FC = () => {
  const location = useLocation();

  const isUserLoggedIn: boolean = !!localStorage.state;
  if (isUserLoggedIn) {
    // Retrieve current user
  }

  return (
    <AppLayout>
      <Switch>
        <ProtectedRoute exact path="/login">
          <LoginPage />
        </ProtectedRoute>

        <AnimatePresence>
          <Switch location={location} key={location.pathname}>
            <ProtectedRoute exact path='/profile'>
              <Motion>
                <div style={{ height: '100vh'}}>Profile</div>
              </Motion>
            </ProtectedRoute>
            <ProtectedRoute exact path='/logout'>
              <LogoutPage />
            </ProtectedRoute>

            <Route exact path='/create'>
              <CardCreatorPage />
            </Route>
            <Redirect to='/create' />
          </Switch>
        </AnimatePresence>
      </Switch>
    </AppLayout>
  )
}

export default App;
