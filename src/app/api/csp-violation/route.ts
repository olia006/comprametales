import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Log CSP violations for development and monitoring
    if (process.env.NODE_ENV === 'development') {
      console.warn('CSP Violation Detected:', {
        timestamp: new Date().toISOString(),
        userAgent: request.headers.get('user-agent'),
        violation: body,
        url: request.url
      });
    }
    
    // In production, you might want to send this to a monitoring service
    // like Sentry, LogRocket, or your own analytics system
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to monitoring service
      // await sendToMonitoringService(body);
    }
    
    return NextResponse.json({ status: 'received' }, { status: 200 });
  } catch (error) {
    console.error('Error processing CSP violation report:', error);
    return NextResponse.json({ error: 'Invalid report' }, { status: 400 });
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
