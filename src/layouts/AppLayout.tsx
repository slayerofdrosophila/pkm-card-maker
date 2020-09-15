import React from 'react';
import styles from './App.module.scss';
import NavItem from './NavItem';
import { faPlusSquare, faUser, faKey, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectCredentials } from 'redux/ducks/user/selectors';
import { isLoggedIn } from 'utils/auth';

const AppLayout: React.FC = ({ children }) => {
  const credentials = useSelector(selectCredentials);
  const loggedIn = isLoggedIn(credentials);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <nav className={styles.navigation}>
          <ul className={styles.navItems}>
            <NavItem to='/create' icon={faPlusSquare} title='Create' />
            <NavItem to='/profile' icon={faUser} title='Profile' />
            {loggedIn ?
              <NavItem to='/logout' icon={faSignOutAlt} title='Logout' />
              :
              <NavItem to='/login' icon={faKey} title='Login' />
            }
          </ul>
        </nav>
      </header>
      <div className={styles.content}>
        {children}
      </div>
      <div className={styles.background} style={{ background: 'url(/img/line-pattern.svg)' }} />
      <div className={styles.colorLine} />
      <footer className={styles.footer} />
    </div>
  )
}

export default AppLayout;
