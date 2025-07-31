import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PageBanner from "../index";

describe("PageBanner Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<PageBanner />);
    expect(container).toMatchSnapshot();
  });

  it("should render without crashing", () => {
    render(<PageBanner />);
    expect(PageBanner).toBeDefined();
  });
  it("should render the page title", () => {
    const title = "Test Page";
    render(<PageBanner title={title} />);
    const pageTitle = screen.getByText(title);
    expect(pageTitle).toBeInTheDocument();
  });
  it("should render the back button with correct text", () => {
    const handleBack = vi.fn();
    const title = "Test Page";

    render(
      <PageBanner isleftSection={true} handleBack={handleBack} title={title} />
    );
    const backButton = screen.getByRole("button", { name: /back/i });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveTextContent("Back");
  });
  it("should not render the back button when isleftSection is false", () => {
    const handleBack = vi.fn();

    render(<PageBanner isleftSection={false} handleBack={handleBack} />);
    const backButton = screen.queryByRole("button", { name: /back/i });
    expect(backButton).not.toBeInTheDocument();
  });
  it("should render the back button when isleftSection is true", () => {
    const handleBack = vi.fn();

    render(<PageBanner isleftSection={true} handleBack={handleBack} />);
    const backButton = screen.getByRole("button", { name: /back/i });
    expect(backButton).toBeInTheDocument();
    backButton.click();
    expect(handleBack).toHaveBeenCalled();
  });
});
