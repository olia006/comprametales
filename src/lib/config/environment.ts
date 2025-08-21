/**
 * Centralized environment configuration
 * Provides type-safe access to environment variables
 */

interface EnvironmentConfig {
  // App Configuration
  nodeEnv: 'development' | 'production' | 'test'
  siteUrl: string
  isDevelopment: boolean
  isProduction: boolean
  isTest: boolean

  // Company Information
  company: {
    name: string
    phone: string
    email: string
    address: string
  }

  // Analytics Configuration
  analytics: {
    gaMeasurementId?: string
    gaApiSecret?: string
    webhookUrl?: string
    apiKey?: string
  }

  // Error Monitoring
  errorMonitoring: {
    sentryDsn?: string
    webhookUrl?: string
    apiKey?: string
  }

  // Alerts Configuration
  alerts: {
    slackWebhookUrl?: string
    slackChannel?: string
    slackErrorsChannel?: string
    email?: string
    sendgridApiKey?: string
  }

  // Google Tag Manager
  gtm: {
    id?: string
  }
}

function getEnvironmentVariable(key: string, fallback?: string): string {
  const value = process.env[key] || fallback
  if (!value && !fallback) {
    console.warn(`Environment variable ${key} is not set`)
  }
  return value || ''
}

// Currently not used but kept for future use
// function getBooleanEnvironmentVariable(key: string, fallback = false): boolean {
//   const value = process.env[key]
//   if (!value) {
//     return fallback
//   }
//   return value.toLowerCase() === 'true'
// }

export const env: EnvironmentConfig = {
  // App Configuration
  nodeEnv: (process.env.NODE_ENV as any) || 'development',
  siteUrl: getEnvironmentVariable('NEXT_PUBLIC_SITE_URL', 'https://comprametales.cl'),
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',

  // Company Information
  company: {
    name: getEnvironmentVariable('NEXT_PUBLIC_COMPANY_NAME', 'KONSTANDER'),
    phone: getEnvironmentVariable('NEXT_PUBLIC_COMPANY_PHONE', '+56937720208'),
    email: getEnvironmentVariable('NEXT_PUBLIC_COMPANY_EMAIL', 'konstanderspa@gmail.com'),
    address: getEnvironmentVariable(
      'NEXT_PUBLIC_COMPANY_ADDRESS',
      'Panamericana Norte 17110, Lampa, Región Metropolitana'
    ),
  },

  // Analytics Configuration
  analytics: {
    gaMeasurementId: getEnvironmentVariable('GA_MEASUREMENT_ID'),
    gaApiSecret: getEnvironmentVariable('GA_API_SECRET'),
    webhookUrl: getEnvironmentVariable('ANALYTICS_WEBHOOK_URL'),
    apiKey: getEnvironmentVariable('ANALYTICS_API_KEY'),
  },

  // Error Monitoring
  errorMonitoring: {
    sentryDsn: getEnvironmentVariable('SENTRY_DSN'),
    webhookUrl: getEnvironmentVariable('ERROR_MONITORING_WEBHOOK'),
    apiKey: getEnvironmentVariable('ERROR_MONITORING_API_KEY'),
  },

  // Alerts Configuration
  alerts: {
    slackWebhookUrl: getEnvironmentVariable('SLACK_WEBHOOK_URL'),
    slackChannel: getEnvironmentVariable('SLACK_CHANNEL', '#performance'),
    slackErrorsChannel: getEnvironmentVariable('SLACK_ERRORS_CHANNEL', '#errors'),
    email: getEnvironmentVariable('ALERT_EMAIL'),
    sendgridApiKey: getEnvironmentVariable('SENDGRID_API_KEY'),
  },

  // Google Tag Manager
  gtm: {
    id: getEnvironmentVariable('GTM_ID', 'GTM-KRM573BR'),
  },
}

// Validation function to check required environment variables
export function validateEnvironment(): void {
  const requiredVars = [
    'NEXT_PUBLIC_SITE_URL',
    'NEXT_PUBLIC_COMPANY_NAME',
    'NEXT_PUBLIC_COMPANY_PHONE',
  ]

  const missingVars = requiredVars.filter(varName => !process.env[varName])

  if (missingVars.length > 0) {
    console.warn(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
      'Please check your .env file or environment configuration.'
    )
  }
}

// Initialize validation in non-test environments
if (env.nodeEnv !== 'test') {
  validateEnvironment()
}
