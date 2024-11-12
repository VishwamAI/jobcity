import React, { ReactElement, ReactNode } from 'react';
import { render as rtlRender, RenderOptions, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { MemoryRouter } from 'react-router-dom';
import theme from './theme';

interface AllProvidersProps {
  children: ReactNode;
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const Wrapper = ({ children }: AllProvidersProps) => (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <MemoryRouter>
          {children}
        </MemoryRouter>
      </ChakraProvider>
    </>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...options });
};

// Export only what we need
export { customRender as render, screen, fireEvent, waitFor };
