import React from 'react';
import { screen } from '@testing-library/react';
import { render, waitForElementToBeRemoved } from './test-utils';
import { act } from 'react-dom/test-utils';
import App from './App';

let mockLoading = true;
jest.mock('./hooks/useLoading', () => ({
  useLoading: () => mockLoading
}));

beforeEach(() => {
  mockLoading = true;
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test('renders landing page', async () => {
  render(<App RouterProvider={({ children }) => <>{children}</>} />);

  // Verify loading indicator is present initially
  expect(screen.getByRole('progressbar')).toBeInTheDocument();

  // Change loading state after confirming loading indicator exists
  await act(async () => {
    mockLoading = false;
  });

  // Wait for loading indicator to be removed
  await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

  // Verify the main content is rendered
  expect(screen.getByTestId('box')).toBeInTheDocument();
});
