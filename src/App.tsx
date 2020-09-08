import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import CardCreatorPage from 'pages/CardCreator';
import { Switch, BrowserRouter as Router, Route, Redirect, } from 'react-router-dom';
import AppLayout from 'layouts/AppLayout';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppLayout>
          <Switch>
            <Route exact path='/create'>
              <CardCreatorPage />
            </Route>
            <Route exact path='/profile'>
              Profile
            </Route>
            <Route path='/'>
              <Redirect to='/create' />
            </Route>
          </Switch>
        </AppLayout>
      </Router>
    </Provider>
  )
}

export default App;
