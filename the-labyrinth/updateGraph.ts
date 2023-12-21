import { TCoord, TGraph } from ".";
import { validNodes } from "./validNodes";
const inMaze = (p: TCoord, maze: string[]): boolean => {
  return p[0] >= 0 && p[0] < maze.length && p[1] >= 0 && p[1] < maze[0].length;
};
export const updateGraph = (
  graph: TGraph,
  p: TCoord,
  maze: string[],
  r: number
): TGraph => {
  let newGraph = { ...graph };

  for (let i = -r; i <= r; i++) {
    for (let j = -r; j <= r; j++) {
      let y = p[0] + i;
      let x = p[1] + j;
      if (!inMaze([y, x], maze)) continue;
      if (!validNodes.includes(maze[y][x])) continue;
      const cnode = `${y},${x}`;
      if (!newGraph[`${y},${x}`]) newGraph[`${y},${x}`] = [];
      if (inMaze([y + 1, x], maze) && validNodes.includes(maze[y + 1][x])) {
        const nnode = `${y + 1},${x}`;
        if (!newGraph[`${y + 1},${x}`]) newGraph[`${y + 1},${x}`] = [];
        if (!newGraph[cnode].includes(nnode)) newGraph[cnode].push(nnode);
        if (!newGraph[nnode].includes(cnode)) newGraph[nnode].push(cnode);
      }
      if (inMaze([y - 1, x], maze) && validNodes.includes(maze[y - 1][x])) {
        const nnode = `${y - 1},${x}`;
        if (!newGraph[`${y - 1},${x}`]) newGraph[`${y - 1},${x}`] = [];
        if (!newGraph[cnode].includes(nnode)) newGraph[cnode].push(nnode);
        if (!newGraph[nnode].includes(cnode)) newGraph[nnode].push(cnode);
      }
      if (inMaze([y, x + 1], maze) && validNodes.includes(maze[y][x + 1])) {
        const nnode = `${y},${x + 1}`;
        if (!newGraph[`${y},${x + 1}`]) newGraph[`${y},${x + 1}`] = [];
        if (!newGraph[cnode].includes(nnode)) newGraph[cnode].push(nnode);
        if (!newGraph[nnode].includes(cnode)) newGraph[nnode].push(cnode);
      }
      if (inMaze([y, x - 1], maze) && validNodes.includes(maze[y][x - 1])) {
        const nnode = `${y},${x - 1}`;
        if (!newGraph[`${y},${x - 1}`]) newGraph[`${y},${x - 1}`] = [];
        if (!newGraph[cnode].includes(nnode)) newGraph[cnode].push(nnode);
        if (!newGraph[nnode].includes(cnode)) newGraph[nnode].push(cnode);
      }
    }
  }

  return newGraph;
};

export default updateGraph;
