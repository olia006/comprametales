import { NextRequest, NextResponse } from 'next/server';

interface WebVitalMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  url: string;
  timestamp: number;
}

export async function POST(request: NextRequest) {
  try {
    const metric: WebVitalMetric = await request.json();
    
    // Validate the metric data
    if (!metric.name || typeof metric.value !== 'number') {
      return NextResponse.json(
        { error: 'Invalid metric data' },
        { status: 400 }
      );
    }

    // Log the metric in development only
    if (process.env.NODE_ENV === 'development') {
      console.log('[Web Vitals API]', {
        metric: metric.name,
        value: metric.value,
        rating: metric.rating,
        url: metric.url,
        timestamp: new Date(metric.timestamp).toISOString(),
      });
    }

    // Here you would typically:
    // 1. Send to your analytics service (Google Analytics, Mixpanel, etc.)
    // 2. Store in your database for analysis
    // 3. Alert if metrics are poor
    
    // Send to external analytics service
    await sendToAnalyticsService(metric);
    
    // Store in database
    await storeMetricInDatabase(metric);
    
    // Check for performance issues and send alerts
    if (metric.rating === 'poor') {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[Performance Alert] Poor ${metric.name} score: ${metric.value}ms on ${metric.url}`);
      }
      await sendPerformanceAlert(metric);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Web Vitals API] Error processing metric:', error);
    return NextResponse.json(
      { error: 'Failed to process metric' },
      { status: 500 }
    );
  }
}

// Helper function to send to external analytics service
async function sendToAnalyticsService(metric: WebVitalMetric) {
  try {
    // Send to Google Analytics 4 if configured
    if (process.env.GA_MEASUREMENT_ID && process.env.GA_API_SECRET) {
      const response = await fetch(
        `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GA_MEASUREMENT_ID}&api_secret=${process.env.GA_API_SECRET}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: 'web-vitals-client',
            events: [{
              name: 'web_vital',
              params: {
                metric_name: metric.name,
                metric_value: metric.value,
                metric_rating: metric.rating,
                page_url: metric.url,
              }
            }]
          })
        }
      );

      if (!response.ok) {
        console.warn(`GA4 API responded with status: ${response.status}`);
      }
    }

    // Send to custom analytics webhook if configured
    if (process.env.ANALYTICS_WEBHOOK_URL) {
      const response = await fetch(process.env.ANALYTICS_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ANALYTICS_API_KEY || ''}`,
        },
        body: JSON.stringify({
          type: 'web_vital',
          data: metric,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        console.warn(`Analytics webhook responded with status: ${response.status}`);
      }
    }
  } catch (error) {
    console.error('Failed to send to analytics service:', error);
    // Don't throw - we don't want to break the user experience
  }
}

// Helper function to store in database
async function storeMetricInDatabase(metric: WebVitalMetric) {
  try {
    // Store in file system for development/small deployments
    if (process.env.NODE_ENV === 'development') {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      const logDir = path.join(process.cwd(), 'logs');
      const logFile = path.join(logDir, 'web-vitals.jsonl');
      
      try {
        await fs.mkdir(logDir, { recursive: true });
        const logEntry = JSON.stringify({
          ...metric,
          timestamp: new Date().toISOString(),
        }) + '\n';
        
        await fs.appendFile(logFile, logEntry);
      } catch (fsError) {
        console.warn('Failed to write to log file:', fsError);
      }
    }

    // For production, you would integrate with your database
    // Examples:
    // - PostgreSQL: await db.query('INSERT INTO web_vitals ...', [metric])
    // - MongoDB: await db.collection('web-vitals').insertOne(metric)
    // - Supabase: await supabase.from('web_vitals').insert(metric)
    // - Firebase: await db.collection('web-vitals').add(metric)
    
  } catch (error) {
    console.error('Failed to store metric in database:', error);
    // Don't throw - we don't want to break the user experience
  }
}

// Helper function to send performance alerts
async function sendPerformanceAlert(metric: WebVitalMetric) {
  try {
    const alertMessage = `🚨 Poor ${metric.name} performance detected: ${metric.value}${metric.name === 'CLS' ? '' : 'ms'} (${metric.rating}) on ${metric.url}`;
    
    // Send to Slack webhook if configured
    if (process.env.SLACK_WEBHOOK_URL) {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: alertMessage,
          channel: process.env.SLACK_CHANNEL || '#performance',
          username: 'Web Vitals Monitor',
          icon_emoji: ':warning:',
        }),
      });
    }

    // Send email alert if configured
    if (process.env.ALERT_EMAIL && process.env.SENDGRID_API_KEY) {
      // Example with SendGrid
      await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: process.env.ALERT_EMAIL }],
            subject: `Performance Alert: Poor ${metric.name} Score`,
          }],
          from: { email: 'konstanderspa@gmail.com', name: 'KONSTANDER Performance Monitor' },
          content: [{
            type: 'text/plain',
            value: `${alertMessage}\n\nMetric Details:\n- Value: ${metric.value}\n- Rating: ${metric.rating}\n- Page: ${metric.url}\n- Timestamp: ${new Date(metric.timestamp).toISOString()}`,
          }],
        }),
      });
    }

    // Log to console as fallback
    console.warn(alertMessage);
    
  } catch (error) {
    console.error('Failed to send performance alert:', error);
    // Don't throw - we don't want to break the user experience
  }
}
