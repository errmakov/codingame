export const consoleCut = (prompt: string, obj: any, c = 10): void => {
  const l = obj.length;
  if (l > c) {
    console.error(`${prompt} [last ${c} of ${l}] ...`, obj.slice(l - c));
  } else {
    console.error(prompt, obj);
  }
};
export default consoleCut;
