/**
 * API Client abstraction layer
 * Provides consistent error handling and request/response processing
 */

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  success: boolean
  status: number
}

export interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: any
  timeout?: number
}

class ApiClient {
  private baseUrl: string
  private defaultHeaders: Record<string, string>
  private defaultTimeout: number

  constructor(baseUrl = '', timeout = 10000) {
    this.baseUrl = baseUrl
    this.defaultTimeout = timeout
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  async request<T = any>(
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = this.defaultTimeout,
    } = options

    const url = this.baseUrl + endpoint
    const requestHeaders = { ...this.defaultHeaders, ...headers }

    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      let data: T | undefined
      const contentType = response.headers.get('content-type')
      
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json()
        } catch (parseError) {
          console.warn('Failed to parse JSON response:', parseError)
        }
      }

      return {
        data,
        success: response.ok,
        status: response.status,
        error: response.ok ? undefined : `HTTP ${response.status}: ${response.statusText}`,
      }
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return {
            success: false,
            status: 0,
            error: 'Request timeout',
          }
        }

        return {
          success: false,
          status: 0,
          error: error.message,
        }
      }

      return {
        success: false,
        status: 0,
        error: 'Unknown error occurred',
      }
    }
  }

  // Convenience methods
  async get<T = any>(endpoint: string, options?: Omit<ApiRequestOptions, 'method'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  async post<T = any>(endpoint: string, body?: any, options?: Omit<ApiRequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body })
  }

  async put<T = any>(endpoint: string, body?: any, options?: Omit<ApiRequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body })
  }

  async delete<T = any>(endpoint: string, options?: Omit<ApiRequestOptions, 'method'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }

  // Set default headers
  setDefaultHeader(key: string, value: string): void {
    this.defaultHeaders[key] = value
  }

  // Remove default header
  removeDefaultHeader(key: string): void {
    delete this.defaultHeaders[key]
  }
}

// Create default API client instance
export const apiClient = new ApiClient()

// Specialized API clients for different services
export const analyticsApi = {
  async sendWebVital(metric: any): Promise<ApiResponse> {
    return apiClient.post('/api/analytics/web-vitals', metric)
  },

  async sendEvent(event: any): Promise<ApiResponse> {
    return apiClient.post('/api/analytics/events', event)
  },
}

export const errorApi = {
  async reportError(errorReport: any): Promise<ApiResponse> {
    return apiClient.post('/api/errors', errorReport)
  },
}

// Utility function for handling API responses
// eslint-disable-next-line no-unused-vars
export function handleApiResponse<T>(
  response: ApiResponse<T>,
  // eslint-disable-next-line no-unused-vars
  onSuccess?: (data: T) => void,
  // eslint-disable-next-line no-unused-vars
  onError?: (error: string) => void
): void {
  if (response.success && response.data) {
    onSuccess?.(response.data)
  } else {
    const errorMessage = response.error || 'Unknown error occurred'
    console.error('API Error:', errorMessage)
    onError?.(errorMessage)
  }
}

// React hook for API calls (if you want to add React Query later)
// eslint-disable-next-line no-unused-vars
export function useApiCall<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
) {
  // This is a placeholder for future React Query integration
  // eslint-disable-next-line no-unused-vars
  const _unused = { apiCall, dependencies }; // Acknowledge parameters
  // For now, you can use this pattern in components:
  // 
  // const [data, setData] = useState<T | null>(null)
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState<string | null>(null)
  // 
  // useEffect(() => {
  //   setLoading(true)
  //   apiCall()
  //     .then(response => {
  //       if (response.success) {
  //         setData(response.data)
  //       } else {
  //         setError(response.error)
  //       }
  //     })
  //     .finally(() => setLoading(false))
  // }, dependencies)
  
  return { data: null, loading: false, error: null }
}
