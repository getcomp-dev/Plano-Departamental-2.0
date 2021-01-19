function debounceEvent(timeOut) {
  return (fn, wait = 500) => clearTimeout(timeOut, (timeOut = setTimeout(() => fn(), wait)));
}
const debounce = debounceEvent();

export default debounce;
