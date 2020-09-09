import React, { MouseEvent } from 'react';
import styles from '../Form.module.scss';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

interface Props {
  className?: string,
  onClick?: (e: MouseEvent) => void,
  icon?: IconProp,
  type?: 'submit' | 'button',
}

const Button: React.FC<Props> = ({ className, onClick, icon, type = 'button', children }) =>
  <button className={classnames(styles.button, className)} onClick={onClick} type={type}>
    {icon && <FontAwesomeIcon className={styles.buttonIcon} icon={icon} />}
    {children}
  </button>

export default Button;
