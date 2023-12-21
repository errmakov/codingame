type TGraph = { [node: string]: string[] };

const bfs = (
  graph: TGraph,
  source: string,
  target: string
): { distance: number; path: string[] } => {
  const queue: string[] = [source];
  const distances: { [node: string]: number } = { [source]: 0 };
  const parents: { [node: string]: string | undefined } = {
    [source]: undefined,
  };

  while (queue.length > 0) {
    const currentNode: string = queue.shift() as string;
    for (const neighbor of graph[currentNode]) {
      if (distances[neighbor] === undefined) {
        distances[neighbor] = distances[currentNode] + 1;
        parents[neighbor] = currentNode;
        queue.push(neighbor);
      }
    }
  }

  if (distances[target] !== undefined) {
    const path: string[] = [target];
    let current = target;
    while (parents[current] !== undefined) {
      path.unshift(parents[current] as string);
      current = parents[current] as string;
    }
    return { distance: distances[target], path };
  }
  return { distance: -1, path: [] };
};
export default bfs;
