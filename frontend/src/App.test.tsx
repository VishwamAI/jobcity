import React, { createContext, useContext, useState, ReactNode } from 'react';
import { screen } from '@testing-library/react';
import { render, waitForElementToBeRemoved } from './test-utils';
import App from './App';
import * as useLoadingModule from './hooks/useLoading';

// Create a mock loading context
const LoadingContext = createContext<{ loading: boolean; setLoading: (loading: boolean) => void }>({
  loading: true,
  setLoading: () => {}
});

// Create a provider component that uses real state
const TestLoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Mock the useLoading hook to use our context
jest.spyOn(useLoadingModule, 'useLoading').mockImplementation(() => {
  const { loading } = useContext(LoadingContext);
  return loading;
});

// Increase Jest timeout for this test file
jest.setTimeout(10000);

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders landing page', async () => {
  let setLoadingFn: ((loading: boolean) => void) | null = null;

  // Create a wrapper that captures the setLoading function
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(true);
    setLoadingFn = setLoading;
    return (
      <LoadingContext.Provider value={{ loading, setLoading }}>
        {children}
      </LoadingContext.Provider>
    );
  };

  // Render the component with our loading provider
  render(<App RouterProvider={({ children }) => <>{children}</>} />, { wrapper: Wrapper });

  // Verify loading indicator is present initially
  expect(screen.getByRole('progressbar')).toBeInTheDocument();

  // Change loading state using the captured setLoading function
  if (setLoadingFn) {
    setLoadingFn(false);
  }

  // Wait for loading indicator to be removed
  await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

  // Verify the main content is rendered
  expect(screen.getByTestId('box')).toBeInTheDocument();
});
