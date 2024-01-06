import React from "react";
import { Box } from "@mui/material";

interface MazeBoardProps {
  maze: number[][];
}

const MazeBoard: React.FC<MazeBoardProps> = ({ maze }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        overflow: "auto",
      }}
    >
      My Board
    </Box>
  );
};

export default MazeBoard;
