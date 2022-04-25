const rialiNumber = (value?: number) => {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (isNaN(value)) {
    return value;
  }
  return Number(value).toLocaleString("en-AU");
};

export default rialiNumber;
