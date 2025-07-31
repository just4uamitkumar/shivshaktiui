import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Gallery from "../index";
import { createMemoryRouter, RouterProvider } from "react-router";

describe("Gallery Component", () => {
  it("matches snapshot", () => {
    const router = createMemoryRouter([
      {
        path: "/Gallery",
        element: <Gallery />,
      },
    ]);
    const gallery = render(<RouterProvider router={router} />);
    expect(gallery).toMatchSnapshot();
  });

 ;
});
