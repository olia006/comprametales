import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SecondaryButton } from '../SecondaryButton'

describe('SecondaryButton', () => {
  it('renders button with text', () => {
    render(<SecondaryButton href="/test">Test Button</SecondaryButton>)
    
    const button = screen.getByRole('button', { name: /test button/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('href', '/test')
  })

  it('renders as a button element when no href provided', () => {
    const mockClick = jest.fn()
    render(<SecondaryButton onClick={mockClick}>Click Me</SecondaryButton>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const mockClick = jest.fn()
    
    render(<SecondaryButton onClick={mockClick}>Click Me</SecondaryButton>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    await user.click(button)
    
    expect(mockClick).toHaveBeenCalledTimes(1)
  })

  it('applies correct size classes', () => {
    const { rerender } = render(
      <SecondaryButton href="/test" size="lg">Large Button</SecondaryButton>
    )
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('lg')
    
    rerender(<SecondaryButton href="/test" size="sm">Small Button</SecondaryButton>)
    expect(button).toHaveClass('sm')
  })

  it('applies fullWidth class when specified', () => {
    render(<SecondaryButton href="/test" fullWidth>Full Width</SecondaryButton>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('fullWidth')
  })

  it('handles disabled state correctly', () => {
    render(<SecondaryButton disabled>Disabled Button</SecondaryButton>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled')
  })

  it('applies custom className', () => {
    render(
      <SecondaryButton href="/test" className="custom-class">
        Custom Button
      </SecondaryButton>
    )
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('handles external links correctly', () => {
    render(
      <SecondaryButton 
        href="https://example.com" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        External Link
      </SecondaryButton>
    )
    
    const button = screen.getByRole('button', { name: /external link/i })
    expect(button).toHaveAttribute('href', 'https://example.com')
    // Note: target and rel are handled by the actual component, 
    // this test verifies the href is passed correctly
  })

  it('renders with icon when provided', () => {
    const TestIcon = () => <span data-testid="test-icon">📞</span>
    
    render(
      <SecondaryButton href="/test">
        <TestIcon />
        Call Now
      </SecondaryButton>
    )
    
    expect(screen.getByText('Call Now')).toBeInTheDocument()
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })

  it('has correct default button type', () => {
    render(<SecondaryButton>Default Button</SecondaryButton>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'button')
  })

  it('supports different button types', () => {
    render(<SecondaryButton type="submit">Submit Button</SecondaryButton>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('uses medium size by default', () => {
    render(<SecondaryButton href="/test">Default Size</SecondaryButton>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('md')
  })

  it('is accessible with proper ARIA attributes', () => {
    render(<SecondaryButton href="/test">Accessible Button</SecondaryButton>)
    
    const button = screen.getByRole('button', { name: /accessible button/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAccessibleName()
  })

  it('does not render as link when disabled even with href', () => {
    render(
      <SecondaryButton href="/test" disabled>
        Disabled Link
      </SecondaryButton>
    )
    
    // Should render as button, not link when disabled
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
    
    // Should not render as link
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('combines multiple CSS classes correctly', () => {
    render(
      <SecondaryButton 
        href="/test" 
        size="lg" 
        fullWidth 
        className="custom-class"
      >
        Multi-class Button
      </SecondaryButton>
    )
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('lg')
    expect(button).toHaveClass('fullWidth')
    expect(button).toHaveClass('custom-class')
  })

  it('handles phone number links correctly', () => {
    render(<SecondaryButton href="tel:+1234567890">Call Us</SecondaryButton>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('href', 'tel:+1234567890')
  })

  it('handles email links correctly', () => {
    render(<SecondaryButton href="mailto:test@example.com">Email Us</SecondaryButton>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('href', 'mailto:test@example.com')
  })
})
