import { TCoord } from ".";

export const roomCoord = (maze: string[]): TCoord => {
  let res = [-1, -1] as TCoord;
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === "C") (res[0] = i), (res[1] = j);
    }
  }
  return res;
};

export default roomCoord;
