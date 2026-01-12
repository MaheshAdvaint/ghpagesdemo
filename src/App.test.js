import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders application heading", () => {
  render(<App />);
  expect(
    screen.getByText(/React GitHub Pages CI\/CD/i)
  ).toBeInTheDocument();
});


test("renders login page text", () => {
  render(<App />);
  expect(screen.getByText(/Welcome To Login Page/i)).toBeInTheDocument();
});
