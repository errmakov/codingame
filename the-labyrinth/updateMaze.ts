import { TCoord } from "./index";
export const updateMaze = (maze: string[], p: TCoord, c: string): string[] => {
  const notChangable = ["#", "T", "C"];
  c = notChangable.includes(maze[p[0]][p[1]]) ? maze[p[0]][p[1]] : c;
  const newMaze = [...maze];
  const [y, x] = p;
  const row = maze[y];
  const newRow = row.slice(0, x) + c + row.slice(x + 1);
  newMaze[y] = newRow;
  return newMaze;
};

export default updateMaze;
