import React, { useEffect, useState } from 'react';
import { Card } from 'interfaces';
import TrainerCard from './Trainer';
import styles from './CardDisplay.module.scss';

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
  research?: boolean,
}

const CardDisplay: React.FC<Props> = ({ card, research }) => {
  const [imagePath, setImagePath] = useState<string>();
  const { supertype, type, baseSet, set, variation, subtype, rarity } = card;

  useEffect(() => {
    const getImage = (options: ImagePathOptions, folder: string | undefined = undefined): string => {
      // Format the options according to the formatting defined in the README
      let filePath: string = `/assets/${supertype}/`;
      if(folder) {
        filePath += `${folder}/`;
      }
      Object.values(options).forEach((param: string, i: number) => {
        if(param !== undefined && param !== 'default') {
          if(param === 'Dynamax' && options.rarity === 'Rainbow' ||
            param === 'Gigantamax' && options.rarity === 'Rainbow' ||
            options.rarity === 'Promo' && param === 'Basic') {
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

  if(supertype === 'Trainer') {
    return <TrainerCard imagePath={imagePath} card={card} research={research} />
  } else {
    return <h1>{'W.I.P.'}</h1>
  }
}

export default CardDisplay;

export const formatText = (text: string | undefined) => {
  if(text) {
    let chars: RegExpMatchArray | null = text.match(/\[.[1]?\]/g);
    if(chars) {
      const charsArr: string[] = chars.map(char => char.replace('[', '').replace(']', ''));
      const textNoChars = text.split(/\[.[1]?\]/g);
      const returnText: (JSX.Element | string)[] = [];
      textNoChars.forEach((textElm, i) => {
        returnText.push(textElm);
        if(charsArr.length > i) {
          returnText.push(<span key={i} className={styles.ptcgText}>{charsArr[i]}</span>);
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
