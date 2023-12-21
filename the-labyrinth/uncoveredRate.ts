export const uncoveredRate = (maze: string[], totalCover: number): number => {
  let covered = 0;

  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === "?") covered++;
    }
  }
  return Math.round((100 * (totalCover - covered)) / totalCover);
};

export default uncoveredRate;
