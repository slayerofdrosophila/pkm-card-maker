import React, { MouseEvent } from 'react';
import styles from '../Form.module.scss';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface Props {
  className?: string,
  onClick?: (e: MouseEvent) => void,
  icon?: IconProp,
  type?: 'submit' | 'button',
  disabled?: boolean,
  isLoading?: boolean,
}

const Button: React.FC<Props> = ({ className, onClick, icon, type = 'button', disabled, isLoading, children }) =>
  <button className={classnames(styles.button, className)} onClick={onClick} type={type} disabled={disabled}>
    {icon ?
      isLoading ?
      <FontAwesomeIcon className={styles.buttonIcon} icon={faSpinner} spin />
      :
      <FontAwesomeIcon className={styles.buttonIcon} icon={icon} />
    : null}
    {children}
  </button>

export default Button;
