import React from 'react';
import styles from '../Form.module.scss';

interface Props {
  shortName: string,
  name?: string,
  horizontal?: boolean,
}

const InputLabel: React.FC<Props> = ({ shortName, name, horizontal, children }) =>
  <label htmlFor={shortName} className={`${styles.input} ${horizontal ? styles.horizontal : ''}`}>
    {name && <span className={styles.inputLabel}>{name}</span>}
    {children}
  </label>

export default InputLabel;
