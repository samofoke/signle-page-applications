import React, { useState } from "react";
import MenuComponent from "./components/MenuHome";

const App: React.FC = () => {
  const [mazeType, setMazeType] = useState<string>("grid");

  const startGame = (selectMazeType: string) => {
    console.log("Starting game with maze type:", selectMazeType);
    setMazeType(selectMazeType);
  };

  return (
    <div>
      <MenuComponent onStart={startGame} />
    </div>
  );
};

export default App;
