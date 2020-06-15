import React, { useState, useEffect } from 'react';
import styles from './EnergyPicker.module.scss';
import { MoveType, Type } from 'interfaces';

interface Props {
  label: String,
  types: Type[],
  onUpdate: (moveTypes: MoveType[]) => void,
}

const EnergyPicker: React.FC<Props> = ({ label, types, onUpdate }) => {
  let [moveTypes, setMoveTypes] = useState<MoveType[]>([]);

  useEffect(() => {
    const newMoveTypes: MoveType[] = [];
    types.forEach((type) => {
      if(type.supertype === 'Pokemon') {
        newMoveTypes.push({
          type,
          amount: 0,
        });
      }
    });
    setMoveTypes(newMoveTypes);
  }, [types]);

  useEffect(() => {
    onUpdate(moveTypes);
  }, [moveTypes]);

  return (
    <div>
      <span>{label}</span>
      <div className={styles.wrapper}>
        {moveTypes.map((moveType, i) =>
          <div className={styles.type} key={i}>
            <span className={styles.button} onClick={() => {
              let newMoveTypes: MoveType[] = moveTypes;
              const currentType: MoveType = newMoveTypes.filter((a) => a.type === moveType.type)[0];
              currentType.amount = currentType.amount + 1;
              newMoveTypes = [...newMoveTypes];
              setMoveTypes(newMoveTypes);
            }}>🔺</span>
            <img src={`${process.env.REACT_APP_RELATIVE_PREFIX || ''}/assets/icons_symbols/types/${moveType.type.shortName}_border.png`} className={styles.image} alt={moveType.type.name} title={moveType.type.name} />
            <span className={styles.button} onClick={() => {
              let newMoveTypes: MoveType[] = moveTypes;
              const currentType: MoveType = newMoveTypes.filter((a) => a.type === moveType.type)[0];
              if(currentType.amount - 1 >= 0) {
                currentType.amount = currentType.amount - 1;
              }
              newMoveTypes = [...newMoveTypes];
              setMoveTypes(newMoveTypes);
            }}>🔻</span>
            <span>{moveType.amount}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default EnergyPicker;
