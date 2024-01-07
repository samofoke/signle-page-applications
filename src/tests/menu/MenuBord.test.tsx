import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import MenuComponent from "../../components/MenuHome";

describe("MenuComponent", () => {
  it("renders correctly", () => {
    render(<MenuComponent onStart={() => {}} />);
    expect(screen.getByText("Maze Game")).toBeInTheDocument();
    expect(screen.getByLabelText("Maze Type")).toBeInTheDocument();
  });

  it("calls onStart with the correct maze type", async () => {
    const mockOnStart = jest.fn();
    render(<MenuComponent onStart={mockOnStart} />);

    await userEvent.click(screen.getByLabelText("Maze Type"));
    userEvent.click(screen.getByText("Start Game"));

    expect(mockOnStart).toHaveBeenCalledWith("grid");
  });
});
