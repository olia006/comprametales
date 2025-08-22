import { headers } from 'next/headers';

/**
 * Hook to get the CSP nonce for the current request
 * This allows components to use the nonce for inline scripts/styles
 */
export function useNonce(): string | null {
  try {
    const headersList = headers();
    return headersList.get('x-nonce') || null;
  } catch (error) {
    // In client-side rendering, headers() is not available
    // Return null and fall back to unsafe-inline
    return null;
  }
}

/**
 * Client-side version that reads nonce from meta tag
 * Use this in client components
 */
export function useClientNonce(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const metaTag = document.querySelector('meta[name="csp-nonce"]');
  return metaTag?.getAttribute('content') || null;
}
