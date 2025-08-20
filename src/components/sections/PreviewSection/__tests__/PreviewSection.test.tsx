import { render, screen } from '@testing-library/react'
import { PreviewSection } from '../PreviewSection'
import { MaterialPrice } from '@/config/pricing'

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}))

// Mock ReadMoreButton component
jest.mock('@/components/buttons/ReadMoreButton/ReadMoreButton', () => ({
  ReadMoreButton: ({ href, text }: any) => (
    <a href={href} data-testid="read-more-button" role="button">
      {text || 'Ver Más Detalles'}
    </a>
  ),
}), { virtual: true })

const mockMaterialPrices: MaterialPrice[] = [
  {
    name: 'Copper Grade 3',
    nameEs: 'Cobre 3ra',
    pricePerKg: 7000,
    currency: 'CLP',
    category: 'no-ferrosos',
    lastUpdated: '2025-01-01'
  },
  {
    name: 'Iron Short',
    nameEs: 'Fierro Corto',
    pricePerKg: 230,
    currency: 'CLP',
    category: 'ferrosos',
    lastUpdated: '2025-01-01'
  }
]

const defaultProps = {
  id: 'test-section',
  title: 'Test Section',
  subtitle: 'Test Subtitle',
  description: 'This is a test description for the preview section.',
  href: '/test-page'
}

describe('PreviewSection', () => {
  it('renders basic content correctly', () => {
    render(<PreviewSection {...defaultProps} />)
    
    expect(screen.getByText('Test Section')).toBeInTheDocument()
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
    expect(screen.getByText('This is a test description for the preview section.')).toBeInTheDocument()
  })

  it('renders ReadMore button with correct href', () => {
    render(<PreviewSection {...defaultProps} />)
    
    // Look for the ReadMore button (it has role="button", not "link")
    const readMoreButton = screen.getByRole('button', { name: /más detalles/i })
    expect(readMoreButton).toBeInTheDocument()
    expect(readMoreButton).toHaveAttribute('href', '/test-page')
  })

  it('displays price table when topPrices are provided', () => {
    render(<PreviewSection {...defaultProps} topPrices={mockMaterialPrices} />)
    
    // Check for price table heading
    expect(screen.getByText(/precios destacados/i)).toBeInTheDocument()
    
    // Check for material names
    expect(screen.getByText('Cobre 3ra')).toBeInTheDocument()
    expect(screen.getByText('Fierro Corto')).toBeInTheDocument()
  })

  it('formats prices correctly in price table', () => {
    render(<PreviewSection {...defaultProps} topPrices={mockMaterialPrices} />)
    
    // Check for formatted prices (Chilean peso format)
    expect(screen.getByText(/\$7\.000/)).toBeInTheDocument()
    expect(screen.getByText(/\$230/)).toBeInTheDocument()
  })

  it('does not render price table when topPrices are not provided', () => {
    render(<PreviewSection {...defaultProps} />)
    
    expect(screen.queryByText(/precios destacados/i)).not.toBeInTheDocument()
  })

  it('applies correct background type class', () => {
    const { rerender } = render(
      <PreviewSection {...defaultProps} backgroundType="gradient" />
    )
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('gradient')
    
    rerender(<PreviewSection {...defaultProps} backgroundType="solid" />)
    expect(section).toHaveClass('solid')
  })

  it('applies custom className when provided', () => {
    render(<PreviewSection {...defaultProps} className="custom-class" />)
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('custom-class')
  })

  it('has correct section id', () => {
    render(<PreviewSection {...defaultProps} id="unique-section-id" />)
    
    const section = document.querySelector('#unique-section-id')
    expect(section).toBeInTheDocument()
  })

  it('renders "Precios actualizados diariamente" note when prices are shown', () => {
    render(<PreviewSection {...defaultProps} topPrices={mockMaterialPrices} />)
    
    expect(screen.getByText(/precios actualizados diariamente/i)).toBeInTheDocument()
  })

  it('handles empty topPrices array', () => {
    render(<PreviewSection {...defaultProps} topPrices={[]} />)
    
    // Price table header may still exist but without prices
    // This test should check that no price data is shown
    const priceElements = screen.queryAllByText(/\$/)
    expect(priceElements.length).toBe(0)
  })

  it('is accessible with proper heading structure', () => {
    render(<PreviewSection {...defaultProps} />)
    
    const heading = screen.getByRole('heading', { name: /test section/i })
    expect(heading).toBeInTheDocument()
    
    // Should have section element
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders with transparent background by default', () => {
    render(<PreviewSection {...defaultProps} />)
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('transparent')
  })
})
