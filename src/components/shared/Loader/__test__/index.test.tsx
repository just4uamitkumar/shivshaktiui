import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Loader from "../index";

describe("Loader Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Loader />);
    expect(container).toMatchSnapshot();
  });

  it("should render without crashing", () => {
    render(<Loader />);
    expect(Loader).toBeDefined();
  });
  it("should render the loader with default size", () => {
    render(<Loader />);
    const loaderElement = screen.getByRole("progressbar");
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveStyle({ width: "3rem", height: "3rem" });
  });
});
