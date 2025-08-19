import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CTASection } from '../CTASection'

// Mock button components
jest.mock('@/components/buttons/PrimaryButton/PrimaryButton', () => ({
  PrimaryButton: ({ children, href, onClick }: any) => (
    <a href={href} onClick={onClick} data-testid="primary-button">
      {children}
    </a>
  ),
}), { virtual: true })

jest.mock('@/components/buttons/SecondaryButton/SecondaryButton', () => ({
  SecondaryButton: ({ children, href, onClick }: any) => (
    <a href={href} onClick={onClick} data-testid="secondary-button">
      {children}
    </a>
  ),
}), { virtual: true })

const mockActions = [
  {
    type: 'primary' as const,
    text: 'Get Started',
    href: '/get-started'
  },
  {
    type: 'secondary' as const,
    text: 'Learn More',
    href: '/learn-more'
  }
]

const defaultProps = {
  title: 'Ready to Get Started?',
  actions: mockActions
}

describe('CTASection', () => {
  it('renders title correctly', () => {
    render(<CTASection {...defaultProps} />)
    
    expect(screen.getByText('Ready to Get Started?')).toBeInTheDocument()
  })

  it('renders subtitle when provided', () => {
    render(
      <CTASection 
        {...defaultProps} 
        subtitle="Join thousands of satisfied customers" 
      />
    )
    
    expect(screen.getByText('Join thousands of satisfied customers')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    const description = 'Start selling your scrap metal today and get the best prices in the market.'
    
    render(<CTASection {...defaultProps} description={description} />)
    
    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it('renders primary and secondary buttons', () => {
    render(<CTASection {...defaultProps} />)
    
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
    
    const primaryButton = screen.getByRole('button', { name: /get started/i })
    const secondaryButton = screen.getByRole('button', { name: /learn more/i })
    
    expect(primaryButton).toBeInTheDocument()
    expect(primaryButton).toHaveAttribute('href', '/get-started')
    
    expect(secondaryButton).toBeInTheDocument()
    expect(secondaryButton).toHaveAttribute('href', '/learn-more')
  })

  it('handles click actions correctly', async () => {
    const user = userEvent.setup()
    const mockClick = jest.fn()
    
    const actionsWithClick = [
      {
        type: 'primary' as const,
        text: 'Click Me',
        onClick: mockClick
      }
    ]
    
    render(
      <CTASection 
        title="Test CTA" 
        actions={actionsWithClick} 
      />
    )
    
    const button = screen.getByRole('button', { name: /click me/i })
    await user.click(button)
    
    expect(mockClick).toHaveBeenCalledTimes(1)
  })

  it('applies correct background type class', () => {
    const { rerender } = render(
      <CTASection {...defaultProps} backgroundType="gradient" />
    )
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('gradient')
    
    rerender(<CTASection {...defaultProps} backgroundType="solid" />)
    expect(section).toHaveClass('solid')
  })

  it('applies correct alignment class', () => {
    const { rerender } = render(
      <CTASection {...defaultProps} alignment="center" />
    )
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('center')
    
    rerender(<CTASection {...defaultProps} alignment="right" />)
    expect(section).toHaveClass('right')
  })

  it('applies correct size class', () => {
    const { rerender } = render(
      <CTASection {...defaultProps} size="lg" />
    )
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('lg')
    
    rerender(<CTASection {...defaultProps} size="sm" />)
    expect(section).toHaveClass('sm')
  })

  it('applies custom className when provided', () => {
    render(<CTASection {...defaultProps} className="custom-cta" />)
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('custom-cta')
  })

  it('renders only primary buttons when only primary actions provided', () => {
    const primaryOnlyActions = [
      {
        type: 'primary' as const,
        text: 'Primary Action',
        href: '/primary'
      }
    ]
    
    render(<CTASection title="Test" actions={primaryOnlyActions} />)
    
    expect(screen.getByRole('button', { name: /primary action/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /secondary/i })).not.toBeInTheDocument()
  })

  it('renders multiple actions of the same type', () => {
    const multipleActions = [
      {
        type: 'primary' as const,
        text: 'Action 1',
        href: '/action1'
      },
      {
        type: 'primary' as const,
        text: 'Action 2',
        href: '/action2'
      }
    ]
    
    render(<CTASection title="Test" actions={multipleActions} />)
    
    const action1Button = screen.getByRole('button', { name: /action 1/i })
    const action2Button = screen.getByRole('button', { name: /action 2/i })
    
    expect(action1Button).toBeInTheDocument()
    expect(action2Button).toBeInTheDocument()
    expect(action1Button).toHaveAttribute('href', '/action1')
    expect(action2Button).toHaveAttribute('href', '/action2')
  })

  it('has proper heading structure for accessibility', () => {
    render(<CTASection {...defaultProps} />)
    
    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Ready to Get Started?')
  })

  it('renders with default props when minimal props provided', () => {
    render(<CTASection title="Minimal CTA" actions={[]} />)
    
    expect(screen.getByText('Minimal CTA')).toBeInTheDocument()
    // Should not crash with empty actions array
  })

  it('uses gradient background by default', () => {
    render(<CTASection {...defaultProps} />)
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('gradient')
  })

  it('uses center alignment by default', () => {
    render(<CTASection {...defaultProps} />)
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('center')
  })

  it('uses medium size by default', () => {
    render(<CTASection {...defaultProps} />)
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('md')
  })
})
