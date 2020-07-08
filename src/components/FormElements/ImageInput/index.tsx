import React, { useRef, useState, useEffect } from 'react';
import styles from '../Form.module.scss';
import InputLabel from '../InputLabel';
import { faCropAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  shortName: string,
  name?: string,
  info?: string,
  setter: (newValue:  any) => void,
  onChange?: (newImage: string) => void,
  croppable?: boolean,
  cropperSetter?: (newImage: string, imageSetter: () => void) => void,
}

const ImageInput: React.FC<Props> = ({ shortName, name, info, setter, onChange, croppable, cropperSetter }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    setter(image);
    onChange && onChange(image);
    cropperSetter && cropperSetter(image, () => setter);
  }, [image]);

  return (
    <InputLabel shortName={shortName} name={name} horizontal buttons={croppable ? [
      {
        name: 'Crop',
        icon: faCropAlt,
        onClick: () => cropperSetter && cropperSetter(image, () => setter),
      },
      {
        name: 'Remove',
        icon: faTimes,
        onClick: () => {
          setImage('');
          if(inputRef.current) {
            inputRef.current.value = '';
          }
        },
      },
    ] : []}>
      {info && <span className={styles.info}>{info}</span>}
      <input
        ref={inputRef}
        id={shortName}
        name={shortName}
        onChange={e => {
          if(e.target.files && e.target.files[0]) {
            setImage(window.URL.createObjectURL(e.target.files[0]));
          } else {
            setImage('');
          }
        }}
        className={styles.inputField}
        type='file'
        accept='image/*'
      />
    </InputLabel>
  )
}

export default ImageInput;
