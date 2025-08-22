// Google Tag Manager Configuration
export const GTM_CONFIG = {
  // Replace with your actual GTM container ID
  GTM_ID: 'GTM-KRM573BR',
  
  // Data layer events for tracking
  EVENTS: {
    PAGE_VIEW: 'page_view',
    BUTTON_CLICK: 'button_click',
    PHONE_CLICK: 'phone_click',
    EMAIL_CLICK: 'email_click',
    PRICE_VIEW: 'price_view',
    MATERIAL_SELECT: 'material_select',
    CONTACT_CLICK: 'contact_click',
  },
  
  // Custom dimensions for Chilean market
  CUSTOM_DIMENSIONS: {
    PAGE_TYPE: 'page_type',
    MATERIAL_CATEGORY: 'material_category',
    PRICE_RANGE: 'price_range',
    USER_LOCATION: 'user_location',
  }
};

// Helper function to push events to dataLayer
export const pushToDataLayer = (event: string, data?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    try {
      window.dataLayer.push({
        event,
        ...data,
      });
    } catch (error) {
      console.error('[GTM] Failed to push to dataLayer:', error);
    }
  }
};

// Track page views
export const trackPageView = (pageTitle: string, pagePath: string) => {
  pushToDataLayer(GTM_CONFIG.EVENTS.PAGE_VIEW, {
    page_title: pageTitle,
    page_path: pagePath,
    page_location: window.location.href,
  });
};

// Track button clicks
export const trackButtonClick = (buttonText: string, buttonLocation: string) => {
  pushToDataLayer(GTM_CONFIG.EVENTS.BUTTON_CLICK, {
    button_text: buttonText,
    button_location: buttonLocation,
  });
};

// Track phone clicks
export const trackPhoneClick = (phoneNumber: string) => {
  pushToDataLayer(GTM_CONFIG.EVENTS.PHONE_CLICK, {
    phone_number: phoneNumber,
  });
};

// Track price views
export const trackPriceView = (materialName: string, price: number) => {
  pushToDataLayer(GTM_CONFIG.EVENTS.PRICE_VIEW, {
    material_name: materialName,
    price: price,
    currency: 'CLP',
  });
};

// Declare global dataLayer type
declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    dataLayer: any[];
  }
}
