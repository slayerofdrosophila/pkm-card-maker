import React from 'react';
import { Card, Move, BaseMove } from 'interfaces';
import styles from './CardDisplay.module.scss';
import { formatText } from './index';
import classnames from 'classnames';

interface Props {
  card: Card,
}

const RaidBossCard: React.FC<Props> = ({ card }) => {
  const damageHasSymbol = (damage: string = ''): boolean => /[^\d]/.test(damage);

  const formatMove = (move: Move | BaseMove): JSX.Element =>
    <div className={styles.raidBossMove}>
      <span className={styles.raidBossMoveName}>{move.name}</span>
      <p className={styles.raidBossMoveText}>{move.text}</p>
      <span className={classnames(styles.raidBossMoveDamage, {
        [styles.raidBossMoveDamageShoved]: damageHasSymbol(move.damage),
      })}>
        {move.damage}
      </span>
    </div>

  return <>
    <span className={classnames(styles.name, styles.nameRaidBoss, styles.nameOutline)}>
      {formatText(card.name)}
      <img src={'/assets/icons_symbols/other/vmax_icon.png'} className={styles.nameIcon} alt='' />
    </span>
    <div className={classnames(styles.hitpointsWrapper, styles.hitpointsWrapperRaidBoss)}>
      <span className={styles.hitpointsHP}>HP</span>
      <span className={styles.hitpoints}>{card.hitpoints}</span>
    </div>
    <img src={`/assets/icons_symbols/types/${card.type?.shortName}_border.png`} className={styles.raidBossType} alt={card.type?.name} />
    <div className={styles.raidBossMovesWrapper}>
      {card.move1 && formatMove(card.move1)}
      {card.move2 && formatMove(card.move2)}
      {card.move3 && formatMove(card.move3)}
    </div>
    {card.cardNumber &&
      <div className={styles.raidBossNumber}>
        {card.cardNumber}
      </div>
    }
  </>
}

export default RaidBossCard;
