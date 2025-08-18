// Content Security Policy utilities
// import { NextRequest } from 'next/server';

// Generate a secure nonce for inline scripts and styles
export function generateNonce(): string {
  const crypto = require('crypto');
  return crypto.randomBytes(16).toString('base64');
}

// CSP configuration based on environment and features used
export function getCSPHeader(nonce?: string): string {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const cspDirectives = [
    // Default fallback
    "default-src 'self'",
    
    // Scripts: Allow self, nonce, and required external services
    `script-src 'self' ${nonce ? `'nonce-${nonce}'` : "'unsafe-inline'"} 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com${isDevelopment ? " 'unsafe-eval'" : ""}`,
    
    // Styles: Allow self, inline styles, and Google Fonts
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    
    // Images: Allow self, data, and required external services
    "img-src 'self' data: blob: https://maps.googleapis.com https://maps.gstatic.com https://www.google-analytics.com https://ssl.google-analytics.com",
    
    // Fonts: Allow self and Google Fonts
    "font-src 'self' https://fonts.gstatic.com",
    
    // Connect: Allow self and analytics services
    "connect-src 'self' https://www.google-analytics.com https://ssl.google-analytics.com https://www.googletagmanager.com https://vitals.vercel-insights.com",
    
    // Frames: Allow Google services
    "frame-src 'self' https://www.googletagmanager.com https://maps.google.com",
    
    // Objects: Block all
    "object-src 'none'",
    
    // Base: Restrict to self
    "base-uri 'self'",
    
    // Forms: Allow self and communication protocols
    "form-action 'self' https://wa.me tel: mailto:",
    
    // Frame ancestors: Block embedding
    "frame-ancestors 'none'",
    
    // Upgrade insecure requests
    "upgrade-insecure-requests"
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
