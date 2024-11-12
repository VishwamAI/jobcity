import React from 'react';
import type { ThemeConfig } from '@chakra-ui/react';
import { EmotionCache } from '@emotion/cache';

const mockChakra = jest.createMockFromModule('@chakra-ui/react') as any;
const actualChakra = jest.requireActual('@chakra-ui/react');

// Mock withEmotionCache function
const withEmotionCache = (fn: (cache: EmotionCache) => React.ReactNode) => {
  // Create a minimal mock cache object
  const mockCache = {
    sheet: { insert: jest.fn() },
    inserted: {},
    registered: {},
    key: 'mock-key',
    nonce: undefined,
    insert: jest.fn(),
    stylisPlugins: [],
  };
  return fn(mockCache);
};

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
  withEmotionCache,
};

export default exports;
