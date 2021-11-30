export const dateFormatter = (dateStamp) => {
  let date = dateStamp.slice(0, 10);
  let time = dateStamp.slice(11, 16);
  return `${time} ${date}`;
};
