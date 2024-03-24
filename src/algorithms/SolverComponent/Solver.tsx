import React, { useState, useEffect, useRef } from "react";
import {
  solveDepthFirstSearch,
  solveBreathFirstSearch,
} from "./solvealgos/algorithmSolver";
import MazeBoard from "../../components/Maze/MazeBoard";

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

const SolverMaze: React.FC<SolverProps> = ({ maze, start, end, onSolve }) => {
  const [algorithm, setAlgorithm] = useState<"DFS" | "BFS" | "">("");
  const [isSolutionFound, setSolutionFound] = useState<boolean | null>(null);
  const [solutionPath, setSolutionPath] = useState<Cell[]>([]);
  const pathIndexRef = useRef(0);

  useEffect(() => {
    if (maze.length > 0 && start && end) {
      const chosenAlgorithm = Math.random() < 0.5 ? "DFS" : "BFS";
      setAlgorithm(chosenAlgorithm);

      let solvedPath: Cell[] = [];
      if (chosenAlgorithm === "DFS") {
        solvedPath = solveDepthFirstSearch(maze, start, end);
      } else if (chosenAlgorithm === "BFS") {
        solvedPath = solveBreathFirstSearch(maze, start, end);
      }
      setSolutionFound(solvedPath.length > 0);
      onSolve(solvedPath);
      setSolutionPath(solvedPath);

      //Animate the path finding process
      const animateInterval = setInterval(() => {
        if (pathIndexRef.current < solvedPath.length) {
          setSolutionPath(solvedPath.slice(0, pathIndexRef.current + 1));
          pathIndexRef.current += 1;
        } else {
          clearInterval(animateInterval);
        }
      }, 100);
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

      <MazeBoard maze={maze} solutionPath={solutionPath} />
    </div>
  );
};

export default SolverMaze;
