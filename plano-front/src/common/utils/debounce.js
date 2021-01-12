function debounceEvent(timeOut) {
  return (fn, wait = 500) => clearTimeout(timeOut, (timeOut = setTimeout(() => fn(), wait)));
}
const debouce = debounceEvent();

export default debouce;
