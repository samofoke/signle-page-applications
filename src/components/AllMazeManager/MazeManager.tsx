import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  generateDFSGridMaze,
  isPathInMazeDFS,
} from "../../algorithms/Grid/GridMazeDFS";
import {
  generatePrimsMaze,
  isPathInMazePrims,
} from "../../algorithms/Grid/GridMazePrims";
import {
  generateKruskalMaze,
  isPathInMazeKruskal,
  isMazeFullyConnected,
} from "../../algorithms/Grid/GridMazeK";
import {
  generateBinaryTreeMaze,
  isPathInMazeTree,
} from "../../algorithms/Grid/GridBinaryTree";
import MenuComponent from "../MenuHome";
import MazeBoard from "../Maze/MazeBoard";

const MazeManager: React.FC = () => {
  const [maze, setMaze] = useState<number[][]>([]);
  const [error, setError] = useState<string>("");

  const handleStartGame = (selectMazeType: string) => {
    let newMaze: number[][] = [];

    for (let attempt = 0; attempt < 10; attempt++) {
      let generateMaze;
      if (selectMazeType === "grid") {
        const gridMazeSelector = [
          // generateDFSGridMaze,
          // generateKruskalMaze,
          // generatePrimsMaze,
          generateBinaryTreeMaze,
        ];
        generateMaze =
          gridMazeSelector[Math.floor(Math.random() * gridMazeSelector.length)];
      } else {
        setError(`Maze type ${selectMazeType} is not implemented.`);
        break;
      }

      newMaze = generateMaze(20, 20);
      const entrance = findCellWithValue(newMaze, 2);
      const exit = findCellWithValue(newMaze, 3);

      if (!entrance || !exit) {
        console.error("Entrance or exit not found, regenerating...");
        continue;
      }

      let isPathValid = false;
      if (generateMaze === generateDFSGridMaze) {
        isPathValid = isPathInMazeDFS(newMaze, entrance, exit);
      } else if (generateMaze === generateKruskalMaze) {
        if (!isMazeFullyConnected(newMaze)) {
          console.error("Invalid Kruskal maze generated, regenerating...");
          continue;
        }
        isPathValid = isPathInMazeKruskal(newMaze, entrance, exit);
      } else if (generateMaze === generatePrimsMaze) {
        isPathValid = isPathInMazePrims(newMaze, entrance, exit);
      } else if (generateMaze === generateBinaryTreeMaze) {
        isPathValid = isPathInMazeTree(newMaze, entrance, exit);
      }

      if (isPathValid) {
        setMaze(newMaze);
        return;
      }
    }

    if (!error) {
      setError("Failed to generate a valid maze after multiple attempts.");
    }
  };

  if (error) {
    return <Box>Error: {error}</Box>;
  }
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
