type Cell = number;
type Edge = [Cell, Cell];

const shuffleArray = (array: any[]): void => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const find = (cell: Cell, parent: Record<Cell, Cell>): Cell => {
  while (parent[cell] !== cell) {
    cell = parent[cell];
  }
  return cell;
};

const union = (
  cell1: Cell,
  cell2: Cell,
  parent: Record<Cell, Cell>,
  rank: Record<Cell, number>
): boolean => {
  let root1 = find(cell1, parent);
  let root2 = find(cell2, parent);

  if (root1 === root2) {
    return false;
  }

  if (rank[root1] < rank[root2]) {
    parent[root1] = root2;
  } else if (rank[root1] > rank[root2]) {
    parent[root2] = root1;
  } else {
    parent[root2] = root1;
    rank[root1]++;
  }

  return true;
};

const selectRandomCell = (width: number, height: number): [number, number] => {
  let perimeter: [number, number][] = [];

  for (let x = 0; x < width; x++) {
    perimeter.push([0, x], [height - 1, x]);
  }

  for (let y = 1; y < height - 1; y++) {
    perimeter.push([y, 0], [y, width - 1]);
  }

  return perimeter[Math.floor(Math.random() * perimeter.length)];
};

export const generateKruskalMaze = (
  width: number,
  height: number
): number[][] => {
  let maze: number[][] = Array.from({ length: height }, () =>
    Array(width).fill(1)
  );
  let parent: Record<Cell, Cell> = [];
  let rank: Record<Cell, number> = [];
  let edges: Edge[] = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let cell: Cell = y * width + x;
      parent[cell] = cell;
      rank[cell] = 0;

      if (x < width - 1) {
        edges.push([cell, cell + 1]);
      }
      if (y < height - 1) {
        edges.push([cell, cell + width]);
      }
    }
  }

  shuffleArray(edges);

  for (let [cell1, cell2] of edges) {
    if (union(cell1, cell2, parent, rank)) {
      let x1 = cell1 % width;
      let y1 = Math.floor(cell1 / width);
      let x2 = cell2 % width;
      let y2 = Math.floor(cell2 / width);

      if (x1 === x2) {
        maze[Math.min(y1, y2) + 1][x1] = 0;
      } else {
        maze[y1][Math.min(x1, x2) + 1] = 0;
      }
    }
  }

  let entrence = selectRandomCell(width, height);
  let exit: [number, number];

  do {
    exit = selectRandomCell(width, height);
  } while (entrence[0] === exit[0] && entrence[1] === exit[1]);

  maze[entrence[0]][entrence[1]] = 2;
  maze[exit[0]][exit[1]] = 3;

  return maze;
};
