import React from 'react';
import { MoveType, Type } from "interfaces";
import styles from './ptcgText.module.scss';

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

export const typeToText = (type: Type): string => {
  switch(type.shortName) {
    case 'Grass':
      return 'G';
    case 'Fire':
      return 'R';
    case 'Water':
      return 'W';
    case 'Lightning':
      return 'L';
    case 'Psychic':
      return 'P';
    case 'Fighting':
      return 'F';
    case 'Dark':
      return 'D';
    case 'Metal':
      return 'M';
    case 'Colorless':
      return 'C';
    default:
      return '';
  }
}

export const moveTypeToText = (moveTypes: MoveType[]): string[] =>
  moveTypes.map((moveType) => {
    let text = '';
    const typeText = typeToText(moveType.type);
    for(let i = 0; i < moveType.amount; i++) {
      text += typeText;
    }
    return text;
  });
