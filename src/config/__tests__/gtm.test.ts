import { GTM_CONFIG, pushToDataLayer } from '../gtm';

// Mock window.dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

describe('GTM Configuration', () => {
  beforeEach(() => {
    window.dataLayer = [];
    jest.clearAllMocks();
  });

  afterEach(() => {
    delete (window as any).dataLayer;
  });

  describe('GTM_CONFIG', () => {
    it('should have correct GTM container ID', () => {
      expect(GTM_CONFIG.GTM_ID).toBe('GTM-KRM573BR');
    });

    it('should have all required event types', () => {
      const expectedEvents = [
        'PAGE_VIEW',
        'BUTTON_CLICK', 
        'PHONE_CLICK',
        'EMAIL_CLICK',
        'PRICE_VIEW',
        'MATERIAL_SELECT',
        'CONTACT_CLICK'
      ];

      expectedEvents.forEach(event => {
        expect(GTM_CONFIG.EVENTS).toHaveProperty(event);
        expect(typeof GTM_CONFIG.EVENTS[event]).toBe('string');
      });
    });

    it('should have all required custom dimensions', () => {
      const expectedDimensions = [
        'PAGE_TYPE',
        'MATERIAL_CATEGORY',
        'PRICE_RANGE', 
        'USER_LOCATION'
      ];

      expectedDimensions.forEach(dimension => {
        expect(GTM_CONFIG.CUSTOM_DIMENSIONS).toHaveProperty(dimension);
        expect(typeof GTM_CONFIG.CUSTOM_DIMENSIONS[dimension]).toBe('string');
      });
    });
  });

  describe('pushToDataLayer', () => {
    it('should push simple event to dataLayer', () => {
      pushToDataLayer('test_event');

      expect(window.dataLayer).toHaveLength(1);
      expect(window.dataLayer[0]).toEqual({
        event: 'test_event'
      });
    });

    it('should push event with data to dataLayer', () => {
      const testData = {
        page_name: 'Test Page',
        user_action: 'click',
        value: 100
      };

      pushToDataLayer('test_event', testData);

      expect(window.dataLayer).toHaveLength(1);
      expect(window.dataLayer[0]).toEqual({
        event: 'test_event',
        ...testData
      });
    });

    it('should handle missing dataLayer', () => {
      delete (window as any).dataLayer;

      expect(() => {
        pushToDataLayer('test_event');
      }).not.toThrow();
    });

    it('should handle dataLayer push errors', () => {
      window.dataLayer = {
        push: jest.fn(() => {
          throw new Error('DataLayer error');
        })
      } as any;

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => {
        pushToDataLayer('test_event');
      }).not.toThrow();

      consoleSpy.mockRestore();
    });

    it('should accept any valid event name', () => {
      // The current implementation doesn't validate event names
      // This test ensures it accepts various formats
      const testEvents = [
        'page_view',
        'button-click',
        'CUSTOM_EVENT',
        'mixedCase_Event'
      ];

      testEvents.forEach(eventName => {
        pushToDataLayer(eventName, { test: true });
        expect(window.dataLayer).toContainEqual(
          expect.objectContaining({
            event: eventName,
            test: true
          })
        );
      });
    });
  });

  describe('GTM Integration', () => {
    it('should work with standard GTM events', () => {
      Object.values(GTM_CONFIG.EVENTS).forEach(eventName => {
        pushToDataLayer(eventName, { 
          page_name: 'Test',
          timestamp: Date.now()
        });

        expect(window.dataLayer).toContainEqual(
          expect.objectContaining({
            event: eventName,
            page_name: 'Test'
          })
        );
      });
    });

    it('should include custom dimensions in events', () => {
      pushToDataLayer(GTM_CONFIG.EVENTS.PAGE_VIEW, {
        [GTM_CONFIG.CUSTOM_DIMENSIONS.PAGE_TYPE]: 'landing',
        [GTM_CONFIG.CUSTOM_DIMENSIONS.MATERIAL_CATEGORY]: 'metals',
        [GTM_CONFIG.CUSTOM_DIMENSIONS.USER_LOCATION]: 'lampa'
      });

      expect(window.dataLayer[0]).toMatchObject({
        event: 'page_view',
        page_type: 'landing',
        material_category: 'metals',
        user_location: 'lampa'
      });
    });
  });
});
