function maskTurmaLetra(event) {
  let key = event.key ? event.key.toUpperCase() : event.which;
  if (!key.match(/[A-Z]/i) || event.target.value.length >= 3)
    event.preventDefault();
}

export default maskTurmaLetra;
