import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  generateDFSGridMaze,
  isPathInMazeDFS,
} from "../../algorithms/Grid/GridMazeDFS";
import {
  generateKruskalMaze,
  isPathInMazeKruskal,
  isMazeFullyConnected,
} from "../../algorithms/Grid/GridMazeK";
import MenuComponent from "../MenuHome";
import MazeBoard from "../Maze/MazeBoard";

const MazeManager: React.FC = () => {
  const [maze, setMaze] = useState<number[][]>([]);

  const handleStartGame = (selectMazeType: string) => {
    let newMaze: number[][] = [];
    let entrance, exit;

    do {
      const generateMaze =
        Math.random() < 0.5 ? generateDFSGridMaze : generateKruskalMaze;
      newMaze = generateMaze(20, 20);

      entrance = findCellWithValue(newMaze, 2); 
      exit = findCellWithValue(newMaze, 3);

      // For Kruskal-generated mazes, check if the maze is fully connected
      if (
        generateMaze === generateKruskalMaze &&
        !isMazeFullyConnected(newMaze)
      ) {
        console.error("Invalid Kruskal maze generated, regenerating...");
        continue;
      }

      // Check if a valid path exists in the maze
      if (
        entrance &&
        exit &&
        (generateMaze === generateDFSGridMaze
          ? isPathInMazeDFS(newMaze, entrance, exit)
          : isPathInMazeKruskal(newMaze, entrance, exit))
      ) {
        setMaze(newMaze);
        break;
      }

      console.error("Invalid maze generated, regenerating...");
    } while (true);
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

// Helper function to find a cell with a specific value (2 for entrance, 3 for exit)
function findCellWithValue(maze: number[][], value: number) {
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
      if (maze[row][col] === value) {
        return { row, col };
      }
    }
  }
  return null;
}
