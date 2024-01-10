// The DFS alogrithm to generate the maze

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const generateDFSGridMaze = (
  width: number,
  height: number
): number[][] => {
  let maze = Array.from({ length: height }, () => Array(width).fill(1));

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

  let stack = [entrance];

  while (stack.length > 0) {
    let [y, x] = stack.pop() || [0, 0];
    let visitedNeighbors = 0;
    let neighbors = [
      [y - 1, x],
      [y, x + 1],
      [y + 1, x],
      [y, x - 1],
    ];

    shuffleArray(neighbors);

    for (let [ny, nx] of neighbors) {
      if (
        ny >= 0 &&
        ny < height &&
        nx >= 0 &&
        nx < width &&
        maze[ny][nx] === 0
      ) {
        visitedNeighbors++;
      }
    }

    if (visitedNeighbors <= 1) {
      maze[y][x] = 0;
      for (let [ny, nx] of neighbors) {
        if (
          ny >= 0 &&
          ny < height &&
          nx >= 0 &&
          nx < width &&
          maze[ny][nx] === 1
        ) {
          stack.push([ny, nx]);
        }
      }
    }
  }

  maze[entrance[0]][entrance[1]] = 2;
  maze[exit[0]][exit[1]] = 3;

  return maze;
};

const distanceTooClose = (
  point1: [number, number],
  point2: [number, number],
  minDistance: number
): boolean => {
  const [y1, x1] = point1;
  const [y2, x2] = point2;
  const distance = Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
  return distance < minDistance;
};
