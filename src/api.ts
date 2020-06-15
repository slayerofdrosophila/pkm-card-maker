export const getCardOptions = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_RELATIVE_PREFIX || ''}/data/cardOptions.json`);
    return response.json();
  } catch(e) {
    console.error(e);
  }
}
