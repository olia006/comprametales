import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import { PrimaryButton } from '../PrimaryButton'

describe('PrimaryButton', () => {
  it('renders button with text', () => {
    render(<PrimaryButton href="/test">Test Button</PrimaryButton>)
    
    const button = screen.getByRole('link', { name: /test button/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('href', '/test')
  })

  it('applies correct size classes', () => {
    render(<PrimaryButton href="/test" size="lg">Large Button</PrimaryButton>)
    
    const button = screen.getByRole('link', { name: /large button/i })
    expect(button).toHaveClass('primaryButton', 'large')
  })

  it('handles external links correctly', () => {
    render(
      <PrimaryButton 
        href="https://example.com" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        External Link
      </PrimaryButton>
    )
    
    const button = screen.getByRole('link', { name: /external link/i })
    expect(button).toHaveAttribute('target', '_blank')
    expect(button).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders with icon', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>
    
    render(
      <PrimaryButton href="/test">
        Button Text
        <TestIcon />
      </PrimaryButton>
    )
    
    expect(screen.getByText('Button Text')).toBeInTheDocument()
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })

  it('is accessible', () => {
    render(<PrimaryButton href="/test">Accessible Button</PrimaryButton>)
    
    const button = screen.getByRole('link', { name: /accessible button/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('href', '/test')
  })
})
