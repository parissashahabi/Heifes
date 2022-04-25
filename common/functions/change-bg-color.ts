const changeBgColor = (color: string) => {
  if (typeof window === "undefined") return;
  const html = document.getElementsByTagName("body")[0];
  html.style.backgroundColor = color;
};
export default changeBgColor;