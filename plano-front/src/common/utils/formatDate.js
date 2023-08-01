function formatDate(y, m, d) {
  let date = "yyyy-MM-dd";

  date = date.replace("yyyy", y);
  date = date.replace("MM", m < 10 ? "0" + m : m);
  date = date.replace("dd", d < 10 ? "0" + d : d);

  return date;
}

export default formatDate;
