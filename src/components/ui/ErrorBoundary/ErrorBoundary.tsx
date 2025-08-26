'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import styles from './ErrorBoundary.module.css'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  // eslint-disable-next-line no-unused-vars
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo })
    
    // Enhanced error logging with React error detection
    const isReactError = this.isReactError(error);
    const errorContext = {
      isReactError,
      errorType: this.getErrorType(error),
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
    };
    
    // Log error to console in development with context
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 ErrorBoundary caught an error');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Context:', errorContext);
      console.groupEnd();
    }

    // Send error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      this.logErrorToService(error, errorInfo, errorContext)
    }

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo)
  }

  private isReactError(error: Error): boolean {
    const reactErrorPatterns = [
      /Minified React error #(\d+)/,
      /React error #(\d+)/,
      /Hydration failed/,
      /Text content does not match/,
      /Cannot read properties of undefined/,
      /Cannot read property.*of undefined/
    ];
    
    return reactErrorPatterns.some(pattern => 
      pattern.test(error.message) || 
      (error.stack && pattern.test(error.stack))
    );
  }

  private getErrorType(error: Error): string {
    if (/Minified React error #425|Hydration failed|Text content does not match/.test(error.message)) {
      return 'hydration_mismatch';
    }
    if (/Minified React error #418|Invalid hook call/.test(error.message)) {
      return 'invalid_hook_call';
    }
    if (/Minified React error #423|Cannot read properties of undefined/.test(error.message)) {
      return 'undefined_access';
    }
    if (/ChunkLoadError|Loading chunk.*failed/.test(error.message)) {
      return 'chunk_load_error';
    }
    return 'unknown';
  }

  private async logErrorToService(error: Error, errorInfo: ErrorInfo, errorContext?: any) {
    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          url: typeof window !== 'undefined' ? window.location.href : 'unknown',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
          timestamp: new Date().toISOString(),
          ...errorContext,
        }),
      })
    } catch (logError) {
      console.error('Failed to log error to service:', logError)
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  private handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <div className={styles.errorBoundary}>
          <div className={styles.errorContent}>
            <div className={styles.errorIcon}>
              <AlertTriangle size={48} />
            </div>
            
            <h2 className={styles.errorTitle}>
              Algo salió mal
            </h2>
            
            <p className={styles.errorMessage}>
              Lo sentimos, ha ocurrido un error inesperado. Nuestro equipo ha sido notificado 
              y está trabajando para solucionarlo.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className={styles.errorDetails}>
                <summary>Detalles del error (solo en desarrollo)</summary>
                <pre className={styles.errorStack}>
                  {this.state.error.message}
                  {'\n\n'}
                  {this.state.error.stack}
                  {this.state.errorInfo?.componentStack && (
                    <>
                      {'\n\nComponent Stack:'}
                      {this.state.errorInfo.componentStack}
                    </>
                  )}
                </pre>
              </details>
            )}

            <div className={styles.errorActions}>
              <button 
                onClick={this.handleRetry}
                className={styles.retryButton}
              >
                <RefreshCw size={20} />
                Intentar de nuevo
              </button>
              
              <button 
                onClick={this.handleGoHome}
                className={styles.homeButton}
              >
                <Home size={20} />
                Ir al inicio
              </button>
            </div>

            <div className={styles.contactInfo}>
              <p>Si el problema persiste, contáctanos:</p>
              <a 
                href="https://wa.me/56937720208?text=Hola,%20tengo%20un%20problema%20técnico%20en%20el%20sitio%20web" 
                className={styles.contactLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: +56 9 5514 5437
              </a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
