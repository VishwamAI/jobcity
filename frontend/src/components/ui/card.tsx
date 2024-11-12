import React from 'react';
import { Box, Heading, BoxProps } from '@chakra-ui/react';

interface CardProps extends BoxProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, ...props }) => (
  <Box
    bg="white"
    borderRadius="lg"
    boxShadow="sm"
    p={6}
    {...props}
  >
    {children}
  </Box>
);

interface CardHeaderProps extends BoxProps {
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, ...props }) => (
  <Box mb={4} {...props}>
    {children}
  </Box>
);

interface CardContentProps extends BoxProps {
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ children, ...props }) => (
  <Box {...props}>
    {children}
  </Box>
);

interface CardTitleProps {
  children: React.ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children }) => (
  <Heading size="md" color="gray.800" fontWeight="semibold">
    {children}
  </Heading>
);
