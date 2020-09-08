import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './App.module.scss';
import { NavLink } from 'react-router-dom';

interface Props {
  icon: IconProp,
  to: string,
}

const NavItem: React.FC<Props> = ({ icon, to, children }) => {
  return (
    <NavLink to={to} className={styles.link} activeClassName={styles.active}>
      <li className={styles.navItem}>
        <FontAwesomeIcon icon={icon} />
        <span className={styles.navText}>
          {children}
        </span>
      </li>
    </NavLink>
  )
}

export default NavItem;
