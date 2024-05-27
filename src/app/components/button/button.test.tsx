// Button.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import Button from "./button";

describe("Button Component", () => {
  test("renders the button with provided text", () => {
    render(
      <Button
        className="test-class"
        onClick={() => {}}
        disabled={false}
        text="Click Me"
      />
    );

    const buttonElement = screen.getByRole("button", { name: /Click Me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("renders the button with correct class name", () => {
    render(
      <Button
        className="test-class"
        onClick={() => {}}
        disabled={false}
        text="Click Me"
      />
    );

    const buttonElement = screen.getByRole("button", { name: /Click Me/i });
    expect(buttonElement).toHaveClass("test-class");
  });

  test("button is disabled when the disabled prop is true", () => {
    render(
      <Button
        className="test-class"
        onClick={() => {}}
        disabled={true}
        text="Click Me"
      />
    );

    const buttonElement = screen.getByRole("button", { name: /Click Me/i });
    expect(buttonElement).toBeDisabled();
  });

  test("button is enabled when the disabled prop is false", () => {
    render(
      <Button
        className="test-class"
        onClick={() => {}}
        disabled={false}
        text="Click Me"
      />
    );

    const buttonElement = screen.getByRole("button", { name: /Click Me/i });
    expect(buttonElement).toBeEnabled();
  });

  test("calls the onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(
      <Button
        className="test-class"
        onClick={handleClick}
        disabled={false}
        text="Click Me"
      />
    );

    const buttonElement = screen.getByRole("button", { name: /Click Me/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
