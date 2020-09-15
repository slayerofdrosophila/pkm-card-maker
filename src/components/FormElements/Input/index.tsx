import React, { forwardRef } from 'react';
import styles from '../Form.module.scss';
import InputLabel from '../InputLabel';
import classnames from 'classnames';

interface Props {
  shortName: string,
  name: string,
  value?: string | number,
  type: 'text' | 'number' | 'textarea' | 'password',
  min?: number,
  max?: number,
  horizontal?: boolean,
  setter?: (newValue: any) => void,
}

const Input = forwardRef<HTMLInputElement, Props>(({ shortName, name, value, type, min, max, setter, horizontal }, forwardedRef) =>
  <InputLabel shortName={shortName} name={name} horizontal={horizontal || type === 'textarea'}>
    {type !== 'textarea' ?
      <input
        id={shortName}
        name={shortName}
        value={value}
        type={type}
        min={min}
        max={max}
        onChange={e => setter && setter(type === 'text' ? e.currentTarget.value : +e.currentTarget.value)}
        className={styles.inputField}
        ref={forwardedRef}
      />
      :
      <textarea
        id={shortName}
        name={shortName}
        value={value}
        onChange={e => setter && setter(e.currentTarget.value)}
        className={classnames(styles.inputField, styles.inputTextarea)}
        ></textarea>
    }
  </InputLabel>
);

export default Input;
