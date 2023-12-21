import { TCoord } from "./index";
export const move = (dir: string, p: TCoord): TCoord => {
  if (dir === "UP") p[0] -= 1;
  if (dir === "DOWN") p[0] += 1;
  if (dir === "LEFT") p[1] -= 1;
  if (dir === "RIGHT") p[1] += 1;
  return [...p];
};

export default move;
