import { NextRequest, NextResponse } from 'next/server'

interface ErrorReport {
  message: string
  stack?: string
  componentStack?: string
  url: string
  userAgent: string
  timestamp: string
  userId?: string
  sessionId?: string
}

export async function POST(request: NextRequest) {
  try {
    const errorReport: ErrorReport = await request.json()
    
    // Validate required fields
    if (!errorReport.message || !errorReport.url || !errorReport.timestamp) {
      return NextResponse.json(
        { error: 'Missing required error fields' },
        { status: 400 }
      )
    }

    // Log error details
    console.error('[Client Error Report]', {
      message: errorReport.message,
      url: errorReport.url,
      timestamp: errorReport.timestamp,
      userAgent: errorReport.userAgent,
    })

    // In development, log full stack trace
    if (process.env.NODE_ENV === 'development') {
      console.error('Stack trace:', errorReport.stack)
      if (errorReport.componentStack) {
        console.error('Component stack:', errorReport.componentStack)
      }
    }

    // Store error in file system for development/small deployments
    if (process.env.NODE_ENV === 'development') {
      await logErrorToFile(errorReport)
    }

    // Send to external error monitoring service
    await sendToErrorMonitoring(errorReport)

    // Send alert for critical errors
    if (isCriticalError(errorReport)) {
      await sendCriticalErrorAlert(errorReport)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Error API] Failed to process error report:', error)
    return NextResponse.json(
      { error: 'Failed to process error report' },
      { status: 500 }
    )
  }
}

async function logErrorToFile(errorReport: ErrorReport) {
  try {
    const fs = await import('fs/promises')
    const path = await import('path')
    
    const logDir = path.join(process.cwd(), 'logs')
    const logFile = path.join(logDir, 'client-errors.jsonl')
    
    await fs.mkdir(logDir, { recursive: true })
    
    const logEntry = JSON.stringify({
      ...errorReport,
      serverTimestamp: new Date().toISOString(),
    }) + '\n'
    
    await fs.appendFile(logFile, logEntry)
  } catch (error) {
    console.warn('Failed to write error to log file:', error)
  }
}

async function sendToErrorMonitoring(errorReport: ErrorReport) {
  try {
    // Send to Sentry if configured
    if (process.env.SENTRY_DSN) {
      // In a real implementation, you would use @sentry/node
      // await Sentry.captureException(new Error(errorReport.message), {
      //   extra: errorReport,
      //   tags: { source: 'client' }
      // })
    }

    // Send to custom error monitoring service
    if (process.env.ERROR_MONITORING_WEBHOOK) {
      await fetch(process.env.ERROR_MONITORING_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ERROR_MONITORING_API_KEY || ''}`,
        },
        body: JSON.stringify({
          type: 'client_error',
          data: errorReport,
          severity: getSeverityLevel(errorReport),
        }),
      })
    }
  } catch (error) {
    console.error('Failed to send to error monitoring:', error)
  }
}

async function sendCriticalErrorAlert(errorReport: ErrorReport) {
  try {
    const alertMessage = `🚨 Critical Error on KONSTANDER website:\n\nMessage: ${errorReport.message}\nURL: ${errorReport.url}\nTime: ${errorReport.timestamp}`
    
    // Send to Slack if configured
    if (process.env.SLACK_WEBHOOK_URL) {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: alertMessage,
          channel: process.env.SLACK_ERRORS_CHANNEL || '#errors',
          username: 'Error Monitor',
          icon_emoji: ':rotating_light:',
        }),
      })
    }

    // Send email alert if configured
    if (process.env.ALERT_EMAIL && process.env.SENDGRID_API_KEY) {
      await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: process.env.ALERT_EMAIL }],
            subject: 'Critical Error - KONSTANDER Website',
          }],
          from: { email: 'alerts@konstander.cl', name: 'KONSTANDER Error Monitor' },
          content: [{
            type: 'text/plain',
            value: `${alertMessage}\n\nFull Error Details:\n${JSON.stringify(errorReport, null, 2)}`,
          }],
        }),
      })
    }
  } catch (error) {
    console.error('Failed to send critical error alert:', error)
  }
}

function isCriticalError(errorReport: ErrorReport): boolean {
  const criticalPatterns = [
    /ChunkLoadError/i,
    /Network Error/i,
    /Failed to fetch/i,
    /TypeError.*Cannot read/i,
    /ReferenceError/i,
  ]
  
  return criticalPatterns.some(pattern => 
    pattern.test(errorReport.message) || 
    (errorReport.stack && pattern.test(errorReport.stack))
  )
}

function getSeverityLevel(errorReport: ErrorReport): 'low' | 'medium' | 'high' | 'critical' {
  if (isCriticalError(errorReport)) {
    return 'critical'
  }
  
  if (errorReport.message.includes('Warning') || errorReport.message.includes('Deprecated')) {
    return 'low'
  }
  
  if (errorReport.componentStack || errorReport.stack) {
    return 'high'
  }
  
  return 'medium'
}
