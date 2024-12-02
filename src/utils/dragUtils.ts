const getDragDepth = (offset: number, indentationWidth: number) => {
  return Math.round(offset / indentationWidth);
};
