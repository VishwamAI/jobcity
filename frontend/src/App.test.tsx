import React, { createContext, useContext, useState, ReactNode, FC } from 'react';
import { screen } from '@testing-library/react';
import { render, waitForElementToBeRemoved, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import * as useLoadingModule from './hooks/useLoading';

interface LoadingContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

// Create a mock loading context
const LoadingContext = createContext<LoadingContextType>({
  loading: true,
  setLoading: () => {}
});

// Create a provider component that uses real state
const TestLoadingProvider: FC<{ children: ReactNode }> = ({ children }) => {
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

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { wrapper?: FC<{ children: ReactNode }> }
) => {
  const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
    return (
      <BrowserRouter>
        <ChakraProvider>
          {options?.wrapper ? (
            <options.wrapper>{children}</options.wrapper>
          ) : (
            children
          )}
        </ChakraProvider>
      </BrowserRouter>
    );
  };
  return render(ui, { ...options, wrapper: Wrapper });
};

test('renders landing page', async () => {
  let setLoadingFn: ((loading: boolean) => void) | undefined;

  // Create a wrapper that captures the setLoading function
  const LoadingWrapper: FC<{ children: ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    setLoadingFn = setLoading;
    return (
      <LoadingContext.Provider value={{ loading, setLoading }}>
        {children}
      </LoadingContext.Provider>
    );
  };

  // Render the component with our loading provider
  customRender(
    <App RouterProvider={({ children }) => <>{children}</>} />,
    { wrapper: LoadingWrapper }
  );

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
