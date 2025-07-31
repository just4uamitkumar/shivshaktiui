import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import Products from "../index";
import axios from "axios";

// Mock axios
vi.mock("axios");
const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> };

const mockProducts = [
  {
    id: 1,
    title: "Mock Product 1",
    price: 100,
    thumbnail: "mock1.jpg",
    category: "Category A",
    brand: "BrandA",
    discountPercentage: 5,
    shippingInformation: "Fast",
    availabilityStatus: "In Stock",
  },
  {
    id: 2,
    title: "Mock Product 2",
    price: 200,
    thumbnail: "mock2.jpg",
    category: "Category B",
    brand: "BrandB",
    discountPercentage: 10,
    shippingInformation: "Standard",
    availabilityStatus: "Out of Stock",
  },
];

describe("Products Component", () => {
  it("matches snapshot", () => {
    const { container } = render(<Products />);
    expect(container).toMatchSnapshot();
  });

  it("should render without crashing", () => {
    render(<Products />);
    expect(Products).toBeDefined();
  });
  it("should render the page title", () => {
    const title = "Products";
    render(<Products />);
    const pageTitle = screen.getByText(title);
    expect(pageTitle).toBeInTheDocument();
  });

  it("fetches and displays products", async () => {
    // Set up mock response
    mockedAxios.get.mockResolvedValueOnce({
      data: { products: mockProducts },
    });

    render(<Products />);

    await waitFor(() => {
      expect(screen.getByText("Mock Product 1")).toBeInTheDocument();
      expect(screen.getByText("Mock Product 2")).toBeInTheDocument();
    });
  });

//   it("shows loader initially", () => {
//     render(<Products />);
//     expect(screen.getByTestId("loader")).toBeInTheDocument();
//   });
});
