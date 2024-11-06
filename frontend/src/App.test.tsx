import React from 'react';
import { screen, act } from '@testing-library/react';
import { render, waitForElementToBeRemoved } from './test-utils';
import App from './App';
import * as useLoadingModule from './hooks/useLoading';

// Create a spy on the useLoading hook
const useLoadingSpy = jest.spyOn(useLoadingModule, 'useLoading');

// Increase Jest timeout for this test file
jest.setTimeout(10000);

beforeEach(() => {
  // Set initial loading state to true
  useLoadingSpy.mockReturnValue(true);
  jest.useFakeTimers();
  jest.clearAllMocks();
});

afterEach(() => {
  jest.useRealTimers();
  useLoadingSpy.mockReset();
});

test('renders landing page', async () => {
  // Render the component
  render(<App RouterProvider={({ children }) => <>{children}</>} />);

  // Verify loading indicator is present initially
  expect(screen.getByRole('progressbar')).toBeInTheDocument();

  // Change loading state and wait for updates
  await act(async () => {
    // Update the mock to return false
    useLoadingSpy.mockReturnValue(false);
    // Advance timers to trigger any pending updates
    jest.runAllTimers();
  });

  // Wait for loading indicator to be removed
  await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

  // Verify the main content is rendered
  expect(screen.getByTestId('box')).toBeInTheDocument();
});
