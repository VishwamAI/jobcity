import React from 'react';
import type { ThemeConfig } from '@chakra-ui/react';
import { EmotionCache } from '@emotion/cache';
import type { StyleSheet } from '@emotion/sheet';

// Create a minimal mock implementation
const ChakraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

const extendTheme = (config: Partial<ThemeConfig>) => {
  return { ...config };
};

// Mock withEmotionCache function
const withEmotionCache = (fn: (cache: EmotionCache) => React.ReactNode) => {
  // Create a complete mock StyleSheet implementation
  const mockSheet: StyleSheet = {
    isSpeedy: false,
    ctr: 0,
    tags: [],
    container: null as any, // avoid document reference in test environment
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

// Export only what we need
export const useColorMode = jest.fn(() => ({ colorMode: 'light', toggleColorMode: jest.fn() }));
export const useMediaQuery = jest.fn(() => [true]);
export { ChakraProvider, extendTheme, withEmotionCache };

// Re-export other components as needed
export const Box = ({ children, ...props }: any) => <div data-testid="box" {...props}>{children}</div>;
export const Flex = ({ children, ...props }: any) => <div {...props}>{children}</div>;
export const Text = ({ children, ...props }: any) => <span {...props}>{children}</span>;
export const Button = ({ children, ...props }: any) => <button {...props}>{children}</button>;
export const IconButton = ({ children, ...props }: any) => <button {...props}>{children}</button>;
export const useDisclosure = () => ({ isOpen: false, onOpen: jest.fn(), onClose: jest.fn() });

// Add loading-related components
export const CircularProgress = (props: any) => <div role="progressbar" {...props} />;
export const CircularProgressLabel = ({ children, ...props }: any) => <div {...props}>{children}</div>;
export const Spinner = (props: any) => <div role="progressbar" {...props} />;
export const Progress = (props: any) => <div role="progressbar" {...props} />;

// Add layout components
export const Container = ({ children, ...props }: any) => <div {...props}>{children}</div>;
export const Stack = ({ children, ...props }: any) => <div {...props}>{children}</div>;
export const VStack = ({ children, ...props }: any) => <div {...props}>{children}</div>;
export const HStack = ({ children, ...props }: any) => <div {...props}>{children}</div>;
export const Grid = ({ children, ...props }: any) => <div {...props}>{children}</div>;
export const GridItem = ({ children, ...props }: any) => <div {...props}>{children}</div>;

// Add navigation components
export const Link = ({ children, ...props }: any) => <a {...props}>{children}</a>;
export const Breadcrumb = ({ children, ...props }: any) => <nav {...props}>{children}</nav>;
export const BreadcrumbItem = ({ children, ...props }: any) => <div {...props}>{children}</div>;
export const BreadcrumbLink = ({ children, ...props }: any) => <a {...props}>{children}</a>;

// Add feedback components
export const Alert = ({ children, ...props }: any) => <div role="alert" {...props}>{children}</div>;
export const AlertIcon = (props: any) => <span {...props} />;
export const AlertTitle = ({ children, ...props }: any) => <div {...props}>{children}</div>;
export const AlertDescription = ({ children, ...props }: any) => <div {...props}>{children}</div>;
