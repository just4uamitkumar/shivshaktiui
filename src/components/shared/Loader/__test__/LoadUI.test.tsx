import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoadUI from "../index";

describe("LoadUI Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<LoadUI />);
    expect(container).toMatchSnapshot();
  });

  it("should render without crashing", () => {
    render(<LoadUI />);
    expect(LoadUI).toBeDefined();
  });
  it("should render the loader with default size", () => {
    render(<LoadUI />);
    const loaderElement = screen.getByRole("progressbar");
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveStyle({ width: "3rem", height: "3rem" });
  });
});
