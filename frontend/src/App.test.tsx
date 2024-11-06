import React from 'react';
import { screen } from '@testing-library/react';
import { render, waitForElementToBeRemoved } from './test-utils';
import { act } from 'react-dom/test-utils';
import App from './App';

let isLoading = true;
jest.mock('./hooks/useLoading', () => ({
  useLoading: () => {
    // Simulate loading state transition
    setTimeout(() => {
      isLoading = false;
    }, 100);
    return isLoading;
  }
}));

test('renders landing page', async () => {
  await act(async () => {
    render(<App RouterProvider={({ children }) => <>{children}</>} />);
  });

  // Wait for loading indicator to be removed
  await act(async () => {
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));
  });

  // Verify the main content is rendered
  expect(screen.getByTestId('box')).toBeInTheDocument();
});
