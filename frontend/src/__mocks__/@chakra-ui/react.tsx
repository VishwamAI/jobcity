import React from 'react';
import type { ThemeConfig } from '@chakra-ui/react';

const mockChakra = jest.createMockFromModule('@chakra-ui/react') as any;
const actualChakra = jest.requireActual('@chakra-ui/react');

const ChakraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

const extendTheme = (config: Partial<ThemeConfig>) => {
  return { ...config };
};

const exports = {
  ...actualChakra,
  ChakraProvider,
  extendTheme,
};

export default exports;
