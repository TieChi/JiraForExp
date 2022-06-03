export const isFasly = (value) => (value === 0 ? false : !value);

export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (isFasly(value)) {
      delete result[key];
    }
  });
  console.log(result);
  return result;
};
