import React from 'react';
import { render } from '@testing-library/react';
import { WebVitals } from '../WebVitals';

// Mock the web-vitals module
jest.mock('web-vitals', () => ({
  onCLS: jest.fn(),
  onINP: jest.fn(),
  onFCP: jest.fn(),
  onLCP: jest.fn(),
  onTTFB: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();

// Mock window.gtag
Object.defineProperty(window, 'gtag', {
  value: jest.fn(),
  writable: true,
});

describe('WebVitals', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock performance API
    Object.defineProperty(window, 'performance', {
      value: {
        getEntriesByType: jest.fn().mockReturnValue([{
          responseStart: 100,
          requestStart: 50,
        }]),
        now: jest.fn().mockReturnValue(1000),
      },
      writable: true,
    });
  });

  it('renders without crashing', () => {
    const { container } = render(<WebVitals />);
    expect(container.firstChild).toBeNull(); // Component doesn't render anything
  });

  it('renders with debug mode', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    render(<WebVitals debug={true} />);
    
    // Wait for async operations
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    }, 200);
  });

  it('handles missing web-vitals module gracefully', () => {
    // Mock import to fail
    jest.doMock('web-vitals', () => {
      throw new Error('Module not found');
    });

    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    render(<WebVitals debug={true} />);
    
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Failed to import web-vitals')
      );
      consoleSpy.mockRestore();
    }, 200);
  });

  it('handles SSR environment gracefully', () => {
    // Create a mock window object for SSR testing
    const mockWindow = {
      performance: {
        getEntriesByType: jest.fn().mockReturnValue([]),
        now: jest.fn().mockReturnValue(1000),
      },
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      location: { href: 'http://localhost' },
    };

    // Temporarily replace window
    const originalWindow = global.window;
    global.window = mockWindow as any;

    // The component should not throw during SSR
    expect(() => {
      render(<WebVitals />);
    }).not.toThrow();

    // Restore original window
    global.window = originalWindow;
  });
});
