import { useState, useEffect } from 'react';

interface UseLoadingOptions {
  duration?: number;
  initialState?: boolean;
}

export const useLoading = ({ duration = 2500, initialState = true }: UseLoadingOptions = {}) => {
  const [isLoading, setIsLoading] = useState(initialState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return isLoading;
};

export default useLoading;
