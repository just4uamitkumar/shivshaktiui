import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SocialLinks from "../index";

describe("Social Links Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<SocialLinks />);
    expect(container).toMatchSnapshot();
  });

  it("should render without crashing", () => {
    render(<SocialLinks />);
    expect(SocialLinks).toBeDefined();
  });
  it("should render the social links container", () => {
    render(<SocialLinks />);
    const socialLinksContainer = screen.getByRole("list");
    expect(socialLinksContainer).toBeInTheDocument();
  });
  it("should render all social links", () => {
    render(<SocialLinks />);
    const socialLinks = screen.getAllByRole("button");
    expect(socialLinks.length).toBe(4);
  });
});
