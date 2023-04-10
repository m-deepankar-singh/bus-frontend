// App.test.js
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

function countBusStops(card) {
  const regex = /Bus Stop \d+/i;
  let count = 0;

  card.querySelectorAll("li").forEach((li) => {
    if (regex.test(li.textContent)) {
      count += 1;
    }
  });

  return count;
}

test('renders app title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Top 10 BusLines and its BusStops/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders at least one bus line', async () => {
  render(<App />);
  const busLines = await screen.findAllByTestId('card');
  expect(busLines.length).toBeGreaterThan(0);
});

test('renders show more button and expands bus stops list', async () => {
  render(<App />);
  const showMoreButtons = await screen.findAllByText(/Show more/i);

  expect(showMoreButtons.length).toBeGreaterThan(0);

  // Click the first show more button
  userEvent.click(showMoreButtons[0]);

  // Check if the first card has more than 10 bus stops after clicking the show more button
  const cards = await screen.findAllByTestId('card');
  const busStopsBefore = countBusStops(cards[0]);
  expect(busStopsBefore).toBe(10);

  await waitFor(() => {
    const busStopsAfter = countBusStops(cards[0]);
    expect(busStopsAfter).toBeGreaterThan(10);
  });
});
