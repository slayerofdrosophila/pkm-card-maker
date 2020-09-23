import React, { useEffect, useState } from 'react';
import { Card } from 'interfaces';
import TrainerCard from './Trainer';
import styles from './CardDisplay.module.scss';
import EnergyCard from './Energy';
import PokemonCard from './Pokemon';
import RaidBossCard from './RaidBoss';
import { getCardImage, isEnergy, isPokemon, isRaidBoss, isTrainer } from 'utils/card';
import classnames from 'classnames';

interface Props {
  card: Card,
}

const CardDisplay: React.FC<Props> = ({ card }) => {
  const [imagePath, setImagePath] = useState<string>();
  const { supertype, type, baseSet, set, variation, subtype, rarity } = card;

  useEffect(() => {
    if(supertype && type && baseSet) {
      const newImage: string = getCardImage({baseSet: baseSet.shortName, type: type.shortName, rarity: rarity?.shortName, subtype: subtype?.shortName, supertype: supertype.shortName, variation: variation?.shortName})
      setImagePath(newImage);
    }
  }, [supertype, type, baseSet, set, variation, subtype, rarity]);

  return (
    <div id='card'
      className={classnames(styles.card, {
        [styles.whiteText]: card.type?.hasWhiteText && !card.rarity?.hasVStyle
      })}
    >
      {card.backgroundImage && <img src={card.backgroundImage} className={styles.backgroundImage} alt='' />}
      {isTrainer(supertype) && <TrainerCard name={card.name} subname={card.subname} description={card.description} type={card.type} />}
      {isEnergy(supertype) && <EnergyCard name={card.name} description={card.description} type={card.type} typeImage={card.typeImage} />}
      {isPokemon(supertype) && <PokemonCard card={card} />}
      {isRaidBoss(supertype) && <RaidBossCard card={card} />}
      {(!(isEnergy(supertype) && !card.type?.hasSpecialStyle) && !isRaidBoss(supertype)) && <>
        <div
          className={classnames({
            [styles.cardInfoWhite]: card.rarity?.hasNameOutline || card.subtype?.hasNameOutline
          })}
        >
          {(!isEnergy(supertype) && card.illustrator) && <span className={styles.illustrator}>{`Illus. ${card.illustrator}`}</span>}
          {card.customSetIcon ?
            <img src={card.customSetIcon} alt='' className={styles.setIcon} />
            :
            card.set && <img src={`/assets/icons_symbols/sets/${card.set.number}_SetIcon_${card.set.shortName}.png`} alt={card.set.name} className={styles.setIcon} />
          }
          {card.rotation && <img src={`/assets/icons_symbols/rotations/${card.rotation?.shortName}.png`} alt={card.rotation?.name} className={styles.rotation} />}
          <span className={styles.setNumber}>
            {`${card.cardNumber || ''}${card.totalCards ? `/${card.totalCards}` : ''}`}
            {card.rarityIcon &&
              <img alt={card.rarityIcon.name} className={styles.rarityIcon}
                src={`/assets/icons_symbols/rarities/${card.rarityIcon.shortName}${(card.type?.hasWhiteText || card.subtype?.hasVStyle) ? '_white' : ''}.png`}
              />
            }
          </span>
        </div>
      </>}
      {card.cardImage && <img src={card.cardImage} className={styles.cardImage} alt='' />}
      <img src={imagePath} className={styles.image} alt={card.name || ''} />
      {card.topImage && <img src={card.topImage} className={styles.topImage} alt='' />}
      <div className={styles.background} />
    </div>
  )
}

export default CardDisplay;
