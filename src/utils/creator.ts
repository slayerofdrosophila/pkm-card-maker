import { Card } from "interfaces";
import htmlToImage from 'html-to-image';
import { cardToRequestCard, HttpRequestCardKey } from "./card";
import { blobToFile } from "./file";

export const cardToFormData = async (card: Card) => {
  const cardHtml = document.getElementById('card');
  if(cardHtml) {
    const fullBlob = await htmlToImage.toBlob(cardHtml);
    const formData = new FormData();
    const reqCard = await cardToRequestCard(card);

    if(fullBlob) {
      const fullCardImage = blobToFile(fullBlob, `${reqCard.name}_fullCardImage`);
      formData.set('full_card_image', fullCardImage);
      Object.keys(reqCard).forEach(async (k: string) => {
        const key = k as HttpRequestCardKey;
        const value = reqCard[key];
        if(value !== undefined) {
          if((value as File).name) {
            formData.append(key, value as File);
          } else {
            formData.append(key, ''+value);
          }
        }
      });
      return formData;
    }
  }

  return false;
}
