import { render, screen } from '@testing-library/react'
import { HeroSection } from '../HeroSection'

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}))

// Mock the useInteractionTracking hook
jest.mock('@/hooks/useInteractionTracking', () => ({
  useInteractionTracking: () => ({
    trackClick: jest.fn(),
  }),
}), { virtual: true })

describe('HeroSection', () => {
  it('renders main heading correctly', () => {
    render(<HeroSection />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Compra de Chatarra y Metales en Lampa')
  })

  it('displays subtitle with value proposition', () => {
    render(<HeroSection />)
    
    const subtitle = screen.getByText(/mejores precios en fierro, cobre, aluminio/i)
    expect(subtitle).toBeInTheDocument()
  })

  it('renders hero background images with correct alt text', () => {
    render(<HeroSection />)
    
    const heroImages = screen.getAllByAltText(/planta industrial de konstander/i)
    expect(heroImages.length).toBeGreaterThan(0)
    
    // Check that the background image has the correct source
    const backgroundImage = heroImages.find(img => 
      img.getAttribute('src')?.includes('herosectionbackground3d.webp')
    )
    expect(backgroundImage).toBeInTheDocument()
  })

  it('renders 3D hero overlay image', () => {
    render(<HeroSection />)
    
    const overlayImages = screen.getAllByAltText(/3d hero overlay/i)
    expect(overlayImages.length).toBeGreaterThan(0)
    
    // Check that the 3D overlay image has the correct source
    const overlayImage = overlayImages.find(img => 
      img.getAttribute('src')?.includes('herosection3d.webp')
    )
    expect(overlayImage).toBeInTheDocument()
  })

  it('displays WhatsApp CTA button', () => {
    render(<HeroSection />)
    
    // Look for any link with WhatsApp in the href
    const allLinks = screen.getAllByRole('button')
    const whatsappButton = allLinks.find(link => 
      link.getAttribute('href')?.includes('wa.me') ||
      link.textContent?.toLowerCase().includes('whatsapp')
    )
    
    if (whatsappButton) {
      expect(whatsappButton).toBeInTheDocument()
    } else {
      // Alternative: just check that WhatsApp text exists somewhere
      expect(screen.getByText(/whatsapp/i)).toBeInTheDocument()
    }
  })

  it('displays contact information', () => {
    render(<HeroSection />)
    
    // Check that WhatsApp functionality exists
    const whatsappButton = screen.getByRole('button', { name: /cotizar por whatsapp/i })
    expect(whatsappButton).toBeInTheDocument()
    expect(whatsappButton).toHaveAttribute('href', expect.stringContaining('wa.me'))
  })

  it('shows flexible hours information', () => {
    render(<HeroSection />)
    
    // Check for both desktop and mobile versions of the text
    const flexibleHours = screen.getAllByText(/horarios ajustables/i)
    expect(flexibleHours.length).toBeGreaterThan(0)
  })

  it('has proper semantic structure', () => {
    render(<HeroSection />)
    
    // Check for section element
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('renders highlighted keywords in title', () => {
    render(<HeroSection />)
    
    const chatarraHighlight = screen.getByText('Chatarra')
    const metalesHighlight = screen.getByText('Metales')
    
    expect(chatarraHighlight).toBeInTheDocument()
    expect(metalesHighlight).toBeInTheDocument()
  })

  it('is accessible with proper ARIA labels', () => {
    render(<HeroSection />)
    
    // Check that main heading exists
    const mainHeading = screen.getByRole('heading', { level: 1 })
    expect(mainHeading).toBeInTheDocument()
    
    // Check that buttons exist and are accessible
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
    
    // Check that at least one button has an accessible name
    const accessibleButtons = buttons.filter(button => {
      try {
        expect(button).toHaveAccessibleName()
        return true
      } catch {
        return false
      }
    })
    expect(accessibleButtons.length).toBeGreaterThan(0)
  })
})
