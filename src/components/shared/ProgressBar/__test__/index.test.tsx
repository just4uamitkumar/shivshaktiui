import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProgressBar from "../index";

describe("ProgressBar Component", () => {
  it("matches snapshot", () => {
    const { container } = render(
      <ProgressBar value={50} onComplete={() => {}} />
    );
    expect(container).toMatchSnapshot();
  });
  it("renders with correct initial value", () => {
    render(<ProgressBar value={50} onComplete={() => {}} />);
    const progressText = screen.getByText("50%");
    expect(progressText).toBeInTheDocument();
  });
  it("updates value correctly", () => {
    const onCompleteMock = vi.fn();
    const { rerender } = render(
      <ProgressBar value={50} onComplete={onCompleteMock} />
    );
    expect(screen.getByText("50%")).toBeInTheDocument();

    rerender(<ProgressBar value={75} onComplete={onCompleteMock} />);
    expect(screen.getByText("75%")).toBeInTheDocument();
  });
  it("calls onComplete when value reaches MAX", () => {
    const onCompleteMock = vi.fn();
    render(<ProgressBar value={100} onComplete={onCompleteMock} />);
    expect(onCompleteMock).toHaveBeenCalled();
  });
});
