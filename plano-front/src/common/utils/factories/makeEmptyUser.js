function makeEmptyUser(overwriteValues = {}) {
  const { id = null, nome = "", login = "", senha = "", admin = 0 } = overwriteValues;
  return { id, nome, login, senha, admin };
}
export default makeEmptyUser;
