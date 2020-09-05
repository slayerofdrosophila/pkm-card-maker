import React from 'react';
import { Type } from 'interfaces';
import styles from './CardDisplay.module.scss';
import { formatText } from './index';
import classnames from 'classnames';

interface Props {
  name?: string,
  description?: string,
  type?: Type,
  typeImage?: string,
}

const EnergyCard: React.FC<Props> = ({ name, description, type, typeImage }) => <>
  {type?.hasSpecialStyle && <>
    <span className={styles.name}>{formatText(name)}</span>
    <div className={classnames(styles.descriptionWrapper, styles.descriptionWrapperEnergy)}>
      <p className={styles.description}>{formatText(description)}</p>
    </div>
  </>}
  {typeImage &&
    <img src={typeImage} alt=''
      className={classnames(styles.typeImage, {
        [styles.typeImageSpecial]: type?.shortName === 'Special'
      })}
    />
  }
</>

export default EnergyCard;
