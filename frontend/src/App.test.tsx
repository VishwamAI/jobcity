import React from 'react';
import { screen } from '@testing-library/react';
import { render, waitForElementToBeRemoved } from './test-utils';
import { act } from 'react-dom/test-utils';
import App from './App';

// Create a mock module with a callback to update loading state
const mockLoadingModule = {
  loading: true,
  setLoading: (value: boolean) => {
    mockLoadingModule.loading = value;
  }
};

jest.mock('./hooks/useLoading', () => ({
  useLoading: () => mockLoadingModule.loading
}));

beforeEach(() => {
  mockLoadingModule.loading = true;
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
    mockLoadingModule.setLoading(false);
    // Advance timers to trigger any pending updates
    jest.runAllTimers();
  });

  // Wait for loading indicator to be removed
  await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

  // Verify the main content is rendered
  expect(screen.getByTestId('box')).toBeInTheDocument();
});
