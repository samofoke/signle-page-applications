import React from "react";
import { Box } from "@mui/material";

interface MazeBoardProps {
  maze: number[][];
}

const MazeBoard: React.FC<MazeBoardProps> = ({ maze }) => {
  const shouldRenderWall = (y: number, x: number) => {
    if (y < 0 || y >= maze.length || x < 0 || x >= maze[0].length) return true;
    return maze[y][x] === 1;
  };

  const getCellStyle = (cell: number) => {
    return cell === 2
      ? "green"
      : cell === 3
      ? "red"
      : cell === 1
      ? "#525252"
      : "transparent";
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {maze.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              style={{
                position: "relative",
                width: "2vw",
                height: "2vw",
                backgroundColor: getCellStyle(cell),
              }}
            >
              {shouldRenderWall(rowIndex - 1, cellIndex) && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    backgroundColor: "black",
                  }}
                />
              )}
              {shouldRenderWall(rowIndex, cellIndex - 1) && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: "2px",
                    backgroundColor: "black",
                  }}
                />
              )}
              {shouldRenderWall(rowIndex + 1, cellIndex) && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    backgroundColor: "black",
                  }}
                />
              )}
              {shouldRenderWall(rowIndex, cellIndex + 1) && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    width: "2px",
                    backgroundColor: "black",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </Box>
  );
};

export default MazeBoard;
