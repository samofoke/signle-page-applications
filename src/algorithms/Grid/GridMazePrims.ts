type Cell = { row: number; col: number };

export function generatePrimsMaze(rows: number, cols: number): number[][] {
  // Initialize maze with all walls
  const maze = Array.from({ length: rows }, () => Array(cols).fill(1));

  // Function to get the neighbors of a cell
  const getNeighbors = (row: number, col: number): [number, number][] => [
    [row - 1, col],
    [row, col + 1],
    [row + 1, col],
    [row, col - 1],
  ];

  // Randomly select a cell and start from it
  const startRow = Math.floor(Math.random() * rows);
  const startCol = Math.floor(Math.random() * cols);
  maze[startRow][startCol] = 0;

  // Add walls of the starting cell to the wall list
  let walls = getNeighbors(startRow, startCol);

  while (walls.length > 0) {
    // Randomly select a wall
    const randomIndex = Math.floor(Math.random() * walls.length);
    const [wallRow, wallCol] = walls[randomIndex];
    walls.splice(randomIndex, 1); // Remove the selected wall

    // Proceed only if the cell is within bounds
    if (wallRow >= 0 && wallRow < rows && wallCol >= 0 && wallCol < cols) {
      // Check if only one of the two cells is visited
      const neighbors = getNeighbors(wallRow, wallCol).filter(
        ([nRow, nCol]) => nRow >= 0 && nRow < rows && nCol >= 0 && nCol < cols
      );
      const visitedNeighbors = neighbors.filter(
        ([nRow, nCol]) => maze[nRow][nCol] === 0
      );

      if (visitedNeighbors.length === 1) {
        // Make the wall a passage
        maze[wallRow][wallCol] = 0;

        // Add the neighboring walls of the cell to the wall list
        walls.push(
          ...neighbors.filter(([nRow, nCol]) => maze[nRow][nCol] === 1)
        );
      }
    }
  }

  // Add random entrance and exit
  const entrance = { row: 0, col: Math.floor(Math.random() * cols) };
  const exit = { row: rows - 1, col: Math.floor(Math.random() * cols) };
  maze[entrance.row][entrance.col] = 2;
  maze[exit.row][exit.col] = 3;

  return maze;
}

export const isPathInMazePrims = (
  maze: number[][],
  start: Cell,
  end: Cell
): boolean => {
  const rows = maze.length;
  const cols = maze[0].length;
  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );

  function dfs(cell: Cell): boolean {
    const { row, col } = cell;

    if (
      row < 0 ||
      col < 0 ||
      row >= rows ||
      col >= cols ||
      visited[row][col] ||
      maze[row][col] === 1
    ) {
      return false;
    }
    if (row === end.row && col === end.col) {
      return true;
    }
    visited[row][col] = true;
    const directions = [
      { row: row + 1, col: col },
      { row: row, col: col + 1 },
      { row: row - 1, col: col },
      { row: row, col: col - 1 },
    ];
    for (const nextCell of directions) {
      if (dfs(nextCell)) {
        return true;
      }
    }
    return false;
  }

  return dfs(start);
};
