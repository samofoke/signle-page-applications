// Cell and Edge types
type Cell = { row: number; col: number };
type Edge = { cell1: Cell; cell2: Cell };

// DisjointSet class
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
        row: parseInt(this.parent[id].split("-")[0]),
        col: parseInt(this.parent[id].split("-")[1]),
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

export function generateKruskalMaze(rows: number, cols: number): number[][] {
  const maze = Array.from({ length: rows }, () => Array(cols).fill(1));
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

  // Randomly sort edges and use them to build the maze
  edges.sort(() => Math.random() - 0.5);
  edges.forEach(({ cell1, cell2 }) => {
    if (ds.find(cell1) !== ds.find(cell2)) {
      ds.union(cell1, cell2);

      if (cell1.row === cell2.row) {
        maze[cell1.row][Math.floor((cell1.col + cell2.col) / 2)] = 0;
      } else {
        maze[Math.floor((cell1.row + cell2.row) / 2)][cell1.col] = 0;
      }
    }
  });

  // Add random entrance and exit
  const entrance = { row: 0, col: Math.floor(Math.random() * cols) };
  const exit = { row: rows - 1, col: Math.floor(Math.random() * cols) };
  maze[entrance.row][entrance.col] = 2;
  maze[exit.row][exit.col] = 3;

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
