import React, { CSSProperties } from "react";
import { Box } from "@mui/material";

type Cell = { row: number; col: number };
interface MazeBoardProps {
  maze: number[][];
  solutionPath?: Cell[];
}

const MazeBoard: React.FC<MazeBoardProps> = ({ maze, solutionPath }) => {
  // Checks if the cell at (y, x) is a wall (1)
  const isWall = (y: number, x: number) => maze[y] && maze[y][x] === 1;

  // Generates a line based on the position and the presence of a wall
  const getLine = (
    y: number,
    x: number,
    position: "top" | "right" | "bottom" | "left"
  ) => {
    const style: CSSProperties = {
      position: "absolute",
      backgroundColor: "black",
    };

    switch (position) {
      case "top":
        style.top = 0;
        style.left = 0;
        style.right = 0;
        style.height = "2px";
        if (y === 0 || isWall(y - 1, x)) return <div style={style} />;
        break;
      case "right":
        style.top = 0;
        style.bottom = 0;
        style.right = 0;
        style.width = "2px";
        if (x === maze[0].length - 1 || isWall(y, x + 1))
          return <div style={style} />;
        break;
      case "bottom":
        style.bottom = 0;
        style.left = 0;
        style.right = 0;
        style.height = "2px";
        if (y === maze.length - 1 || isWall(y + 1, x))
          return <div style={style} />;
        break;
      case "left":
        style.top = 0;
        style.bottom = 0;
        style.left = 0;
        style.width = "2px";
        if (x === 0 || isWall(y, x - 1)) return <div style={style} />;
        break;
      default:
        return null;
    }
  };

  const isPathSolution = (y: number, x: number): boolean => {
    return solutionPath
      ? solutionPath.some((cell) => cell.row === y && cell.col === x)
      : false;
  };

  const getCellColor = (y: number, x: number, cell: number) => {
    if (cell === 1) {
      return "#525252";
    } else if (isPathSolution(y, x)) {
      return "yellow";
    } else if (cell === 2) {
      return "green";
    } else if (cell === 3) {
      return "red";
    }
    return "transparent";
  };

  // console.log("The Maze: ", maze);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {maze.map((row, y) => (
        <div key={y} style={{ display: "flex" }}>
          {row.map((cell, x) => (
            <div
              key={x}
              style={{
                position: "relative",
                width: "20px",
                height: "20px",
                backgroundColor: getCellColor(y, x, cell),
              }}
            >
              {getLine(y, x, "top")}
              {getLine(y, x, "right")}
              {getLine(y, x, "bottom")}
              {getLine(y, x, "left")}
            </div>
          ))}
        </div>
      ))}
    </Box>
  );
};

export default MazeBoard;
