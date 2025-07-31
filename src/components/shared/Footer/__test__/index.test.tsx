import { render } from "@testing-library/react";
import Footer from "../index";
import { describe, expect, it } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router";

describe("Footer Component", () => {
  it("matches snapshot", () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <Footer />,
      },
    ]);

    const footer = render(<RouterProvider router={router} />);
    expect(footer).toMatchSnapshot();
  });

  it("renders the footer with correct content", () => {
    const router = createMemoryRouter([{ path: "/", element: <Footer /> }]);
    const { getByText, getByAltText } = render(
      <RouterProvider router={router} />
    );
    expect(getByText("Explore")).toBeInTheDocument();
    expect(getByText("About Us")).toBeInTheDocument();
    expect(getByText("Contact info")).toBeInTheDocument();
    expect(getByText("Devotee")).toBeInTheDocument();
    expect(getByAltText("Shiv Shakti")).toBeInTheDocument();
  });
});
