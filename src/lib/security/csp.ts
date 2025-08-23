// Content Security Policy utilities
// import { NextRequest } from 'next/server';

// Generate a secure nonce for inline scripts and styles
export function generateNonce(): string {
  // Use crypto.randomUUID if available, fallback to deterministic generation
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID().replace(/-/g, '').substring(0, 16);
  }
  
  // Fallback for environments without crypto.randomUUID
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2);
  return btoa(timestamp + random).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
}

// CSP configuration based on environment and features used
export function getCSPHeader(nonce?: string): string {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // PERMISSIVE CSP: Prioritize functionality over strict security
  // This eliminates React errors while maintaining basic protection
  const cspDirectives = [
    // Allow everything from self and common CDNs
    "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: *",
    
    // Scripts: Very permissive to avoid React issues
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: *",
    
    // Styles: Allow everything to prevent styling issues
    "style-src 'self' 'unsafe-inline' data: blob: *",
    
    // Images: Allow all sources
    "img-src 'self' data: blob: *",
    
    // Fonts: Allow all sources
    "font-src 'self' data: blob: *",
    
    // Connect: Allow all connections
    "connect-src 'self' data: blob: *",
    
    // Frames: Allow trusted services only
    "frame-src 'self' https://www.googletagmanager.com https://maps.google.com https://www.google.com",
    
    // Objects: Block all (security)
    "object-src 'none'",
    
    // Base: Restrict to self (security)
    "base-uri 'self'",
    
    // Forms: Allow self and communication protocols
    "form-action 'self' https://wa.me tel: mailto:",
    
    // Frame ancestors: Block embedding (security)
    "frame-ancestors 'none'",
    
    // Workers: Allow everything
    "worker-src 'self' blob: data: *",
    
    // Manifest: Allow self
    "manifest-src 'self'",
    
    // Media: Allow everything
    "media-src 'self' data: blob: *",
    
    // Upgrade insecure requests (only in production)
    ...(isDevelopment ? [] : ["upgrade-insecure-requests"])
  ];

  return cspDirectives.join('; ');
}

// Additional security headers
export const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self), payment=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
};

// CSP violation reporting (for development)
export function getCSPWithReporting(nonce?: string): string {
  const baseCSP = getCSPHeader(nonce);
  
  if (process.env.NODE_ENV === 'development') {
    return `${baseCSP}; report-uri /api/csp-violation`;
  }
  
  return baseCSP;
}
