function generalError(message) {
  this.name = "Erro";
  this.message = message || "";
}
function normalizeKeyName(str) {
  return str.toLowerCase().replace(/[0-9]/g, "");
}

const validateObjectKeys = (obj, requiredKeys) => {
  for (let i = 0; i < requiredKeys.length; i++) {
    if (obj[requiredKeys[i]] === null)
      throw new generalError(
        `Campo <b>${normalizeKeyName(requiredKeys[i])}</b> inválido.`
      );
  }
};
export default validateObjectKeys;
