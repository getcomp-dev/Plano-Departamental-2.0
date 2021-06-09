export default function getKeysTurmaSIGA(turmaSIGA) {
  const keys = {
    disciplinaCod: null,
    letra: null,
    cursoCod: null,
    vagas1: null,
    vagas2: null,
    horarioESala: null,
    docentes: null,
  };
  let i = 0;
  for (const key in turmaSIGA) {
    if (i === 1) keys.disciplinaCod = key;
    else if (i === 2) keys.letra = key;
    else if (i === 3) keys.cursoCod = key;
    else if (i === 5) keys.vagas1 = key;
    else if (i === 6) keys.vagas2 = key;
    else if (i === 7) keys.horarioESala = key;
    else if (i === 8) {
      keys.docentes = key;
      break;
    }
    i++;
  }

  return keys;
}
