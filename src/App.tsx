import React from 'react';
import CardCreatorPage from 'pages/CardCreator';
import { Switch, Route, Redirect, useLocation, } from 'react-router-dom';
import AppLayout from 'layouts/AppLayout';
import { AnimatePresence } from 'framer-motion';

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
            <CardCreatorPage />

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
