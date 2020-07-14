import React, { MouseEvent } from 'react';
import styles from '../Form.module.scss';

interface Props {
  className?: string,
  onClick?: (e: MouseEvent) => void,
}

const Button: React.FC<Props> = ({ className, onClick, children }) =>
  <button className={`${styles.button} ${className ? className : ''}`} onClick={onClick}>
    {children}
  </button>

export default Button;
