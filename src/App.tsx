import React from 'react';
import CardCreatorPage from 'pages/CardCreator';
import { Switch, Route, Redirect, useLocation, } from 'react-router-dom';
import AppLayout from 'layouts/AppLayout';
import { AnimatePresence } from 'framer-motion';
import Motion from 'pages/Motion';
import LoginPage from 'pages/Login/LoginPage';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab);

const App: React.FC = () => {
  const location = useLocation();

  return (
    <Switch>
      <Route exact path='/login'>
        <LoginPage />
      </Route>
      <AppLayout>
        <AnimatePresence>
          <Switch location={location} key={location.pathname}>
            <Route exact path='/create'>
              <CardCreatorPage />
            </Route>
            <Route exact path='/profile'>
              <Motion>
                <div style={{ height: '100vh'}}>Profile</div>
              </Motion>
            </Route>
            <Route path='/'>
              <Redirect to='/create' />
            </Route>
          </Switch>
        </AnimatePresence>
      </AppLayout>
    </Switch>
  )
}

export default App;
