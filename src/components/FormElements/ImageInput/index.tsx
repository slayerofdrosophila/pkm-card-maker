import React from 'react';
import styles from '../Form.module.scss';
import InputLabel from '../InputLabel';

interface Props {
  shortName: string,
  name?: string,
  info?: string,
  setter: (newValue:  any) => void,
  onChange?: (newImage: string) => void,
}

const ImageInput: React.FC<Props> = ({ shortName, name, info, setter, onChange }) =>
  <InputLabel shortName={shortName} name={name} horizontal>
      {info && <span className={styles.info}>{info}</span>}
      <input
        id={shortName}
        name={shortName}
        onChange={e => {
          if(e.target.files && e.target.files[0]) {
            const image = window.URL.createObjectURL(e.target.files[0]);
            setter(image);
            onChange && onChange(image);
          } else {
            setter('');
            onChange && onChange('');
          }
        }}
        className={styles.inputField}
        type='file'
        accept='image/*'
      />
  </InputLabel>

export default ImageInput;
