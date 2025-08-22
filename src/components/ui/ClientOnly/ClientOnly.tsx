'use client';
import { useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Prevents hydration mismatches by only rendering children on client-side
 * Use this wrapper for components that have different server/client behavior
 */
export const ClientOnly: React.FC<ClientOnlyProps> = ({ 
  children, 
  fallback = null 
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
