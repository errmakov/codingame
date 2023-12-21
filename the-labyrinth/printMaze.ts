import { TCoord } from "./index";

export const printMaze = (m: string[], p: TCoord, turn: number) => {
  const maze = m.map((row, r) =>
    row
      .split("")
      .map((cell, c) =>
        r === p[0] && c === p[1] && m[r][c] !== "T" ? "+" : cell
      )
      .join("")
  );

  console.log(
    "\n",
    " ",
    maze[0].split("").reduce((acc, cur, i) => acc.concat(String(i % 10)), ""),
    "[",
    p[0] + "," + p[1],
    "]",
    "Turn",
    turn
  );
  maze.forEach((row, i) => console.log(String(i).padStart(2, "0"), row));
};

export default printMaze;
