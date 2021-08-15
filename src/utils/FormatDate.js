function FormatDate(date) {
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false
  };

  return new Intl.DateTimeFormat("en", options).format(new Date(date));
}

export default FormatDate;
