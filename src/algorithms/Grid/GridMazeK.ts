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



export const generateKruskalMzae = (
  width: number,
  height: number
): number[][] => {
  let maze: number[][] = Array.from({ length: height }, () =>
    Array(width).fill(1)
  );

  return maze;
};
