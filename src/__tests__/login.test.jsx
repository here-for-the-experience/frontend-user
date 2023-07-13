import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import { describe, expect, test, jest } from "@jest/globals";
import Login from "../pages/login";

describe("Login component", () => {
  test("renders without errors", () => {
    render(<Login />);
    // Add assertions to check that the component renders without errors
  });

  test("updates phone state on input change", () => {
    const { getByTestId } = render(<Login />);
    const phoneInput = getByTestId("phone")

    // Simulate user input in the phone input field
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });

    // Assert that the phone state is updated correctly
    expect(phoneInput.value).toBe("1234567890");
  });

  test("updates password state on input change", () => {
    const { getByTestId } = render(<Login />);
    const passwordInput = getByTestId("password");

    // Simulate user input in the password input field
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Assert that the password state is updated correctly
    expect(passwordInput.value).toBe("password123");
  });

  // Add more test cases to cover different scenarios and edge cases
});
