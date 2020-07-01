import React, { useEffect, useState } from 'react';
import { Card } from 'interfaces';
import TrainerCard from './Trainer';
import styles from './CardDisplay.module.scss';
import EnergyCard from './Energy';
import PokemonCard from './Pokemon';
import { relativePathPrefix } from 'services';

interface ImagePathOptions {
  baseSet: string,
  type: string,
  subtype?: string,
  variation?: string,
  rarity?: string,
  supertype?: string,
}

interface Props {
  card: Card,
}


const CardDisplay: React.FC<Props> = ({ card }) => {
  const [imagePath, setImagePath] = useState<string>();
  const { supertype, type, baseSet, set, variation, subtype, rarity } = card;

  useEffect(() => {
    const getImage = (options: ImagePathOptions, folder: string | undefined = undefined): string => {
      // Format the options according to the formatting defined in the README
      let filePath: string = relativePathPrefix(`/assets/${supertype}/`);
      if(folder) {
        filePath += `${folder}/`;
      }
      Object.values(options).forEach((param: string, i: number) => {
        if(param !== undefined && param !== 'default') {
          if((param === 'Dynamax' && options.rarity === 'Rainbow') ||
            (param === 'Gigantamax' && options.rarity === 'Rainbow') ||
            (options.rarity === 'Promo' && param === 'Basic')) {
            return;
          }
          if(i !== 0) {
            filePath += '_';
          }
          filePath += param;
          if(param === 'Rainbow') {
            if(options.variation === 'Dynamax' || options.variation === 'Gigantamax') {
              filePath += `_${options.variation}`;
            }
          }
          if(param === 'V' && !options.rarity) {
            filePath += '_Basic';
          }
        }
      });
      return `${filePath}.png`;
    }

    if(supertype && type && baseSet) {
      let imagePath: string;
      switch(supertype) {
        case 'Pokemon':
          imagePath = getImage({ baseSet: baseSet.shortName, subtype: subtype?.shortName, variation: variation?.shortName,
            rarity: rarity?.shortName, type: type.shortName }, type.shortName);
          break;
        case 'Energy':
          imagePath = getImage({ baseSet: baseSet.shortName, supertype, type: type.shortName });
          break;
        case 'Trainer':
          imagePath = getImage({ baseSet: baseSet.shortName, supertype, type: type.shortName, subtype: subtype?.shortName });
          break;
        default:
          return;
      }
      setImagePath(imagePath);
    }
  }, [supertype, type, baseSet, set, variation, subtype, rarity]);

  return (
    <div className={`${styles.card} ${card.type?.hasWhiteText ? styles.whiteText : ''}`} id='card'>
      {card.backgroundImage && <img src={card.backgroundImage} className={styles.backgroundImage} alt='' />}
      {supertype === 'Trainer' && <TrainerCard name={card.name} subname={card.subname} description={card.description} type={card.type} />}
      {supertype === 'Energy' && <EnergyCard name={card.name} description={card.description} type={card.type} typeImage={card.typeImage} />}
      {supertype === 'Pokemon' && <PokemonCard card={card} />}
      {!(supertype === 'Energy' && card.type?.hasSpecialStyle) && <>
        <div className={card.rarity?.hasNameOutline || card.subtype?.hasNameOutline ? styles.cardInfoWhite : ''}>
          {(supertype !== 'Energy' && card.illustrator) && <span className={styles.illustrator}>{`Illus. ${card.illustrator}`}</span>}
          {card.customSetIcon ?
            <img src={card.customSetIcon} alt='' className={styles.setIcon} />
            :
            card.set && <img src={relativePathPrefix(`/assets/icons_symbols/sets/${card.set.number}_SetIcon_${card.set.shortName}.png`)} alt={card.set.name} className={styles.setIcon} />
          }
          {card.rotation && <img src={relativePathPrefix(`/assets/icons_symbols/rotations/${card.rotation?.shortName}.png`)} alt={card.rotation?.name} className={styles.rotation} />}
          <span className={styles.setNumber}>
            {`${card.cardNumber || ''}${card.totalInSet ? `/${card.totalInSet}` : ''}`}
            {card.rarityIcon &&
              <img alt={card.rarityIcon.name} className={styles.rarityIcon}
                src={relativePathPrefix(`/assets/icons_symbols/rarities/${card.rarityIcon.shortName}${(card.type?.hasWhiteText || card.subtype?.hasVStyle) ? '_white' : ''}.png`)}
              />
            }
          </span>
        </div>
      </>}
      {card.imageLayer1 && <img src={card.imageLayer1} className={styles.imageLayer1} alt='' />}
      <img src={imagePath} className={styles.image} alt={card.name || ''} />
      {card.imageLayer2 && <img src={card.imageLayer2} className={styles.imageLayer2} alt='' />}
    </div>
  )
}

export default CardDisplay;

export const formatText = (text: string | undefined) => {
  if(text) {
    let chars: RegExpMatchArray | null = text.match(/\[.*?\]/g);
    if(chars) {
      const charsArr: string[] = chars.map(char => char.replace('[', '').replace(']', ''));
      const textNoChars = text.split(/\[.*?\]/g);
      const returnText: (JSX.Element | string)[] = [];
      textNoChars.forEach((textElm, i) => {
        returnText.push(textElm);
        if(charsArr.length > i) {
          if(charsArr[i].length > 1) {
            returnText.push(<span key={i} className={styles.italicText}>{charsArr[i]}</span>);
          } else {
            returnText.push(<span key={i} className={styles.ptcgText}>{charsArr[i]}</span>);
          }
        }
      });
      return returnText;
    } else {
      return text;
    }
  } else {
    return false;
  }
}
