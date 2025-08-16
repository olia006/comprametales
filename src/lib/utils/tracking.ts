import { pushToDataLayer } from '@/config/gtm';

// Track phone clicks for conversion measurement
export const trackPhoneClick = (phoneNumber: string, source: string = 'unknown') => {
  // Track in Google Analytics via GTM
  pushToDataLayer('phone_click', {
    phone_number: phoneNumber,
    source_page: source,
    event_category: 'Contact',
    event_label: phoneNumber,
    value: 1
  });

  // Also track in console for development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Tracking] Phone click:', {
      phone: phoneNumber,
      source: source,
      timestamp: new Date().toISOString()
    });
  }
};

// Track email clicks for conversion measurement
export const trackEmailClick = (email: string, source: string = 'unknown') => {
  // Track in Google Analytics via GTM
  pushToDataLayer('email_click', {
    email_address: email,
    source_page: source,
    event_category: 'Contact',
    event_label: email,
    value: 1
  });

  // Also track in console for development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Tracking] Email click:', {
      email: email,
      source: source,
      timestamp: new Date().toISOString()
    });
  }
};

// Track CTA button clicks
export const trackCTAClick = (buttonText: string, destination: string, source: string = 'unknown') => {
  pushToDataLayer('button_click', {
    button_text: buttonText,
    destination: destination,
    source_page: source,
    event_category: 'CTA',
    event_label: buttonText,
    value: 1
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('[Tracking] CTA click:', {
      button: buttonText,
      destination: destination,
      source: source,
      timestamp: new Date().toISOString()
    });
  }
};

// Track page views with additional context
export const trackPageView = (pageName: string, pageType: string = 'page') => {
  pushToDataLayer('page_view', {
    page_name: pageName,
    page_type: pageType,
    event_category: 'Navigation',
    event_label: pageName
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('[Tracking] Page view:', {
      page: pageName,
      type: pageType,
      timestamp: new Date().toISOString()
    });
  }
};

// Track material interest (when users view specific materials)
export const trackMaterialInterest = (materialType: string, source: string = 'unknown') => {
  pushToDataLayer('material_select', {
    material_type: materialType,
    source_page: source,
    event_category: 'Interest',
    event_label: materialType,
    value: 1
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('[Tracking] Material interest:', {
      material: materialType,
      source: source,
      timestamp: new Date().toISOString()
    });
  }
};
