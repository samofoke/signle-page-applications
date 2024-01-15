type Cell = { row: number; col: number };

function distanceTooClose(
  point1: [number, number],
  point2: [number, number],
  minDistance: number
): boolean {
  const [y1, x1] = point1;
  const [y2, x2] = point2;
  return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2)) < minDistance;
}

// export const generateBinaryTreeMaze = (
//   width: number,
//   height: number
// ): number[][] => {
//   let maze = Array.from({ length: height }, () => Array(width).fill(1));

//   for (let y = 0; y < height; y++) {
//     for (let x = 0; x < width; x++) {
//       let directions: [number, number][] = [];

//       if (y < height - 1) {
//         directions.push([y + 1, x]);
//       }

//       if (x < width - 1) {
//         directions.push([y, x + 1]);
//       }

//       if (directions.length > 0) {
//         const [ny, nx] =
//           directions[Math.floor(Math.random() * directions.length)];
//         maze[ny][nx] = 0;
//       }
//     }
//   }

//   let entrance: [number, number], exit: [number, number];
//   do {
//     entrance = [
//       Math.floor(Math.random() * height),
//       Math.floor(Math.random() * width),
//     ];
//     exit = [
//       Math.floor(Math.random() * height),
//       Math.floor(Math.random() * width),
//     ];
//   } while (distanceTooClose(entrance, exit, Math.min(width, height) / 3));

//   maze[entrance[0]][entrance[1]] = 2;
//   maze[exit[0]][exit[1]] = 3;

//   console.log("Binary maze: ", maze);

//   return maze;
// };

export const generateBinaryTreeMaze = (
  width: number,
  height: number
): number[][] => {
  let maze = Array.from({ length: height }, () => Array(width).fill(1));

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let directions: [number, number][] = [];

      // Add south neighbor if not on the bottom edge
      if (y < height - 1) {
        directions.push([y + 1, x]);
      }

      // Add east neighbor if not on the right edge
      if (x < width - 1) {
        directions.push([y, x + 1]);
      }

      // Randomly select either south or east (or none if on the bottom right corner)
      if (directions.length > 0) {
        const [ny, nx] =
          directions[Math.floor(Math.random() * directions.length)];
        // Carve the path between the current cell and the chosen direction
        maze[y][x] = 0; // Clear the current cell
        maze[ny][nx] = 0; // Clear the chosen neighboring cell
      }
    }
  }

  // Randomly generate entrance and exit
  let entrance: [number, number], exit: [number, number];
  do {
    entrance = [
      Math.floor(Math.random() * height),
      Math.floor(Math.random() * width),
    ];
    exit = [
      Math.floor(Math.random() * height),
      Math.floor(Math.random() * width),
    ];
  } while (distanceTooClose(entrance, exit, Math.min(width, height) / 3));

  maze[entrance[0]][entrance[1]] = 2; // Mark entrance
  maze[exit[0]][exit[1]] = 3; // Mark exit

  console.log("binary maze: ", maze);
  return maze;
};

export const isPathInMazeTree = (
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

    // Check for bounds and if the cell is already visited or is a wall
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

    // Check if the exit is reached
    if (row === end.row && col === end.col) {
      return true;
    }

    visited[row][col] = true;

    // Explore all four directions
    const directions = [
      { row: row + 1, col: col },
      { row: row - 1, col: col },
      { row, col: col + 1 },
      { row, col: col - 1 },
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
