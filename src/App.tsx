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

library.add(fab);

const App: React.FC = () => {
  const location = useLocation();

  const isUserLoggedIn: boolean = !!localStorage.state;
  if (isUserLoggedIn) {
    // Retrieve current user
  }

  return (
    <Switch>
      <ProtectedRoute path="/login">
        <LoginPage />
      </ProtectedRoute>

      <AppLayout>
        <AnimatePresence>
          <Switch location={location} key={location.pathname}>
            <ProtectedRoute exact path='/profile'>
              <Motion>
                <div style={{ height: '100vh'}}>Profile</div>
              </Motion>
            </ProtectedRoute>

            <Route>
              <Route exact path='/create'>
                <CardCreatorPage />
              </Route>
              <Route path='/'>
                <Redirect to='/create' />
              </Route>
            </Route>
          </Switch>
        </AnimatePresence>
      </AppLayout>
    </Switch>
  )
}

export default App;
