export const getCardOptions = async () => {
  try {
    const response = await fetch('/data/cardOptions.json');
    return response.json();
  } catch(e) {
    console.error(e);
  }
}
