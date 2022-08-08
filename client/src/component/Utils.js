export const dateParser = (num) => {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  let timestamp = Date.parse(num);
  let date = new Date(timestamp).toLocaleDateString("en-UK", options);

  return date.toString();
};

//check if a value is empty or not
export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export const timestampParser = (num) => {
  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  let date = new Date(num).toLocaleDateString("en-UK", options);

  return date.toString();
};
