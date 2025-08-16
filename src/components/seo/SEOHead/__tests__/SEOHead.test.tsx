import { render } from '@testing-library/react'
import { SEOHead } from '../SEOHead'

// Mock Next.js Head component
jest.mock('next/head', () => {
  return function Head({ children }: { children: React.ReactNode }) {
    return <div data-testid="head">{children}</div>
  }
})

describe('SEOHead', () => {
  const defaultProps = {
    title: 'Test Page Title',
    description: 'Test page description',
    canonical: 'https://konstander.cl/test',
  }

  it('renders basic meta tags', () => {
    const { container } = render(<SEOHead {...defaultProps} />)
    
    expect(container.querySelector('title')).toHaveTextContent('Test Page Title')
    expect(container.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'Test page description'
    )
    expect(container.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://konstander.cl/test'
    )
  })

  it('renders Open Graph meta tags', () => {
    const { container } = render(<SEOHead {...defaultProps} />)
    
    expect(container.querySelector('meta[property="og:title"]')).toHaveAttribute(
      'content',
      'Test Page Title'
    )
    expect(container.querySelector('meta[property="og:description"]')).toHaveAttribute(
      'content',
      'Test page description'
    )
    expect(container.querySelector('meta[property="og:url"]')).toHaveAttribute(
      'content',
      'https://konstander.cl/test'
    )
  })

  it('renders Twitter Card meta tags', () => {
    const { container } = render(<SEOHead {...defaultProps} />)
    
    expect(container.querySelector('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image'
    )
    expect(container.querySelector('meta[name="twitter:title"]')).toHaveAttribute(
      'content',
      'Test Page Title'
    )
  })

  it('handles custom keywords', () => {
    const { container } = render(
      <SEOHead {...defaultProps} keywords="custom, keywords, test" />
    )
    
    expect(container.querySelector('meta[name="keywords"]')).toHaveAttribute(
      'content',
      'custom, keywords, test'
    )
  })

  it('handles noIndex correctly', () => {
    const { container } = render(<SEOHead {...defaultProps} noIndex={true} />)
    
    expect(container.querySelector('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow'
    )
  })

  it('renders structured data script', () => {
    const { container } = render(<SEOHead {...defaultProps} />)
    
    const structuredDataScript = container.querySelector('script[type="application/ld+json"]')
    expect(structuredDataScript).toBeInTheDocument()
    
    const structuredData = JSON.parse(structuredDataScript?.textContent || '{}')
    expect(structuredData['@type']).toBe('LocalBusiness')
    expect(structuredData.name).toBe('KONSTANDER')
  })
})
