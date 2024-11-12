import * as React from 'react';

interface HashLoaderProps {
  size?: number;
  color?: string;
  loading?: boolean;
  [key: string]: any;
}

// Mock HashLoader component
export const HashLoader: React.FC<HashLoaderProps> = ({
  size = 50,
  color = '#000000',
  loading = true,
  ...props
}: HashLoaderProps) => {
  return React.createElement('div', {
    role: 'progressbar',
    'aria-label': 'Loading...',
    'aria-busy': loading,
    style: {
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: '50%',
      opacity: loading ? 1 : 0,
      transition: 'opacity 0.3s ease-in-out'
    },
    ...props
  });
};
