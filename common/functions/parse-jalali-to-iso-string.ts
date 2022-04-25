export const parseJalaliToIsoString = (momentDate: any) => {
  try {
    return Object.keys(momentDate).includes('$d')
      ? new Date(momentDate.$d).toISOString()
      : new Date(momentDate).toISOString();
  } catch (e: any) {
    console.warn(e.message);
    return undefined;
  }
};
