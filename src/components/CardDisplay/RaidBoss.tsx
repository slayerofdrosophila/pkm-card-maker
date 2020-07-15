import React from 'react';
import { Card } from 'interfaces';
import styles from './CardDisplay.module.scss';
import { formatText } from './index';
import { relativePathPrefix } from 'services';

interface Props {
  card: Card,
}

const RaidBossCard: React.FC<Props> = ({ card }) =>
  <>
    <span className={`${styles.name} ${styles.nameRaidBoss} ${styles.nameOutline}`}>
      {formatText(card.name)}
      <img src={relativePathPrefix('/assets/icons_symbols/other/vmax_icon.png')} className={styles.nameIcon} alt='' />
    </span>
    <div className={`${styles.hitpointsWrapper} ${styles.hitpointsWrapperRaidBoss}`}>
      <span className={styles.hitpointsHP}>HP</span>
      <span className={styles.hitpoints}>{card.hitpoints}</span>
    </div>
    <img src={relativePathPrefix(`/assets/icons_symbols/types/${card.type?.shortName}_border.png`)} className={styles.raidBossType} alt={card.type?.name} />
    <div className={styles.movesWrapper}>
      <div className={styles.raidBossMove}>
        <span className={styles.raidBossMoveName}>{card.move1?.name}</span>
        <p className={styles.raidBossMoveText}>{card.move1?.text}</p>
        <span className={styles.raidBossMoveDamage}>{card.move1?.damage}</span>
      </div>
    </div>
    {card.cardNumber &&
      <div className={styles.raidBossNumber}>
        {card.cardNumber}
      </div>
    }
  </>

export default RaidBossCard;
