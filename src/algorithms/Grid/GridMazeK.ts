// TypeScript Implementation for Kruskal's Algorithm in Maze Generation

// Type definition for a Cell in the maze
type Cell = { row: number; col: number };

// Type definition for an Edge between two Cells
type Edge = { cell1: Cell; cell2: Cell };

// DisjointSet class to manage union-find operations
class DisjointSet {
  private parent: Record<string, Cell>;
  private rank: Record<string, number>;

  constructor() {
    this.parent = {};
    this.rank = {};
  }

  // Create a set with a single element
  makeSet(cell: Cell): void {
    const id = `${cell.row}-${cell.col}`;
    this.parent[id] = cell;
    this.rank[id] = 0;
  }

  // Find the root of the set that a cell belongs to
  find(cell: Cell): Cell {
    const id = `${cell.row}-${cell.col}`;
    if (this.parent[id] !== cell) {
      this.parent[id] = this.find(this.parent[id]);
    }
    return this.parent[id];
  }

  // Union two sets
  union(cell1: Cell, cell2: Cell): void {
    const id1 = `${cell1.row}-${cell1.col}`;
    const id2 = `${cell2.row}-${cell2.col}`;

    const parent1 = this.find(cell1);
    const parent2 = this.find(cell2);

    const parentId1 = `${parent1.row}-${parent1.col}`;
    const parentId2 = `${parent2.row}-${parent2.col}`;

    if (parentId1 === parentId2) {
      return; // They are already in the same set
    }

    // Union by rank
    if (this.rank[parentId1] > this.rank[parentId2]) {
      this.parent[parentId2] = parent1;
    } else if (this.rank[parentId1] < this.rank[parentId2]) {
      this.parent[parentId1] = parent2;
    } else {
      this.parent[parentId2] = parent1;
      this.rank[parentId1] += 1;
    }
  }
}

// Function to generate a maze using Kruskal's algorithm
export function generateKruskalMaze(rows: number, cols: number): number[][] {
  // Initialize maze with walls (1)
  const maze = Array.from({ length: rows }, () => Array(cols).fill(1));

  // Initialize Disjoint Set
  const ds = new DisjointSet();
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      ds.makeSet({ row, col });
    }
  }

  // Create list of all possible edges
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

  // Shuffle edges for randomness
  edges = edges.sort(() => Math.random() - 0.5);

  // Apply Kruskal's Algorithm to build the maze
  edges.forEach((edge) => {
    const { cell1, cell2 } = edge;
    if (
      ds.find(cell1).row !== ds.find(cell2).row ||
      ds.find(cell1).col !== ds.find(cell2).col
    ) {
      ds.union(cell1, cell2);

      // Remove the wall between cells
      maze[cell1.row][cell1.col] = 0;
      maze[cell2.row][cell2.col] = 0;
      if (cell1.row === cell2.row) {
        // Horizontal adjacent cells - no need for rounding
        maze[cell1.row][(cell1.col + cell2.col) / 2] = 0;
      } else {
        // Vertical adjacent cells - use the row of either cell1 or cell2
        maze[cell1.row][cell1.col] = 0; // This line might be redundant
        maze[cell2.row][cell1.col] = 0;
      }
    }
    console.log("Edges: ", edge);
  });

  return maze;
}
