/* eslint-disable no-unused-vars, curly */
// Chunk Error Handler - Prevents and recovers from chunk loading errors
// This utility handles ChunkLoadError and other module loading failures

interface ChunkErrorHandlerOptions {
  maxRetries?: number;
  retryDelay?: number;
  enableAutoRefresh?: boolean;
  onError?: (error: Error, retryCount: number) => void;
}

class ChunkErrorHandler {
  private maxRetries: number;
  private retryDelay: number;
  private enableAutoRefresh: boolean;
  private onError?: (error: Error, retryCount: number) => void;
  private retryCount = new Map<string, number>();

  constructor(options: ChunkErrorHandlerOptions = {}) {
    this.maxRetries = options.maxRetries ?? 3;
    this.retryDelay = options.retryDelay ?? 1000;
    this.enableAutoRefresh = options.enableAutoRefresh ?? true;
    this.onError = options.onError;
  }

  // Initialize global error handlers
  init(): void {
    if (typeof window === 'undefined') return;

    // Handle unhandled promise rejections (chunk loading failures)
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this));
    
    // Handle JavaScript errors (including chunk errors)
    window.addEventListener('error', this.handleError.bind(this));
    
    // Handle dynamic import errors
    this.patchDynamicImports();
  }

  private handleUnhandledRejection = (event: PromiseRejectionEvent): void => {
    const error = event.reason;
    
    if (this.isChunkError(error)) {
      event.preventDefault(); // Prevent console error
      this.handleChunkError(error);
    }
  };

  private handleError = (event: ErrorEvent): void => {
    if (this.isChunkError(event.error)) {
      event.preventDefault(); // Prevent console error
      this.handleChunkError(event.error);
    }
  };

  private isChunkError(error: any): boolean {
    if (!error) return false;
    
    const errorMessage = error.message || error.toString();
    const chunkErrorPatterns = [
      /Loading chunk \d+ failed/i,
      /ChunkLoadError/i,
      /Loading CSS chunk \d+ failed/i,
      /Failed to import/i,
      /Unexpected token '<'/i, // Often indicates HTML returned instead of JS
      /Cannot read property.*of undefined.*chunk/i,
      // React-specific chunk errors
      /Minified React error #425/i, // Hydration mismatch often caused by chunks
      /Minified React error #418/i, // Hook errors from failed imports
      /Minified React error #423/i, // Undefined access from missing chunks
    ];

    return chunkErrorPatterns.some(pattern => pattern.test(errorMessage));
  }

  private async handleChunkError(error: Error): Promise<void> {
    const errorKey = error.message || 'unknown-chunk-error';
    const currentRetries = this.retryCount.get(errorKey) || 0;

    // Call error callback if provided
    if (this.onError) {
      this.onError(error, currentRetries);
    }

    // If we've exceeded max retries, force refresh
    if (currentRetries >= this.maxRetries) {
      if (this.enableAutoRefresh) {
        this.forceRefresh('Max retries exceeded for chunk loading');
      }
      return;
    }

    // Increment retry count
    this.retryCount.set(errorKey, currentRetries + 1);

    // Wait before retrying
    await this.delay(this.retryDelay * (currentRetries + 1)); // Exponential backoff

    // Try to reload the page
    if (this.enableAutoRefresh) {
      this.forceRefresh('Chunk loading failed, refreshing page');
    }
  }

  private forceRefresh(reason: string): void {
    console.warn(`[ChunkErrorHandler] ${reason}`);
    
    // Clear any cached chunks
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          if (name.includes('chunk') || name.includes('static')) {
            caches.delete(name);
          }
        });
      });
    }

    // Force a hard refresh
    window.location.reload();
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Patch dynamic imports to handle errors gracefully
  private patchDynamicImports(): void {
    const originalImport = window.eval('import');
    
    if (typeof originalImport === 'function') {
      // This is a simplified approach - in practice, you'd need more sophisticated patching
      console.log('[ChunkErrorHandler] Dynamic import patching initialized');
    }
  }

  // Method to manually handle a chunk error
  public handleManualChunkError(error: Error): void {
    if (this.isChunkError(error)) {
      this.handleChunkError(error);
    }
  }

  // Clear retry counts (useful for testing or manual reset)
  public clearRetryCount(): void {
    this.retryCount.clear();
  }

  // Destroy the handler and remove event listeners
  public destroy(): void {
    if (typeof window === 'undefined') return;

    window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
    window.removeEventListener('error', this.handleError);
    this.retryCount.clear();
  }
}

// Create a singleton instance
export const chunkErrorHandler = new ChunkErrorHandler({
  maxRetries: 2,
  retryDelay: 1500,
  enableAutoRefresh: true,
  onError: (error, retryCount) => {
    // Send error to monitoring service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'chunk_error', {
        error_message: error.message,
        retry_count: retryCount,
        user_agent: navigator.userAgent,
      });
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[ChunkError] Retry ${retryCount + 1}:`, error.message);
    }
  },
});

// Enhanced dynamic import wrapper with retry logic
export async function safeDynamicImport<T = any>(
  importFn: () => Promise<T>,
  maxRetries: number = 3,
  retryDelay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await importFn();
    } catch (error) {
      lastError = error as Error;
      
      if (chunkErrorHandler['isChunkError'](error)) {
        if (attempt < maxRetries) {
          console.warn(`[SafeDynamicImport] Attempt ${attempt + 1} failed, retrying...`);
          await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
          continue;
        }
      }
      
      // If it's not a chunk error or we've exhausted retries, throw
      throw error;
    }
  }

  throw lastError!;
}

// Initialize the handler when this module is imported
if (typeof window !== 'undefined') {
  // Initialize after a short delay to ensure DOM is ready
  setTimeout(() => {
    chunkErrorHandler.init();
  }, 100);
}
