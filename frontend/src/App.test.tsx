import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { render } from './test-utils';
import App from './App';

jest.mock('./hooks/useLoading', () => ({
  useLoading: () => false
}));

test('renders landing page', async () => {
  render(<App RouterProvider={({ children }) => <>{children}</>} />);
  await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));
  expect(screen.getByTestId('box')).toBeInTheDocument();
});
