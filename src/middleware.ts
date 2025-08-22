import { NextRequest, NextResponse } from 'next/server';
import { generateNonce, getCSPWithReporting, SECURITY_HEADERS } from './lib/security/csp';

export function middleware(_request: NextRequest) {
  // Generate a unique nonce for this request
  const nonce = generateNonce();
  
  // Create response
  const response = NextResponse.next();
  
  // Apply CSP with nonce for dynamic content
  const cspHeader = getCSPWithReporting(nonce);
  response.headers.set('Content-Security-Policy', cspHeader);
  
  // Apply additional security headers (but skip HSTS in development)
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    // Skip Strict-Transport-Security in development to avoid SSL issues
    if (key === 'Strict-Transport-Security' && process.env.NODE_ENV === 'development') {
      return;
    }
    response.headers.set(key, value);
  });
  
  // Add nonce to request headers so it can be accessed in components
  response.headers.set('x-nonce', nonce);
  
  return response;
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt, sitemap.xml (SEO files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
