import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import { MemoryRouter } from "react-router";
import App from "../App";
import store from "../redux/store";

describe("Main entry renders App", () => {
  it("renders the App component and shows Home page content", () => {
    const mainComp = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(mainComp).toMatchSnapshot();
  });

  it("renders the App component and shows Profile page content", () => {
    const mainComp = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/Profile"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(mainComp).toMatchSnapshot();
  });

  it("renders the App component and shows Products page content", () => {
    const mainComp = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/Products"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(mainComp).toMatchSnapshot();
  });

  it("renders the App component and shows Jyotirling page content", () => {
    const mainComp = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/Jyotirling"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(mainComp).toMatchSnapshot();
  });

  it("renders the App component and shows Gallery page content", () => {
    const mainComp = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/Gallery"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(mainComp).toMatchSnapshot();
  });

  it("renders the App component and shows 404 page content", () => {
    const mainComp = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/non-existing-page"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(mainComp).toMatchSnapshot();
  });
});
