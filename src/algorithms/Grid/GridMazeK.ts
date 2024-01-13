// Define Cell, Edge, and Disjoint Set for Kruskal's algorithm
type Cell = { row: number; col: number };
type Edge = { cell1: Cell; cell2: Cell };

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function addEntranceAndExit(maze: number[][], rows: number, cols: number) {
  const entranceRow = Math.floor(Math.random() * rows) * 2;
  const exitRow = Math.floor(Math.random() * rows) * 2;

  if (entranceRow < maze.length && exitRow < maze.length) {
    maze[entranceRow][0] = 2; // Marking the entrance
    maze[exitRow][maze[0].length - 1] = 3; // Marking the exit
  } else {
    console.error("Invalid entrance or exit row:", entranceRow, exitRow);
  }
}

class DisjointSet {
  private parent: Record<string, string>;
  private rank: Record<string, number>;

  constructor() {
    this.parent = {};
    this.rank = {};
  }

  makeSet(cell: Cell): void {
    const id = this.cellId(cell);
    this.parent[id] = id;
    this.rank[id] = 0;
  }

  find(cell: Cell): string {
    const id = this.cellId(cell);
    if (this.parent[id] !== id) {
      this.parent[id] = this.find({
        row: parseInt(this.parent[id].split("-")[0], 10),
        col: parseInt(this.parent[id].split("-")[1], 10),
      });
    }
    return this.parent[id];
  }

  union(cell1: Cell, cell2: Cell): void {
    const id1 = this.find(cell1);
    const id2 = this.find(cell2);

    if (id1 === id2) return;

    if (this.rank[id1] > this.rank[id2]) {
      this.parent[id2] = id1;
    } else if (this.rank[id1] < this.rank[id2]) {
      this.parent[id1] = id2;
    } else {
      this.parent[id2] = id1;
      this.rank[id1]++;
    }
  }

  private cellId(cell: Cell): string {
    return `${cell.row}-${cell.col}`;
  }
}

// Function to generate a maze using Kruskal's algorithm
// export function generateKruskalMaze(rows: number, cols: number): number[][] {
//   // Initialize the maze with walls (1) and cells (0)
//   const maze = Array.from({ length: rows * 2 - 1 }, (_, i) =>
//     Array.from({ length: cols * 2 - 1 }, (_, j) =>
//       i % 2 !== 0 || j % 2 !== 0 ? 1 : 0
//     )
//   );

//   const ds = new DisjointSet();
//   // Initialize disjoint sets for each cell
//   for (let row = 0; row < rows; row++) {
//     for (let col = 0; col < cols; col++) {
//       ds.makeSet({ row, col });
//     }
//   }

//   // Generate edges between adjacent cells
//   let edges = [];
//   for (let row = 0; row < rows; row++) {
//     for (let col = 0; col < cols; col++) {
//       if (row < rows - 1) {
//         edges.push({ cell1: { row, col }, cell2: { row: row + 1, col } });
//       }
//       if (col < cols - 1) {
//         edges.push({ cell1: { row, col }, cell2: { row, col: col + 1 } });
//       }
//     }
//   }

//   // Shuffle edges
//   shuffleArray(edges);

//   // Connect cells in the maze
//   edges.forEach(({ cell1, cell2 }) => {
//     if (ds.find(cell1) !== ds.find(cell2)) {
//       ds.union(cell1, cell2);

//       // Calculate the wall position between cell1 and cell2
//       const wallRow = cell1.row + cell2.row;
//       const wallCol = cell1.col + cell2.col;

//       maze[wallRow][wallCol] = 0; // Remove the wall
//     }
//   });

//   // Add random entrance and exit
//   addEntranceAndExit(maze, rows, cols);

//   console.log("kruskal maze: ", maze);

//   return maze;
// }

export function generateKruskalMaze(
  totalRows: number,
  totalCols: number
): number[][] {
  const rows = Math.ceil(totalRows / 2);
  const cols = Math.ceil(totalCols / 2);

  // Initialize the maze with walls (1) and cells (0)
  const maze: number[][] = Array.from({ length: totalRows }, (_, i) =>
    Array.from({ length: totalCols }, (_, j) =>
      i % 2 === 0 && j % 2 === 0 ? 0 : 1
    )
  );

  const ds = new DisjointSet();
  // Initialize disjoint sets for each cell
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      ds.makeSet({ row, col });
    }
  }

  // Generate edges between adjacent cells
  let edges: Edge[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (row < rows - 1) {
        edges.push({ cell1: { row, col }, cell2: { row: row + 1, col } });
      }
      if (col < cols - 1) {
        edges.push({ cell1: { row, col }, cell2: { row, col: col + 1 } });
      }
    }
  }

  // Shuffle edges
  shuffleArray(edges);

  // Connect cells in the maze
  edges.forEach(({ cell1, cell2 }) => {
    if (ds.find(cell1) !== ds.find(cell2)) {
      ds.union(cell1, cell2);
      const wallRow = cell1.row * 2;
      const wallCol = cell1.col * 2;
      if (cell1.row === cell2.row) {
        maze[wallRow][wallCol + 1] = 0;
      } else {
        maze[wallRow + 1][wallCol] = 0;
      }
    }
  });

  // Add random entrance and exit
  addEntranceAndExit(maze, rows, cols);

  return maze;
}

export function isPathInMazeKruskal(
  maze: number[][],
  start: Cell,
  end: Cell
): boolean {
  const rows = maze.length;
  const cols = maze[0].length;
  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );

  function dfs(cell: Cell): boolean {
    const { row, col } = cell;
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      visited[row][col] ||
      maze[row][col] === 1
    )
      return false;
    if (row === end.row && col === end.col) return true;

    visited[row][col] = true;
    return (
      dfs({ row: row + 1, col }) ||
      dfs({ row: row - 1, col }) ||
      dfs({ row, col: col + 1 }) ||
      dfs({ row, col: col - 1 })
    );
  }

  return dfs(start);
}

export function isMazeFullyConnected(maze: number[][]): boolean {
  const rows = maze.length;
  const cols = maze[0].length;
  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );

  function dfs(row: number, col: number): void {
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      visited[row][col] ||
      maze[row][col] === 1
    ) {
      return;
    }

    visited[row][col] = true;
    dfs(row + 1, col);
    dfs(row - 1, col);
    dfs(row, col + 1);
    dfs(row, col - 1);
  }

  // Find a starting cell for DFS and perform DFS
  let startFound = false;
  for (let row = 0; row < rows && !startFound; row++) {
    for (let col = 0; col < cols && !startFound; col++) {
      if (maze[row][col] !== 1) {
        dfs(row, col);
        startFound = true; // Break out of the nested loop
      }
    }
  }

  // Check if all non-wall cells are visited
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (maze[row][col] !== 1 && !visited[row][col]) {
        return false;
      }
    }
  }

  return true;
}
