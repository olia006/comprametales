import { NextRequest } from 'next/server';
import { POST } from '../route';

// Mock environment variables
const mockEnv = {
  GA_MEASUREMENT_ID: 'G-TEST123',
  GA_API_SECRET: 'test-secret',
  ANALYTICS_WEBHOOK_URL: 'https://test-webhook.com',
  ANALYTICS_API_KEY: 'test-api-key'
};

// Mock fetch globally
global.fetch = jest.fn();

describe('/api/analytics/web-vitals', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset environment variables
    Object.entries(mockEnv).forEach(([key, value]) => {
      process.env[key] = value;
    });
  });

  afterEach(() => {
    // Clean up environment variables
    Object.keys(mockEnv).forEach(key => {
      delete process.env[key];
    });
  });

  const createMockRequest = (body: any) => {
    return {
      json: jest.fn().mockResolvedValue(body),
      headers: new Headers({ 'content-type': 'application/json' })
    } as unknown as NextRequest;
  };

  describe('POST /api/analytics/web-vitals', () => {
    it('should accept valid web vital metrics', async () => {
      const validMetric = {
        name: 'CLS',
        value: 0.05,
        id: 'test-id-123',
        delta: 0.02,
        rating: 'good',
        url: 'https://comprametales.cl',
        timestamp: Date.now()
      };

      const request = createMockRequest(validMetric);
      const response = await POST(request);

      expect(response.status).toBe(200);
      
      const responseData = await response.json();
      expect(responseData).toMatchObject({
        success: true,
        message: 'Web vital metric processed successfully'
      });
    });

    it('should reject invalid metric names', async () => {
      const invalidMetric = {
        name: 'INVALID_METRIC',
        value: 100,
        id: 'test-id',
        delta: 10,
        rating: 'poor',
        url: 'https://comprametales.cl',
        timestamp: Date.now()
      };

      const request = createMockRequest(invalidMetric);
      const response = await POST(request);

      expect(response.status).toBe(400);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(false);
      expect(responseData.error).toContain('Invalid metric name');
    });

    it('should validate required fields', async () => {
      const incompleteMetric = {
        name: 'LCP',
        value: 2500
        // Missing required fields
      };

      const request = createMockRequest(incompleteMetric);
      const response = await POST(request);

      expect(response.status).toBe(400);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(false);
      expect(responseData.error).toContain('Missing required fields');
    });

    it('should handle malformed JSON', async () => {
      const request = {
        json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
        headers: new Headers()
      } as unknown as NextRequest;

      const response = await POST(request);

      expect(response.status).toBe(400);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(false);
      expect(responseData.error).toContain('Invalid request body');
    });

    it('should validate metric value ranges', async () => {
      const testCases = [
        { name: 'CLS', value: -1 }, // Negative value
        { name: 'LCP', value: -100 }, // Negative value
        { name: 'FCP', value: NaN }, // Invalid number
        { name: 'TTFB', value: Infinity } // Invalid number
      ];

      for (const testCase of testCases) {
        const invalidMetric = {
          ...testCase,
          id: 'test-id',
          delta: 0,
          rating: 'poor',
          url: 'https://comprametales.cl',
          timestamp: Date.now()
        };

        const request = createMockRequest(invalidMetric);
        const response = await POST(request);

        expect(response.status).toBe(400);
        
        const responseData = await response.json();
        expect(responseData.success).toBe(false);
        expect(responseData.error).toContain('Invalid metric value');
      }
    });

    it('should validate URL format', async () => {
      const invalidUrlMetric = {
        name: 'LCP',
        value: 2500,
        id: 'test-id',
        delta: 100,
        rating: 'needs-improvement',
        url: 'invalid-url',
        timestamp: Date.now()
      };

      const request = createMockRequest(invalidUrlMetric);
      const response = await POST(request);

      expect(response.status).toBe(400);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(false);
      expect(responseData.error).toContain('Invalid URL format');
    });

    it('should handle analytics service errors gracefully', async () => {
      // Mock fetch to fail
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Analytics service unavailable')
      );

      const validMetric = {
        name: 'INP',
        value: 150,
        id: 'test-id',
        delta: 50,
        rating: 'good',
        url: 'https://comprametales.cl',
        timestamp: Date.now()
      };

      const request = createMockRequest(validMetric);
      const response = await POST(request);

      // Should still return success even if external services fail
      expect(response.status).toBe(200);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(true);
      expect(responseData.warnings).toContain('Analytics service unavailable');
    });

    it('should rate metrics correctly', async () => {
      const testCases = [
        { name: 'CLS', value: 0.05, expectedRating: 'good' },
        { name: 'CLS', value: 0.15, expectedRating: 'needs-improvement' },
        { name: 'CLS', value: 0.3, expectedRating: 'poor' },
        { name: 'LCP', value: 2000, expectedRating: 'good' },
        { name: 'LCP', value: 3000, expectedRating: 'needs-improvement' },
        { name: 'LCP', value: 5000, expectedRating: 'poor' }
      ];

      for (const testCase of testCases) {
        const metric = {
          name: testCase.name,
          value: testCase.value,
          id: 'test-id',
          delta: 0,
          rating: testCase.expectedRating,
          url: 'https://comprametales.cl',
          timestamp: Date.now()
        };

        const request = createMockRequest(metric);
        const response = await POST(request);

        expect(response.status).toBe(200);
      }
    });
  });

  describe('Environment Configuration', () => {
    it('should handle missing environment variables', async () => {
      // Remove environment variables
      Object.keys(mockEnv).forEach(key => {
        delete process.env[key];
      });

      const validMetric = {
        name: 'FCP',
        value: 1500,
        id: 'test-id',
        delta: 100,
        rating: 'good',
        url: 'https://comprametales.cl',
        timestamp: Date.now()
      };

      const request = createMockRequest(validMetric);
      const response = await POST(request);

      // Should still work with degraded functionality
      expect(response.status).toBe(200);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(true);
      expect(responseData.warnings).toContain('Analytics configuration incomplete');
    });
  });
});
