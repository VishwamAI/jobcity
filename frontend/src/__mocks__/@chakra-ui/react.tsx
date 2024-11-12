import React from 'react';
import type { ThemeConfig } from '@chakra-ui/react';

const mockChakra = jest.createMockFromModule('@chakra-ui/react') as any;
const actualChakra = jest.requireActual('@chakra-ui/react');

mockChakra.ChakraProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

mockChakra.extendTheme = (config: Partial<ThemeConfig>) => {
  return { ...config };
};

module.exports = {
  ...actualChakra,
  ...mockChakra,
};
