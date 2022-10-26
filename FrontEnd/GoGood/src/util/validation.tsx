export const nonEmpty = (text: string | undefined) => {
  return text ? text.length > 0 : false;
};

export const phoneValidate = (number: string | undefined) => {
  return number ? number.length === 10 : false;
};
