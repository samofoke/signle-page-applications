import React, { useState } from "react";
import { Box } from "@mui/material";
import { generateDFSGridMaze } from "../../algorithms/Grid/GridMazeDFS";
import { generateKruskalMaze } from "../../algorithms/Grid/GridMazeK";
import MenuComponent from "../MenuHome";
import MazeBoard from "../Maze/MazeBoard";

const MazeManager: React.FC = () => {
  const [maze, setMaze] = useState<number[][]>([]);

  // const findCellWithValue = (maze: number[][], value: number): Cell | null => {
  //   for (let row = 0; row < maze.length; row++) {
  //     for (let col = 0; col < maze[0].length; col++) {
  //       if (maze[row][col] === value) {
  //         return { row, col };
  //       }
  //     }
  //   }
  //   return null;
  // };

  // const isPathInMaze = (maze: number[][], start: Cell, end: Cell): boolean => {
  //   const rows = maze.length;
  //   const cols = maze[0].length;
  //   const visited: boolean[][] = Array.from({ length: rows }, () =>
  //     Array(cols).fill(false)
  //   );
  //   const stack: Cell[] = [start];

  //   while (stack.length > 0) {
  //     const { row, col } = stack.pop()!;
  //     if (row === end.row && col === end.col) {
  //       return true; // Path found
  //     }

  //     // Mark as visited
  //     visited[row][col] = true;

  //     // Add adjacent cells to stack if they are not walls and not visited
  //     const directions = [
  //       [1, 0],
  //       [0, 1],
  //       [-1, 0],
  //       [0, -1],
  //     ];
  //     for (const [dr, dc] of directions) {
  //       const newRow = row + dr;
  //       const newCol = col + dc;
  //       if (
  //         newRow >= 0 &&
  //         newRow < rows &&
  //         newCol >= 0 &&
  //         newCol < cols &&
  //         maze[newRow][newCol] === 0 &&
  //         !visited[newRow][newCol]
  //       ) {
  //         stack.push({ row: newRow, col: newCol });
  //       }
  //     }
  //   }

  //   return false; // No path found
  // };

  const handleStartGame = (selectMazeType: string) => {
    let isValidMaze = false;
    let newMaze: number[][] = [];
    while (!isValidMaze) {
      if (selectMazeType === "grid") {
        const gridGenerator = [generateDFSGridMaze, generateKruskalMaze];
        const generateMaze =
          gridGenerator[Math.floor(Math.random() * gridGenerator.length)];
        newMaze = generateMaze(10, 10);

        // Dynamically find the entrance and exit
        // const entrance = findCellWithValue(newMaze, 2);
        // const exit = findCellWithValue(newMaze, 3);

        // if (entrance && exit) {
        //   isValidMaze = isPathInMaze(newMaze, entrance, exit);
        // }
      }

      if (!isValidMaze) {
        console.error("Invalid maze generated, regenerating...");
        // Optionally, you can add a delay here if needed to prevent rapid regeneration
      }
    }

    setMaze(newMaze);
  };
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <MenuComponent onStart={handleStartGame} />
      <MazeBoard maze={maze} />
    </Box>
  );
};

export default MazeManager;
