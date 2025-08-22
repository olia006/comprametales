import { trackPageView, trackPhoneClick, trackCTAClick } from '../tracking';

// Mock window.dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

describe('Tracking Utilities', () => {
  beforeEach(() => {
    // Reset dataLayer before each test
    window.dataLayer = [];
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Clean up
    delete (window as any).dataLayer;
  });

  describe('trackPageView', () => {
    it('should push page_view event to dataLayer', () => {
      trackPageView('Homepage', 'landing');

      expect(window.dataLayer).toHaveLength(1);
      expect(window.dataLayer[0]).toEqual({
        event: 'page_view',
        page_name: 'Homepage',
        page_type: 'landing',
        event_category: 'Navigation',
        event_label: 'Homepage'
      });
    });

    it('should handle missing dataLayer gracefully', () => {
      delete (window as any).dataLayer;
      
      expect(() => {
        trackPageView('Test Page', 'test');
      }).not.toThrow();
    });
  });

  describe('trackCTAClick', () => {
    it('should push button_click event to dataLayer', () => {
      trackCTAClick('Call to Action', '/contact', 'homepage');

      expect(window.dataLayer).toHaveLength(1);
      expect(window.dataLayer[0]).toEqual({
        event: 'button_click',
        button_text: 'Call to Action',
        destination: '/contact',
        source_page: 'homepage',
        event_category: 'CTA',
        event_label: 'Call to Action',
        value: 1
      });
    });

    it('should work with default source', () => {
      trackCTAClick('Simple Button', '/page');

      expect(window.dataLayer).toHaveLength(1);
      expect(window.dataLayer[0]).toMatchObject({
        event: 'button_click',
        button_text: 'Simple Button',
        destination: '/page',
        source_page: 'unknown'
      });
    });
  });

  describe('trackPhoneClick', () => {
    it('should push phone_click event to dataLayer', () => {
      trackPhoneClick('+56937720208');

      expect(window.dataLayer).toHaveLength(1);
      expect(window.dataLayer[0]).toEqual({
        event: 'phone_click',
        phone_number: '+56937720208',
        source_page: 'unknown',
        event_category: 'Contact',
        event_label: '+56937720208',
        value: 1
      });
    });

    it('should handle phone number formatting', () => {
      trackPhoneClick('937720208'); // Without country code

      expect(window.dataLayer[0]).toMatchObject({
        event: 'phone_click',
        phone_number: '937720208',
        source_page: 'unknown'
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle dataLayer.push errors gracefully', () => {
      // Mock dataLayer.push to throw an error
      window.dataLayer = {
        push: jest.fn(() => {
          throw new Error('DataLayer error');
        })
      } as any;

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => {
        trackPageView('Error Test');
      }).not.toThrow();

      consoleSpy.mockRestore();
    });
  });
});
