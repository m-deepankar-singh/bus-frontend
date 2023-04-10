/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument } from "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import constants from "./constants";

const renderWithRedux = (component) => {
  return render(<Provider store={store}>{component}</Provider>);
};

// Mock the API response
beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponse(JSON.stringify(constants));
});

test("renders main heading", async () => {
  renderWithRedux(<App />);
  const heading = await screen.findByText(/Top 10 BusLines and its BusStops/i);
  expect(heading).toBeInTheDocument();
});

test("renders bus line cards", async () => {
  renderWithRedux(<App />);
  const cards = await screen.findAllByTestId("card");
  expect(cards.length).toBeGreaterThan(0);
});

test("toggles Show More / Show Less button", async () => {
  renderWithRedux(<App />);
  const cards = await screen.findAllByTestId("card");
  const firstCard = cards[0];

  const showMoreButton = firstCard.querySelector("button");
  fireEvent.click(showMoreButton);

  await waitFor(() => {
    expect(showMoreButton.textContent).toBe("Show Less");
  });

  fireEvent.click(showMoreButton);
  await waitFor(() => {
    expect(showMoreButton.textContent).toBe("Show More");
  });
});
