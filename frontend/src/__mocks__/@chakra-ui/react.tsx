import React from 'react';
import type { ThemeConfig } from '@chakra-ui/react';
import { EmotionCache } from '@emotion/cache';
import type { StyleSheet } from '@emotion/sheet';

const mockChakra = jest.createMockFromModule('@chakra-ui/react') as any;
const actualChakra = jest.requireActual('@chakra-ui/react');

// Mock withEmotionCache function
const withEmotionCache = (fn: (cache: EmotionCache) => React.ReactNode) => {
  // Create a complete mock StyleSheet implementation
  const mockSheet: StyleSheet = {
    isSpeedy: false,
    ctr: 0,
    tags: [],
    container: document.head,
    nonce: undefined,
    key: 'mock-key',
    insert: jest.fn(),
    flush: jest.fn(),
    hydrate: jest.fn(),
    insertStyles: jest.fn(),
    getIds: jest.fn(() => []),
  };

  // Create a complete mock cache object
  const mockCache: EmotionCache = {
    sheet: mockSheet,
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
