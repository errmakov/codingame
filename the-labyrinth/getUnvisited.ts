import { TCoord, TGraph } from "./index";
export const getUnvisited = (
  graph: TGraph,
  visited: string[],
  rc: TCoord,
  unlinked: string[]
): TCoord => {
  let res: TCoord = [-1, -1];
  Object.keys(graph).forEach((node) => {
    if (
      !visited.includes(node) &&
      node !== `${rc[0]},${rc[1]}` &&
      !unlinked.includes(node)
    ) {
      const c = node.split(",").map((n) => parseInt(n));
      res = [c[0], c[1]];
    }
  });
  if (res[0] === -1 && res[1] === -1)
    return getUnvisited(graph, visited, res, unlinked);
  return res;
};

export default getUnvisited;
