import React from 'react';
import { render } from '@testing-library/react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

const AllProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <ColorModeScript />
        {children}
      </ChakraProvider>
    </BrowserRouter>
  );
};

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
