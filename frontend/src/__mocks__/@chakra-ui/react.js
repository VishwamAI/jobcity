import React from 'react';
import { createContext } from '@chakra-ui/utils/context';
import { ThemeContext as EmotionThemeContext } from '@emotion/react';

const [ThemeProvider] = createContext({ name: 'ThemeContext' });

const theme = {
  colors: {
    gray: { 50: '#F7FAFC', 500: '#718096' },
    blue: { 500: '#3182CE' }
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'system-ui, sans-serif'
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  }
};

export const ChakraProvider = ({ children }) => {
  return (
    <EmotionThemeContext.Provider value={theme}>
      <ThemeProvider value={theme}>{children}</ThemeProvider>
    </EmotionThemeContext.Provider>
  );
};

export const ColorModeScript = () => null;

// Mock commonly used components
export const Box = ({ children, ...props }) => <div data-testid="box" {...props}>{children}</div>;
export const Button = ({ children, ...props }) => <button data-testid="button" {...props}>{children}</button>;
export const Text = ({ children, ...props }) => <span data-testid="text" {...props}>{children}</span>;
export const Heading = ({ children, ...props }) => <h2 data-testid="heading" {...props}>{children}</h2>;
