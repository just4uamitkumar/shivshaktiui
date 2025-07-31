import { render } from "@testing-library/react";
import Header from "../index";
import { describe, expect, it } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router";

describe("Header Component", () => {
  it("matches snapshot", () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <Header />,
      },
    ]);

    const header = render(<RouterProvider router={router} />);
    expect(header).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <Header />,
      },
    ]);
    const { container } = render(<RouterProvider router={router} />);
    expect(container).toBeTruthy();
  });

   
});
