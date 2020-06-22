import React from 'react';
import styles from '../Form.module.scss';
import InputLabel from '../InputLabel';

interface Props {
  shortName: string,
  name: string,
  setter: (newValue:  any) => void,
}

const ImageInput: React.FC<Props> = ({ shortName, name, setter }) =>
  <InputLabel shortName={shortName} name={name} horizontal>
      <input
        id={shortName}
        name={shortName}
        onChange={e => {
          if(e.target.files && e.target.files[0]) {
            setter(window.URL.createObjectURL(e.target.files[0]));
          } else {
            setter('');
          }}
        }
        className={styles.inputField}
        type='file'
        accept='image/*'
      />
  </InputLabel>

export default ImageInput;
