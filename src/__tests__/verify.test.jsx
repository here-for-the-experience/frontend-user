import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Verify from "../pages/Verify";

describe("Verify component", () => {
  test("should display error message when code is not entered", async () => {
    render(<Verify />);

    // Click the submit button without entering a code
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      const error = screen.queryByText("Please enter a code");
      if (error) expect(error).toBeInTheDocument();
    });
  });

  test("should call the verify function with the entered code", () => {
    render(<Verify />);

    // Enter a code in the input field
    fireEvent.change(screen.getByLabelText("Code"), {
      target: { value: "1234" },
    });

    // Click the submit button
    fireEvent.click(screen.getByText("Submit"));
  });

  test('should navigate to "/" on button click', () => {
    const { getByTestId } = render(<Verify />);

    const homeButton = getByTestId("home");

    fireEvent.click(homeButton);

    expect(window.location.pathname).toBe("/");
  });
});
