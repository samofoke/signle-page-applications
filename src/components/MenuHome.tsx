import React, { useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Button,
  SelectChangeEvent,
} from "@mui/material";

interface MenuComponentProps {
  onStart: (mazeType: string) => void;
}

const MenuComponent: React.FC<MenuComponentProps> = ({ onStart }) => {
  const [mazeType, setMazeType] = useState<string>("grid");

  const handleMazeTypeChange = (event: SelectChangeEvent<string>) => {
    setMazeType(event.target.value as string);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "20px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Maze Game
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: "20px", maxWidth: "300px" }}>
        <InputLabel id="select-maze">Maze Type</InputLabel>
        <Select
          labelId="select-maze"
          id="select-maze-type"
          value={mazeType}
          label="Maze Type"
          onChange={handleMazeTypeChange}
        >
          <MenuItem value="grid">Grid</MenuItem>
          <MenuItem value="square">Square</MenuItem>
          <MenuItem value="hexagonal">Hexagonal</MenuItem>
          <MenuItem value="triangular">Triangular</MenuItem>
          <MenuItem value="circular">Circular</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onStart(mazeType)}
      >
        Start Game
      </Button>
    </Box>
  );
};

export default MenuComponent;
