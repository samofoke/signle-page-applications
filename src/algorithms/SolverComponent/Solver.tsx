import React, { useState, useEffect, memo } from "react";
import { solveDepthFirstSearch } from "./solvealgos/algorithmSolver";

type Cell = {
  row: number;
  col: number;
};

type SolverProps = {
  maze: number[][];
  start: Cell;
  end: Cell;
  onSolve: (path: Cell[]) => void;
};

const SolverMaze = memo(({ maze, start, end, onSolve }: SolverProps) => {
  const [algorithm, setAlgorithm] = useState<"DFS" | "BFS" | "">("");
  let path: Cell[] = [];

  useEffect(() => {
    if (maze.length > 0 && start && end) {
      setAlgorithm(Math.random() < 0.5 ? "DFS" : "BFS");
    }
  }, [maze, start, end]);

  useEffect(() => {
    let path: Cell[] = [];
    if (algorithm === "DFS") {
      path = solveDepthFirstSearch(maze, start, end);
    }

    onSolve(path);
  }, [algorithm, maze, start, end, onSolve]);

  return (
    <div>
      {path.length > 0 ? (
        <p>Solution found using {algorithm}</p>
      ) : (
        <p>No Solution found</p>
      )}
    </div>
  );
});

export default SolverMaze;
