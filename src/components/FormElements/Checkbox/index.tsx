import React from 'react';
import styles from '../Form.module.scss';
import InputLabel from '../InputLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';

interface Props {
  shortName: string,
  name: string,
  checked: boolean,
  setter: (newValue: boolean) => void,
}

const Checkbox: React.FC<Props> = ({ shortName, name, checked, setter }) =>
  <InputLabel shortName={shortName} name={name}>
    <input
      id={shortName}
      name={shortName}
      checked={checked}
      onChange={e => setter(e.currentTarget.checked)}
      className={classnames(styles.inputField, styles.checkbox)}
      type='checkbox'
    />
    <div className={styles.checkboxFake}>
      {checked && <FontAwesomeIcon icon={faCheck} className={styles.checkboxIcon} />}
    </div>
  </InputLabel>

export default Checkbox;
