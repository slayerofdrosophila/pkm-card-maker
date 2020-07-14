import React, { MouseEvent } from 'react';
import styles from '../Form.module.scss';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  className?: string,
  onClick?: (e: MouseEvent) => void,
  icon?: IconDefinition,
}

const Button: React.FC<Props> = ({ className, onClick, icon, children }) =>
  <button className={`${styles.button} ${className ? className : ''}`} onClick={onClick}>
    {icon && <FontAwesomeIcon className={styles.buttonIcon} icon={icon} />}
    {children}
  </button>

export default Button;
