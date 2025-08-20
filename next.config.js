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
    // Optimize CSS loading - temporarily disabled due to production issues
    // optimizeCss: true,
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
        // Use native implementations when available
        'core-js': false,
        'core-js/features': false,
        'core-js/proposals': false,
        'core-js/actual': false,
        'core-js/stable': false,
        'core-js/modules': false,
        'regenerator-runtime': false,
        'regenerator-runtime/runtime': false,
        '@babel/runtime': false,
        '@babel/runtime-corejs3': false,
        '@babel/runtime-corejs2': false,
      };
      
      // Reduce polyfill overhead by targeting modern browsers
      config.target = ['web', 'es2022'];
      
      // Disable automatic polyfills for modern browsers
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'core-js/modules': false,
        'core-js/stable': false,
        'core-js/features': false,
        'core-js/proposals': false,
        'core-js/actual': false,
        'regenerator-runtime': false,
        'regenerator-runtime/runtime': false,
        'core-js/features/array/at': false,
        'core-js/features/array/flat': false,
        'core-js/features/array/flat-map': false,
        'core-js/features/object/from-entries': false,
        'core-js/features/object/has-own': false,
        'core-js/features/string/trim-end': false,
        'core-js/features/string/trim-start': false,
        '@babel/runtime': false,
        '@babel/runtime-corejs3': false,
        '@babel/runtime-corejs2': false,
      };
      
      // Disable polyfills in webpack
      config.optimization = {
        ...config.optimization,
        minimize: true,
        minimizer: [
          ...(config.optimization.minimizer || []),
        ],
      };
      
      // Add webpack plugin to remove polyfills
      config.plugins = config.plugins || [];
      config.plugins.push(
        new (require('webpack').DefinePlugin)({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          'process.env.BROWSERSLIST_ENV': JSON.stringify('production'),
        })
      );
      
      // Add IgnorePlugin to ignore polyfill modules
      config.plugins.push(
        new (require('webpack').IgnorePlugin)({
          resourceRegExp: /^(core-js|@babel\/runtime|regenerator-runtime)$/,
        })
      );
      
      // Optimize chunk splitting for better caching
      config.optimization.splitChunks = {
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
          },
        },
      };
    }

    // Optimize CSS loading for production
    if (!dev && !isServer) {
      // Extract critical CSS
      config.optimization.splitChunks.cacheGroups.styles = {
        name: 'styles',
        test: /\.(css|scss)$/,
        chunks: 'all',
        enforce: true,
      };
      
      // Optimize CSS loading to reduce critical path
      config.optimization.splitChunks.cacheGroups.critical = {
        name: 'critical',
        test: /critical\.css$/,
        chunks: 'all',
        enforce: true,
        priority: 10,
      };
    }
    
    return config;
  },
  
  // Security Headers including Content Security Policy
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Content Security Policy - Comprehensive protection against XSS
          {
            key: 'Content-Security-Policy',
            value: [
              // Default source: only allow same origin
              "default-src 'self'",
              
              // Scripts: Allow required external services for analytics and functionality
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://vercel.live https://maps.googleapis.com https://maps.google.com https://www.google.com",
              
              // Styles: Allow inline styles (required for CSS-in-JS) and Google Fonts
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              
              // Fonts: Allow Google Fonts
              "font-src 'self' https://fonts.gstatic.com",
              
              // Images: Allow data URIs, blob, and required external services
              "img-src 'self' data: blob: https://maps.googleapis.com https://maps.gstatic.com https://www.google-analytics.com https://ssl.google-analytics.com https://maps.google.com https://www.google.com",
              
              // Connect: Allow analytics and performance monitoring
              "connect-src 'self' https://www.google-analytics.com https://ssl.google-analytics.com https://www.googletagmanager.com https://vitals.vercel-insights.com",
              
              // Frames: Allow Google services (Maps, GTM)
              "frame-src 'self' https://www.googletagmanager.com https://maps.google.com https://www.google.com",
              
              // Objects: Block all object embeds
              "object-src 'none'",
              
              // Base URI: Restrict to same origin
              "base-uri 'self'",
              
              // Form actions: Allow self and communication protocols
              "form-action 'self' https://wa.me tel: mailto:",
              
              // Frame ancestors: Prevent clickjacking
              "frame-ancestors 'none'",
              
              // Upgrade insecure requests to HTTPS
              "upgrade-insecure-requests"
            ].join('; ')
          },
          
          // Prevent clickjacking attacks
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          
          // Control referrer information
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          
          // Enable XSS filtering
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          
          // Control browser features
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), payment=(), usb=(), magnetometer=(), accelerometer=(), gyroscope=()'
          },
          
          // Enforce HTTPS (disabled in development)
          ...(process.env.NODE_ENV === 'production' ? [{
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          }] : [])
        ]
      }
    ]
  },
}

module.exports = nextConfig
