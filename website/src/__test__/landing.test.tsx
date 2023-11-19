import { fireEvent, render, screen } from "@testing-library/react";

import App from "../App";

test("render landing page without crashing", () => {
  render(<App />);
  const elementTexts = ["FlowChain.net", "Tutorials", "Dashboard"];
  elementTexts.forEach((elementText) => {
    expect(screen.getByText(elementText)).toBeInTheDocument();
    expect(screen.getByText(elementText)).toBeVisible();
  });
});

test("ability to toggle theme", () => {
  render(<App />);
  // Theme toggle button is visible
  expect(screen.getByRole("toggle-theme")).toBeInTheDocument();
  expect(screen.getByRole("toggle-theme")).toBeVisible();
  // Default theme is light
  expect(screen.getByText("Light")).toBeInTheDocument();
  expect(screen.getByText("Light")).toBeVisible();
  expect(document.documentElement.getAttribute("data-bs-theme")).toBe("light");
  // Clicking the button to toggle theme
  fireEvent.click(screen.getByRole("toggle-theme"));
  // Expect theme to be dark
  expect(screen.getByText("Dark")).toBeInTheDocument();
  expect(screen.getByText("Dark")).toBeVisible();
  expect(document.documentElement.getAttribute("data-bs-theme")).toBe("dark");
  // Clicking the button to toggle theme, again
  fireEvent.click(screen.getByRole("toggle-theme"));
  // Expect theme to be light
  expect(screen.getByText("Light")).toBeInTheDocument();
  expect(screen.getByText("Light")).toBeVisible();
  expect(document.documentElement.getAttribute("data-bs-theme")).toBe("light");
});
