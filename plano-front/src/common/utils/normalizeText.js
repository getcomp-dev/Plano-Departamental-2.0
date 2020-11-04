function normalizeText(text, upperCase = true) {
  const textNormalized = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "");

  return upperCase ? textNormalized.toUpperCase() : textNormalized;
}

export default normalizeText;
