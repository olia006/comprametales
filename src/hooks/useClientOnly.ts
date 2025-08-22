import { useEffect, useState } from 'react';

/**
 * Hook to safely detect client-side rendering
 * Prevents hydration mismatches by ensuring consistent server/client rendering
 */
export function useClientOnly(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * Hook to safely access browser APIs
 * Returns null during SSR, actual value on client
 */
export function useSafeWindow<T>(
  accessor: () => T,
  defaultValue: T | null = null
): T | null {
  const isClient = useClientOnly();
  const [value, setValue] = useState<T | null>(defaultValue);

  useEffect(() => {
    if (isClient) {
      try {
        setValue(accessor());
      } catch (error) {
        console.warn('Error accessing browser API:', error);
        setValue(defaultValue);
      }
    }
  }, [isClient, accessor, defaultValue]);

  return isClient ? value : defaultValue;
}
