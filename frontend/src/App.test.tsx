import React from 'react';
import { screen } from '@testing-library/react';
import { render, waitForElementToBeRemoved } from './test-utils';
import { act } from 'react-dom/test-utils';
import App from './App';
import * as useLoadingModule from './hooks/useLoading';

// Create a spy on the useLoading hook
const useLoadingSpy = jest.spyOn(useLoadingModule, 'useLoading');

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

  // Create a promise that resolves after state update
  const stateUpdatePromise = Promise.resolve();

  // Change loading state after confirming loading indicator exists
  await act(async () => {
    // Update the mock to return false
    useLoadingSpy.mockReturnValue(false);
    // Advance timers to trigger any pending updates
    jest.runAllTimers();
    // Wait for state update to be processed
    await stateUpdatePromise;
  });

  // Add a small delay to ensure React has processed all updates
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    jest.runAllTimers();
  });

  // Wait for loading indicator to be removed with a timeout
  await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'), {
    timeout: 1000
  });

  // Verify the main content is rendered
  expect(screen.getByTestId('box')).toBeInTheDocument();
});
