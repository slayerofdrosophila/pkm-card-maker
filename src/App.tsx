import React from 'react';
import CardCreatorPage from 'pages/CardCreator';
import { Switch, Route, Redirect, useLocation, } from 'react-router-dom';
import AppLayout from 'layouts/AppLayout';
import { AnimatePresence } from 'framer-motion';
import Motion from 'pages/Motion';

const App: React.FC = () => {
  const location = useLocation();

  return (
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
  )
}

export default App;
