import React, { useState } from "react";
import { Box } from "@mui/material";
import { generateDFSGridMaze } from "../../algorithms/Grid/GridMaze";
import MenuComponent from "../MenuHome";
import MazeBoard from "../Maze/MazeBoard";

const MazeManager: React.FC = () => {
  const [maze, setMaze] = useState<number[][]>([]);

  const handleStartGame = (selectMazeType: string) => {
    let newMaze: number[][] = [];
    if (selectMazeType === "grid") {
      const gridGenerator = [generateDFSGridMaze];
      const generateMaze =
        gridGenerator[Math.floor(Math.random() * gridGenerator.length)];
      newMaze = generateMaze(20, 20);
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
