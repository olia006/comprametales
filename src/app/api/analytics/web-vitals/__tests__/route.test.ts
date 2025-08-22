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
        success: true
      });
    });

    it('should reject metrics without name', async () => {
      const invalidMetric = {
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
      expect(responseData.error).toBe('Invalid metric data');
    });

    it('should reject metrics without value', async () => {
      const incompleteMetric = {
        name: 'LCP',
        id: 'test-id',
        delta: 100,
        rating: 'poor',
        url: 'https://comprametales.cl',
        timestamp: Date.now()
      };

      const request = createMockRequest(incompleteMetric);
      const response = await POST(request);

      expect(response.status).toBe(400);
      
      const responseData = await response.json();
      expect(responseData.error).toBe('Invalid metric data');
    });

    it('should handle malformed JSON', async () => {
      const request = {
        json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
        headers: new Headers()
      } as unknown as NextRequest;

      const response = await POST(request);

      expect(response.status).toBe(500);
      
      const responseData = await response.json();
      expect(responseData.error).toBe('Failed to process metric');
    });
  });
});
