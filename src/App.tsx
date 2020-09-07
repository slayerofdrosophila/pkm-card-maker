import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import CardCreatorPage from 'pages/CardCreator';
import styles from './App.module.scss';
import { Switch, BrowserRouter as Router, Route, } from 'react-router-dom';
import { relativePathPrefix } from 'utils/relativePathPrefix';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.headerCircle} />
        </header>
        <div className={styles.content}>
          <Router>
            <Switch>
              <Route path=''>
                <CardCreatorPage />
              </Route>
            </Switch>
          </Router>
        </div>
        <div className={styles.background} style={{ background: `url(${relativePathPrefix('/img/line-pattern.svg')})` }} />
        <footer className={styles.footer} />
      </div>
    </Provider>
  )
}

export default App;
