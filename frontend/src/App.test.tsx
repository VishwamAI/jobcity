import React from 'react';
import { screen } from '@testing-library/react';
import { render, waitForElementToBeRemoved } from './test-utils';
import { act } from 'react-dom/test-utils';
import App from './App';

// Mock useState to control loading state
let setLoadingCallback: (value: boolean) => void;

jest.mock('./hooks/useLoading', () => ({
  useLoading: () => {
    const [loading, setLoading] = React.useState(true);
    // Store the setLoading callback for use in tests
    setLoadingCallback = setLoading;
    return loading;
  }
}));

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
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
    // Use the stored callback to update loading state
    setLoadingCallback(false);
    // Advance timers to trigger any pending updates
    jest.runAllTimers();
  });

  // Wait for loading indicator to be removed
  await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

  // Verify the main content is rendered
  expect(screen.getByTestId('box')).toBeInTheDocument();
});
