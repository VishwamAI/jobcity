import React, { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';
import { screen } from '@testing-library/react';
import { render, waitForElementToBeRemoved, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import * as useLoadingModule from './hooks/useLoading';
import theme from './theme';

jest.spyOn(useLoadingModule, 'useLoading').mockImplementation(() => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // Short duration for tests

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return isLoading;
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
        <ChakraProvider theme={theme}>
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
  // Render the component
  customRender(
    <App RouterProvider={({ children }) => <>{children}</>} />
  );

  // Verify loading indicator is present initially
  expect(screen.getByRole('progressbar')).toBeInTheDocument();

  // Wait for loading indicator to be removed
  await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

  // Verify the main content is rendered
  expect(screen.getByTestId('box')).toBeInTheDocument();
});
