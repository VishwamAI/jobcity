import { Box, BoxProps } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

interface CardProps extends BoxProps {}

export const Card: FC<PropsWithChildren<CardProps>> = ({ children, ...props }) => (
  <Box
    bg="white"
    borderRadius="lg"
    boxShadow="sm"
    p={6}
    _hover={{ boxShadow: 'md', transition: 'box-shadow 0.2s ease-in-out' }}
    {...props}
  >
    {children}
  </Box>
);

interface CardHeaderProps extends BoxProps {}

export const CardHeader: FC<PropsWithChildren<CardHeaderProps>> = ({ children, ...props }) => (
  <Box mb={4} {...props}>
    {children}
  </Box>
);

interface CardContentProps extends BoxProps {}

export const CardContent: FC<PropsWithChildren<CardContentProps>> = ({ children, ...props }) => (
  <Box {...props}>
    {children}
  </Box>
);

interface CardTitleProps extends BoxProps {}

export const CardTitle: FC<PropsWithChildren<CardTitleProps>> = ({ children, ...props }) => (
  <Box
    as="h3"
    fontSize="xl"
    fontWeight="semibold"
    color="brand.500"
    {...props}
  >
    {children}
  </Box>
);
