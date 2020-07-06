import { ImportedCard, Card, Move, MoveType } from 'interfaces';
import { PercentCrop } from 'react-image-crop';

export const relativePathPrefix = (path: string): string  => `${process.env.REACT_APP_RELATIVE_PREFIX || ''}${path}`;

export const cardToImportedCard = (card: Card): ImportedCard => ({
  supertype: card.supertype,
  name: card.name,
  subname: card.subname,
  backgroundImage: card.backgroundImage,
  imageLayer1: card.imageLayer1,
  imageLayer2: card.imageLayer2,
  typeImage: card.typeImage,
  customSetIcon: card.customSetIcon,
  cardNumber: card.cardNumber,
  totalInSet: card.totalInSet,
  hitpoints: card.hitpoints,
  illustrator: card.illustrator,
  weaknessAmount: card.weaknessAmount,
  resistanceAmount: card.resistanceAmount,
  retreatCost: card.retreatCost,
  ability: card.ability,
  prevolveName: card.prevolveName,
  prevolveImage: card.prevolveImage,
  pokedexEntry: card.pokedexEntry,
  description: card.description,
  baseSetId: card.baseSet?.id,
  setId: card.set?.id,
  typeId: card.type?.id,
  weaknessTypeId: card.weaknessType?.id,
  resistanceTypeId: card.resistanceType?.id,
  subtypeId: card.subtype?.id,
  rarityId: card.rarity?.id,
  variationId: card.variation?.id,
  rotationId: card.rotation?.id,
  rarityIconId: card.rarityIcon?.id,
  moves: card.moves?.map((move: Move) => ({
    name: move.name,
    damage: move.damage,
    text: move.text,
    energyCost: move.energyCost.map((moveType: MoveType) => ({
      amount: moveType.amount,
      typeId: moveType.type.id,
    })),
  })),
});

/**
 * @param {HTMLImageElement} image - Image File Object
 * @param {Object} crop - crop Object
 */
export const getCroppedImg = (image: HTMLImageElement, crop: PercentCrop): string => {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  if(crop.width && crop.height && crop.x && crop.y) {
    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext('2d');
    if(ctx) {
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height,
      );
    }
  }
  // As Base64 string
  const base64Image: string = canvas.toDataURL('image/jpeg');
  return base64Image;

  // As a blob
  // return new Promise((resolve, reject) => {
  //   canvas.toBlob((blob) => {
  //     blob.name = fileName;
  //     resolve(blob);
  //   }, 'image/jpeg', 1);
  // });
}
