import React from 'react';
import { screen } from '@testing-library/react';
import { render } from './test-utils';
import { act } from 'react-dom/test-utils';
import App from './App';

jest.mock('./hooks/useLoading', () => ({
  useLoading: () => false
}));

test('renders landing page', async () => {
  await act(async () => {
    render(<App RouterProvider={({ children }) => <>{children}</>} />);
  });
  expect(screen.getByTestId('box')).toBeInTheDocument();
});
