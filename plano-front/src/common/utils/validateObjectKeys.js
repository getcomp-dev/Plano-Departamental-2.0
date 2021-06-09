import { startCase } from "lodash-es";

function generalError(message) {
  this.name = "generalError";
  this.message = message || "";
}

function normalizeKeyName(str) {
  const keyName = startCase(str);
  return keyName.toLowerCase().replace(/[0-9]/g, "");
}

const validateObjectKeys = (obj, requiredKeys = []) => {
  for (let i = 0; i < requiredKeys.length; i++) {
    if (obj[requiredKeys[i]] === null)
      throw new generalError(`Campo <b>${normalizeKeyName(requiredKeys[i])}</b> inválido.`);
  }
};
export default validateObjectKeys;
