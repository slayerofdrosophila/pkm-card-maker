import React, { ChangeEvent } from 'react';
import styles from '../../CardCreator.module.scss';

interface Props {
  shortName: string,
  name: string,
  selectRef?: React.RefObject<HTMLSelectElement>,
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void,
}

const Select: React.FC<Props> = ({ shortName, name, selectRef, onChange, children }) => {
  return (
    <label htmlFor={shortName} className={styles.input}>
      <span className={styles.inputLabel}>{name}</span>
      <select id={shortName} ref={selectRef} name={shortName} className={styles.inputField} onChange={onChange}>
        {children}
      </select>
    </label>
  )
}

export default Select;
