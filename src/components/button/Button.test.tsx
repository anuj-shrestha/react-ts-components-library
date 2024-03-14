import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Button } from "./Button";
import "@testing-library/jest-dom";

describe("Button", () => {
  it("renders without crashing", () => {
    render(<Button />);
  });

  it("renders the correct text", () => {
    const buttonText = "Click me";
    const { getByText } = render(<Button>{buttonText}</Button>);
    expect(getByText("buttonText")).toBeInTheDocument();
  });

  it("calls the onClick handler when clicked", () => {
    const onClick = jest.fn();
    const { getByRole } = render(<Button onClick={onClick} />);
    fireEvent.click(getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });
});
