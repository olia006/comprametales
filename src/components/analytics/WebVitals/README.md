# WebVitals Component

This component provides Core Web Vitals monitoring for the KONSTANDER website.
It tracks performance metrics and sends them to analytics services.

## Features

- **Core Web Vitals Monitoring**: Tracks CLS, INP, FCP, LCP, and TTFB
- **Fallback Implementation**: Includes a custom implementation when the
  web-vitals library fails to load
- **Analytics Integration**: Sends metrics to Google Analytics 4 and custom
  endpoints
- **Error Handling**: Robust error handling to prevent crashes
- **SSR Compatible**: Works in both client and server environments

## Usage

### Basic Usage

```tsx
import { WebVitals } from '@/components/analytics/WebVitals/WebVitals';

// In your layout or page
<WebVitals debug={process.env.NODE_ENV === 'development'} />
```

### Hook Usage

```tsx
import { useWebVitals } from '@/components/analytics/WebVitals/WebVitals';

const MyComponent = () => {
  useWebVitals((metric) => {
    console.log('Web Vital:', metric);
  });

  return <div>My Component</div>;
};
```

## Configuration

### Environment Variables

- `NODE_ENV`: Set to 'development' to enable debug logging
- `GA_MEASUREMENT_ID`: Google Analytics 4 Measurement ID
- `GA_API_SECRET`: Google Analytics 4 API Secret
- `ANALYTICS_WEBHOOK_URL`: Custom analytics webhook URL
- `ANALYTICS_API_KEY`: API key for custom analytics service

### API Endpoint

The component sends metrics to `/api/analytics/web-vitals` in production.
This endpoint:

- Validates metric data
- Sends to Google Analytics 4 (if configured)
- Sends to custom webhook (if configured)
- Stores metrics in database/logs
- Sends performance alerts for poor metrics

## Error Handling

The component includes multiple layers of error handling:

1. **Module Import**: Gracefully handles web-vitals import failures
2. **Function Validation**: Verifies all required functions exist before
   calling them
3. **Browser Compatibility**: Checks for browser APIs before using them
4. **Network Errors**: Handles failed API calls without breaking the user
   experience
5. **SSR Safety**: Prevents errors during server-side rendering

## Recent Fixes

### Issue: `e[o] is not a function` Error

**Problem**: The dynamic import of web-vitals was failing, causing
JavaScript errors.

**Solution**:

- Added robust error handling for dynamic imports
- Created a fallback implementation using native browser APIs
- Added function validation before calling web-vitals functions
- Improved SSR compatibility
- Added timeout delays to ensure DOM readiness

### Changes Made

1. **Enhanced Error Handling**: Added try-catch blocks around all
   web-vitals function calls
2. **Fallback Implementation**: Created custom performance monitoring
   when web-vitals fails
3. **Module Validation**: Verify module structure and function availability
4. **Browser Detection**: Added proper browser environment checks
5. **Timeout Delays**: Added small delays to ensure DOM is ready
6. **Webpack Configuration**: Updated Next.js config to handle module
   loading issues

## Testing

Run the tests with:

```bash
npm test -- --testPathPattern=WebVitals.test.tsx
```

The tests verify:

- Component renders without crashing
- Debug mode works correctly
- Graceful handling of missing web-vitals module
- SSR compatibility

## Performance Impact

- **Minimal**: Component only loads when needed
- **Non-blocking**: All operations are asynchronous
- **Fallback**: Uses native APIs when external library fails
- **Conditional**: Only sends data in production by default

## Browser Support

- **Modern Browsers**: Full support with web-vitals library
- **Legacy Browsers**: Fallback to basic performance monitoring
- **SSR**: Safe to use in server-side rendering
- **Mobile**: Optimized for mobile performance monitoring
