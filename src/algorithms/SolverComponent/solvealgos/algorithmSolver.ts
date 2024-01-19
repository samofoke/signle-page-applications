type Cell = { row: number; col: number };

export const solveDepthFirstSearch = (
  maze: number[][],
  start: Cell,
  end: Cell
): Cell[] => {
  const path: Cell[] = [];
  const visited: boolean[][] = maze.map((row) => row.map(() => false));
  const direction: [number, number][] = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  const dfs = (cell: Cell): boolean => {
    const { row, col } = cell;
    if (row === end.row && col === end.col) {
      return true;
    }

    visited[row][col] = true;

    for (const [dr, dc] of direction) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (
        newRow >= 0 &&
        newCol >= 0 &&
        newRow < maze.length &&
        newCol < maze[0].length &&
        maze[newRow][newCol] !== 1 &&
        !visited[newRow][newCol]
      ) {
        if (dfs({ row: newRow, col: newCol })) {
          path.push(cell);
          return true;
        }
      }
    }

    return false;
  };

  dfs(start);
  return path.reverse();
};

export const solveBreathFirstSearch = (
  maze: number[][],
  start: Cell,
  end: Cell
): Cell[] => {
  const queue: Cell[] = [start];
  const visited: boolean[][] = maze.map((row) => row.map(() => false));
  const parent: (Cell | null)[][] = maze.map((row) => row.map(() => null));
  const directions: [number, number][] = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  visited[start.row][start.col] = true;

  while (queue.length > 0) {
    const cell = queue.shift();

    if (cell) {
      const { row, col } = cell;

      if (row === end.row && col === end.col) {
        const path: Cell[] = [];
        let current: Cell | null = cell;
        while (current) {
          path.push(current);
          current = parent[current.row][current.col];
        }
        return path.reverse();
      }

      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (
          newRow >= 0 &&
          newCol >= 0 &&
          newRow < maze.length &&
          newCol < maze[0].length &&
          maze[newRow][newCol] !== 1 &&
          !visited[newRow][newCol]
        ) {
          queue.push({ row: newRow, col: newCol });
          visited[newRow][newCol] = true;
          parent[newRow][newCol] = cell;
        }
      }
    }
  }

  return [];
};
