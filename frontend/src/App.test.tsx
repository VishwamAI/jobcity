import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders loading state initially', () => {
    render(<App />);
    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toBeInTheDocument();
  });

  test('renders router content after loading', async () => {
    render(<App />);

    // Wait for loading to finish (2.5s timeout in useEffect)
    await waitFor(() => {
      const appDiv = screen.getByTestId('app-container');
      expect(appDiv).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
