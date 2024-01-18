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
  const [isSolutionFound, setSolutionFound] = useState<boolean | null>(null);

  useEffect(() => {
    if (maze.length > 0 && start && end) {
      const chosenAlgorithm = Math.random() < 0.5 ? "DFS" : "BFS";
      setAlgorithm(chosenAlgorithm);

      let path: Cell[] = [];
      if (algorithm === "DFS") {
        path = solveDepthFirstSearch(maze, start, end);
      }
      setSolutionFound(path.length > 0);
      onSolve(path);
    }
  }, [maze, start, end, onSolve, algorithm]);

  return (
    <div>
      {algorithm &&
        isSolutionFound !== null &&
        (isSolutionFound ? (
          <p>Solution found using {algorithm}.</p>
        ) : (
          <p>No Solution was found using {algorithm}.</p>
        ))}
    </div>
  );
});

export default SolverMaze;
