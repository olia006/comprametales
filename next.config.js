/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Allow local images
    unoptimized: false,
    // Configure image formats - AVIF first for better compression
    formats: ['image/avif', 'image/webp'],
    // Optimize device sizes for better responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Optimize image sizes for material cards and smaller images
    imageSizes: [16, 32, 48, 64, 96, 128, 192, 256, 320, 384, 400],
    // Increase cache time for better performance
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable experimental features for better image handling
  experimental: {
    optimizePackageImports: ['lucide-react'],
    // Improve module resolution
    esmExternals: 'loose',
    // Disable polyfills for modern browsers
    forceSwcTransforms: true,
    // Disable SWC polyfills
    swcMinify: true,
  },
  
  // Optimize JavaScript compilation for modern browsers
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Disable polyfills completely for modern browsers
  transpilePackages: [],
  
  // Optimize CSS loading and reduce critical path
  optimizeFonts: true,
  
  // Configure SWC for modern compilation
  swcMinify: true,
  
  // Target modern browsers to reduce polyfill overhead
  transpilePackages: [],
  
  // SEO-FRIENDLY URL REDIRECTS FOR TRENDING TERMS
  async redirects() {
    return [
      // Trending search terms redirect to relevant pages
      {
        source: '/chatarra-precios-hoy',
        destination: '/precios',
        permanent: true,
      },
      {
        source: '/precio-cobre-hoy',
        destination: '/precios',
        permanent: true,
      },
      {
        source: '/precio-fierro-kg',
        destination: '/precios',
        permanent: true,
      },
      {
        source: '/compra-chatarra-lampa',
        destination: '/materiales-aceptamos',
        permanent: true,
      },
      {
        source: '/venta-metales-reciclados',
        destination: '/materiales-vendemos',
        permanent: true,
      },
      {
        source: '/chatarra-lampa',
        destination: '/',
        permanent: true,
      },
      {
        source: '/metales-reciclados-santiago',
        destination: '/',
        permanent: true,
      },
      // Old domain redirects (if needed)
      {
        source: '/konstander',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // Webpack configuration to handle module loading issues and optimize CSS
  webpack: (config, { isServer, dev }) => {
    // Handle web-vitals module loading
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    // Ensure proper module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
    };

    // Optimize for modern browsers - reduce polyfill overhead
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
      };
      
      // Reduce polyfill overhead by targeting modern browsers
      config.target = ['web', 'es2022'];
      
      // Disable automatic polyfills for modern browsers
      config.resolve.fallback = {
        ...config.resolve.fallback,
      };
      
      // Prevent chunk loading errors with better optimization
      config.optimization = {
        ...config.optimization,
        minimize: true,
        minimizer: [
          ...(config.optimization.minimizer || []),
        ],
        // Improve chunk splitting to prevent loading errors
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
        // Ensure consistent chunk names
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
      };
      
      // Add webpack plugin to remove polyfills and handle chunk errors
      config.plugins = config.plugins || [];
      config.plugins.push(
        new (require('webpack').DefinePlugin)({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          'process.env.BROWSERSLIST_ENV': JSON.stringify('production'),
        })
      );
    }

    return config;
  },
  
  // Security Headers using our professional CSP utility
  async headers() {
    
    // Simple nonce generation that works everywhere
    const generateNonce = () => {
      return btoa(Date.now().toString() + Math.random().toString(36)).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
    };
    
    // CSP configuration with proper development handling
    const getCSPWithReporting = (nonce) => {
      const isDevelopment = process.env.NODE_ENV === 'development';
      
      const cspDirectives = [
        "default-src 'self'",
        `script-src 'self' ${nonce ? `'nonce-${nonce}'` : "'unsafe-inline'"} 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://maps.googleapis.com https://maps.google.com https://www.google.com 'unsafe-eval'`,
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "img-src 'self' data: blob: https://maps.googleapis.com https://maps.gstatic.com https://www.google-analytics.com https://ssl.google-analytics.com https://www.googletagmanager.com https://maps.google.com https://www.google.com",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' https://www.comprametales.cl https://comprametales.cl https://www.google-analytics.com https://ssl.google-analytics.com https://www.googletagmanager.com https://vitals.vercel-insights.com",
        "frame-src 'self' https://www.googletagmanager.com https://maps.google.com https://www.google.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self' https://wa.me tel: mailto:",
        "frame-ancestors 'none'",
        // Only upgrade insecure requests in production
        ...(isDevelopment ? [] : ["upgrade-insecure-requests"])
      ];

      const baseCSP = cspDirectives.join('; ');
      return isDevelopment ? `${baseCSP}; report-uri /api/csp-violation` : baseCSP;
    };
    
    const SECURITY_HEADERS = {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'X-XSS-Protection': '1; mode=block',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self), payment=()',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
    };
    
    return [
      {
        source: '/(.*)',
        headers: [
          // Content Security Policy using our utility
          {
            key: 'Content-Security-Policy',
            value: getCSPWithReporting()
          },
          
          // Additional security headers from our utility (skip HSTS in development)
          ...Object.entries(SECURITY_HEADERS)
            .filter(([key]) => !(key === 'Strict-Transport-Security' && process.env.NODE_ENV === 'development'))
            .map(([key, value]) => ({
              key,
              value
            }))
        ]
      }
    ]
  },
}

module.exports = nextConfig