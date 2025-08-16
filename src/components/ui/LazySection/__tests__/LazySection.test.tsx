import { render, screen } from '@testing-library/react'
import { LazySection } from '../LazySection'

// Mock Intersection Observer
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})
window.IntersectionObserver = mockIntersectionObserver

describe('LazySection', () => {
  beforeEach(() => {
    mockIntersectionObserver.mockClear()
  })

  it('renders skeleton initially', () => {
    render(
      <LazySection skeletonVariant="previewSection">
        <div data-testid="content">Lazy Content</div>
      </LazySection>
    )

    // Should show skeleton initially
    expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument()
    expect(screen.queryByTestId('content')).not.toBeInTheDocument()
  })

  it('sets up intersection observer', () => {
    render(
      <LazySection skeletonVariant="previewSection">
        <div>Content</div>
      </LazySection>
    )

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        threshold: 0.1,
        rootMargin: '50px',
      })
    )
  })

  it('uses custom threshold and rootMargin', () => {
    render(
      <LazySection 
        skeletonVariant="previewSection" 
        threshold={0.5} 
        rootMargin="100px"
      >
        <div>Content</div>
      </LazySection>
    )

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        threshold: 0.5,
        rootMargin: '100px',
      })
    )
  })

  it('renders different skeleton variants', () => {
    const { rerender } = render(
      <LazySection skeletonVariant="materialCard">
        <div>Content</div>
      </LazySection>
    )

    expect(screen.getByTestId('skeleton-loader')).toHaveAttribute(
      'data-variant',
      'materialCard'
    )

    rerender(
      <LazySection skeletonVariant="priceCard">
        <div>Content</div>
      </LazySection>
    )

    expect(screen.getByTestId('skeleton-loader')).toHaveAttribute(
      'data-variant',
      'priceCard'
    )
  })
})
