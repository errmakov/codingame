import { TCoord } from "./index";
const getDirection = (a: TCoord, b: TCoord): string => {
  //get direction from a to b
  if (a[0] > b[0]) return "UP";
  if (a[0] < b[0]) return "DOWN";
  if (a[1] > b[1]) return "LEFT";
  if (a[1] < b[1]) return "RIGHT";
  return "";
};
export default getDirection;
