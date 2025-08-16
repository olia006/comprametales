/**
 * Utility functions library
 * Common helper functions used throughout the application
 */

// String utilities
export const stringUtils = {
  /**
   * Capitalize the first letter of a string
   */
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  },

  /**
   * Convert string to kebab-case
   */
  toKebabCase: (str: string): string => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase()
  },

  /**
   * Convert string to camelCase
   */
  toCamelCase: (str: string): string => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase()
      })
      .replace(/\s+/g, '')
  },

  /**
   * Truncate string with ellipsis
   */
  truncate: (str: string, length: number): string => {
    return str.length > length ? str.substring(0, length) + '...' : str
  },

  /**
   * Remove HTML tags from string
   */
  stripHtml: (str: string): string => {
    return str.replace(/<[^>]*>/g, '')
  },
}

// Number utilities
export const numberUtils = {
  /**
   * Format number as Chilean peso
   */
  formatCurrency: (amount: number): string => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(amount)
  },

  /**
   * Format number with thousands separator
   */
  formatNumber: (num: number): string => {
    return new Intl.NumberFormat('es-CL').format(num)
  },

  /**
   * Clamp number between min and max
   */
  clamp: (num: number, min: number, max: number): number => {
    return Math.min(Math.max(num, min), max)
  },

  /**
   * Round number to specified decimal places
   */
  round: (num: number, decimals: number = 2): number => {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals)
  },
}

// Date utilities
export const dateUtils = {
  /**
   * Format date for Chilean locale
   */
  formatDate: (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dateObj)
  },

  /**
   * Format date and time for Chilean locale
   */
  formatDateTime: (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('es-CL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(dateObj)
  },

  /**
   * Get relative time (e.g., "hace 2 horas")
   */
  getRelativeTime: (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return 'hace unos segundos'
    }
    if (diffInSeconds < 3600) {
      return `hace ${Math.floor(diffInSeconds / 60)} minutos`
    }
    if (diffInSeconds < 86400) {
      return `hace ${Math.floor(diffInSeconds / 3600)} horas`
    }
    if (diffInSeconds < 2592000) {
      return `hace ${Math.floor(diffInSeconds / 86400)} días`
    }
    if (diffInSeconds < 31536000) {
      return `hace ${Math.floor(diffInSeconds / 2592000)} meses`
    }
    return `hace ${Math.floor(diffInSeconds / 31536000)} años`
  },

  /**
   * Check if date is today
   */
  isToday: (date: Date | string): boolean => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const today = new Date()
    return dateObj.toDateString() === today.toDateString()
  },
}

// URL utilities
export const urlUtils = {
  /**
   * Build WhatsApp URL with message
   */
  buildWhatsAppUrl: (phone: string, message: string = ''): string => {
    const cleanPhone = phone.replace(/[^\d]/g, '')
    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/${cleanPhone}${message ? `?text=${encodedMessage}` : ''}`
  },

  /**
   * Build Google Maps directions URL
   */
  buildDirectionsUrl: (address: string): string => {
    const encodedAddress = encodeURIComponent(address)
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
  },

  /**
   * Build Google Maps search URL
   */
  buildMapsUrl: (address: string): string => {
    const encodedAddress = encodeURIComponent(address)
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
  },

  /**
   * Extract domain from URL
   */
  getDomain: (url: string): string => {
    try {
      return new URL(url).hostname
    } catch {
      return ''
    }
  },
}

// Validation utilities
export const validationUtils = {
  /**
   * Validate Chilean phone number
   */
  isValidChileanPhone: (phone: string): boolean => {
    const cleanPhone = phone.replace(/[^\d]/g, '')
    return /^56[0-9]{8,9}$/.test(cleanPhone) || /^[0-9]{8,9}$/.test(cleanPhone)
  },

  /**
   * Validate email address
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  /**
   * Validate Chilean RUT
   */
  isValidRut: (rut: string): boolean => {
    const cleanRut = rut.replace(/[^\dkK]/g, '')
    if (cleanRut.length < 8 || cleanRut.length > 9) {
      return false
    }

    const body = cleanRut.slice(0, -1)
    const dv = cleanRut.slice(-1).toUpperCase()

    let sum = 0
    let multiplier = 2

    for (let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body[i]) * multiplier
      multiplier = multiplier === 7 ? 2 : multiplier + 1
    }

    const remainder = sum % 11
    const calculatedDv = remainder < 2 ? remainder.toString() : remainder === 10 ? 'K' : (11 - remainder).toString()

    return dv === calculatedDv
  },
}

// Performance utilities
export const performanceUtils = {
  /**
   * Debounce function calls
   */
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...funcArgs: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout
    return (...funcArgs: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...funcArgs), wait)
    }
  },

  /**
   * Throttle function calls
   */
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...funcArgs: Parameters<T>) => void) => {
    let inThrottle: boolean
    return (...funcArgs: Parameters<T>) => {
      if (!inThrottle) {
        func(...funcArgs)
        inThrottle = true
        setTimeout(() => {
          inThrottle = false
        }, limit)
      }
    }
  },

  /**
   * Measure function execution time
   */
  measureTime: async <T>(
    func: () => Promise<T> | T,
    label?: string
  ): Promise<{ result: T; duration: number }> => {
    const start = performance.now()
    const result = await func()
    const duration = performance.now() - start
    
    if (label && process.env.NODE_ENV === 'development') {
      console.log(`${label} took ${duration.toFixed(2)}ms`)
    }
    
    return { result, duration }
  },
}

// Storage utilities
export const storageUtils = {
  /**
   * Safe localStorage operations
   */
  localStorage: {
    get: <T>(key: string, defaultValue?: T): T | null => {
      if (typeof window === 'undefined') {
        return defaultValue || null
      }
      try {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : defaultValue || null
      } catch {
        return defaultValue || null
      }
    },

    set: (key: string, value: any): boolean => {
      if (typeof window === 'undefined') {
        return false
      }
      try {
        window.localStorage.setItem(key, JSON.stringify(value))
        return true
      } catch {
        return false
      }
    },

    remove: (key: string): boolean => {
      if (typeof window === 'undefined') {
        return false
      }
      try {
        window.localStorage.removeItem(key)
        return true
      } catch {
        return false
      }
    },
  },

  /**
   * Safe sessionStorage operations
   */
  sessionStorage: {
    get: <T>(key: string, defaultValue?: T): T | null => {
      if (typeof window === 'undefined') {
        return defaultValue || null
      }
      try {
        const item = window.sessionStorage.getItem(key)
        return item ? JSON.parse(item) : defaultValue || null
      } catch {
        return defaultValue || null
      }
    },

    set: (key: string, value: any): boolean => {
      if (typeof window === 'undefined') {
        return false
      }
      try {
        window.sessionStorage.setItem(key, JSON.stringify(value))
        return true
      } catch {
        return false
      }
    },

    remove: (key: string): boolean => {
      if (typeof window === 'undefined') {
        return false
      }
      try {
        window.sessionStorage.removeItem(key)
        return true
      } catch {
        return false
      }
    },
  },
}

// Export all utilities as a single object for convenience
export const utils = {
  string: stringUtils,
  number: numberUtils,
  date: dateUtils,
  url: urlUtils,
  validation: validationUtils,
  performance: performanceUtils,
  storage: storageUtils,
}
