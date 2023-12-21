//https://www.codingame.com/ide/puzzle/the-labyrinth
import bfs from "./bfs";
import getDirection from "./getDirection";
import getUnvisited from "./getUnvisited";
import { TCoord, TGraph } from "./index";
import move from "./move";
import printMaze from "./printMaze";
import roomCoord from "./roomCoord";
import sleep from "./sleep";
import uncoveredRate from "./uncoveredRate";
import updateGraph from "./updateGraph";
import updateMaze from "./updateMaze";
let maze = [
  "##############################",
  "#????????????????????????????#",
  "#??#?#######################?#",
  "#??#?#?????????????????T?????#",
  "#??#?#?????????????????#?????#",
  "#??#?#######################?#",
  "###????#??????##??????##?????#",
  "#???#??#??##??##??##??####???#",
  "#???#?????##??????##?????????#",
  "##?###########################",
  "#??????????????#??????#??????#",
  "#?????????????????????#??C???#",
  "#??####################??#???#",
  "#????????????????????????????#",
  "##############################",
];

const SLEEP = 10; // ms
let exitReached = false;
let flagReached = false;
let moveMode = "goExplore"; // "goExplore" | "goHome"
let direction = "";
let failed = false;
let iP: TCoord = [3, 23];
let p: TCoord = [...iP];
let turn = 0;
let rc: TCoord = [-1, -1];
const R = 2; // radar
const MAX_TURNS = 1000;
const initCovered =
  maze.reduce(
    (acc, cur) =>
      acc + cur.split("").reduce((a, c) => a + (c === "?" ? 1 : 0), 0),
    0
  ) - 2; // -T -C

let visited: string[] = [];
let graph: TGraph = {};
const run = async () => {
  while (true) {
    turn++;
    if (rc[0] === -1 && rc[1] === -1) rc = roomCoord(maze);
    maze = updateMaze(maze, p, ".");
    let ur = uncoveredRate(maze, initCovered);
    graph = updateGraph(graph, p, maze, R);
    if (!visited.includes(`${p[0]},${p[1]}`)) visited.push(`${p[0]},${p[1]}`);

    if (maze[p[0]][p[1]] === "#") failed = true;
    if (maze[p[0]][p[1]] === "C") {
      flagReached = true;
      moveMode = "goHome";
      console.log("Flag reached!");
    }
    if (maze[p[0]][p[1]] === "T" && flagReached) exitReached = true;
    if (failed || exitReached || turn > MAX_TURNS) break;
    let next = [-1, -1] as TCoord;
    if (moveMode === "goExplore") {
      let path;
      const unlinked: string[] = [];
      do {
        let d = getUnvisited(
          graph,
          visited,
          ur < 100 ? rc : [-1, -1],
          unlinked
        );
        if (d[0] === -1) failed = true;
        path = bfs(graph, `${p[0]},${p[1]}`, `${d[0]},${d[1]}`);
        unlinked.push(`${d[0]},${d[1]}`);
      } while (path.path.length === 0);
      next = path.path[1].split(",").map((x) => parseInt(x)) as TCoord;
    } else if (moveMode === "goHome") {
      let path = bfs(graph, `${p[0]},${p[1]}`, `${iP[0]},${iP[1]}`);
      next = path.path[1].split(",").map((x) => parseInt(x)) as TCoord;
    }
    direction = getDirection(p, next);
    p = move(direction, p);
    await sleep(SLEEP);
    printMaze(maze, p, turn);
    continue;
  }
  // after while
  console.log("initCovered", initCovered);
  if (failed && direction === "") {
    console.log(
      "Stuck and nowhere to go x_x",
      p,
      maze[p[0]][p[1]],
      "Turn",
      turn
    );
  } else if (failed) console.log("Died x_x", p, maze[p[0]][p[1]], "Turn", turn);
  if (exitReached) console.log("Win!", "Turn", turn);
  if (turn === MAX_TURNS)
    console.log("Timeouted :(", p, maze[p[0]][p[1]], "Turn", turn);
};

run();
export {};
