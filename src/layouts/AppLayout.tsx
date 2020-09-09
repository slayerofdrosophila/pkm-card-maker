import React from 'react';
import styles from './App.module.scss';
import NavItem from './NavItem';
import { faPlusSquare, faUser } from '@fortawesome/free-solid-svg-icons';

const AppLayout: React.FC = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <nav className={styles.navigation}>
          <ul className={styles.navItems}>
            <NavItem to='/create' icon={faPlusSquare}>Create</NavItem>
            <NavItem to='/login' icon={faUser}>Profile</NavItem>
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
