import React from 'react';
import { Provider } from 'react-redux';
import store from 'store';
import CardCreatorPage from 'pages/CardCreator';
import styles from './App.module.scss';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.headerCircle} />
        </header>
        <div className={styles.content}>
          <CardCreatorPage />
        </div>
        <footer className={styles.footer} />
      </div>
    </Provider>
  )
}

export default App;
