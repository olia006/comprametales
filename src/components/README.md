# 📚 Component Documentation

## 🏗️ **Architecture Overview**

This project follows **Atomic Design** principles with a clear component hierarchy:

```text
src/components/
├── buttons/          # Atomic components - Primary, Secondary buttons
├── composition/      # Organism components - Complex sections
├── content/          # Molecule components - Content-specific elements
├── layout/           # Template components - Page structure
├── sections/         # Organism components - Page sections
├── seo/             # Utility components - SEO and metadata
└── ui/              # Atomic/Molecule components - UI elements
```

---

## 🎨 **Design System**

### **Colors**

- **Primary**: `var(--color-primary)` - Blue (#1e88e5)
- **Secondary**: `var(--color-secondary)` - Green (#4caf50)
- **Brand Guidelines**: Only use these two colors [[memory:6119310]]
- **No border-radius**: Square corners site-wide [[memory:6119322]]

### **Typography**

- **Font**: Inter (system font)
- **Sizes**: Defined in `src/styles/variables.css`
- **Weights**: normal, medium, semibold, bold, extrabold

### **Spacing**

- **System**: `var(--space-1)` through `var(--space-24)`
- **Based on**: 4px base unit (space-1 = 4px, space-2 = 8px, etc.)

---

## 🧩 **Core Components**

### **Layout Components**

#### `Layout` - Main page wrapper

```tsx
<Layout className="optional-class">
  {children}
</Layout>
```

- **Purpose**: Provides consistent page structure
- **Includes**: Header, Footer, FloatingButtons
- **Usage**: Wrap all pages

#### `Header` - Site navigation

- **Features**: Logo, navigation, mobile menu
- **Responsive**: Desktop nav + mobile hamburger
- **Glassmorphic**: Dark gradient background

#### `Footer` - Site footer

- **Sections**: Company info, services, contact, trust signals
- **Minimalistic**: Clean design without decorative elements
- **SEO**: Structured data for business info

---

### **Section Components**

#### `HeroSection` - Homepage hero

```tsx
<HeroSection />
```

- **Features**: Background image, CTA buttons, business info
- **Performance**: Priority image loading
- **CTA**: Direct WhatsApp link for immediate action

#### `PreviewSection` - Content previews

```tsx
<PreviewSection
  id="unique-id"
  title="Section Title"
  subtitle="Section Subtitle"
  description="Section description"
  href="/target-page"
  backgroundType="transparent|gradient|solid"
  topPrices={pricesArray} // Optional
/>
```

- **Purpose**: Homepage section previews
- **Variants**: Prices, materials, about, contact
- **Performance**: Lazy loaded below-fold

#### `PageHero` - Internal page headers

```tsx
<PageHero
  title="Page Title"
  subtitle="Page Subtitle"
  description="Page description"
  backgroundImage="/path/to/image.jpg"
/>
```

- **Purpose**: Consistent page headers
- **Features**: Background image, text overlay
- **Accessibility**: Proper contrast and shadows

---

### **UI Components**

#### `LazySection` - Performance optimization

```tsx
<LazySection 
  threshold={0.1} 
  rootMargin="50px"
  skeletonVariant="previewSection|materialCard|priceCard|ctaSection"
>
  <YourComponent />
</LazySection>
```

- **Purpose**: Lazy load below-fold content
- **Features**: Intersection Observer, skeleton screens
- **Performance**: Improves Core Web Vitals and perceived performance

#### `SkeletonLoader` - Loading states

```tsx
<SkeletonLoader 
  variant="previewSection|materialCard|priceCard|ctaSection"
  count={1}
/>
```

- **Purpose**: Provide realistic loading placeholders
- **Features**: Shimmer animation, multiple variants
- **UX**: Better perceived performance than spinners

#### `FloatingButtons` - Quick actions

```tsx
<FloatingButtons />
```

- **Features**: WhatsApp and directions buttons
- **Design**: Circular, solid colors, glass-like borders
- **Position**: Fixed bottom-right

#### `BackToTop` - Page navigation

```tsx
<BackToTop />
```

- **Design**: Expanding circular button
- **Animation**: Arrow moves up on hover
- **Colors**: Brand colors instead of purple

---

### **Button Components**

#### `PrimaryButton` - Main actions

```tsx
<PrimaryButton 
  href="/path" 
  size="sm|md|lg"
  target="_blank" // Optional
  rel="noopener noreferrer" // Optional
>
  Button Text
  <Icon /> // Optional
</PrimaryButton>
```

- **Design**: Primary brand color background
- **Usage**: Main CTAs, important actions

#### `SecondaryButton` - Secondary actions

```tsx
<SecondaryButton 
  href="/path" 
  size="sm|md|lg"
>
  <Icon /> // Optional
  Button Text
</SecondaryButton>
```

- **Design**: White text on transparent/dark background
- **Usage**: Secondary actions, phone calls

---

## 🎯 **SEO Components**

### `SEOHead` - Page metadata

```tsx
<SEOHead 
  title="Page Title"
  description="Page description"
  canonical="https://konstander.cl/page"
  keywords="optional, keywords" // Optional
  ogImage="/path/to/image.jpg" // Optional
/>
```

- **Features**: Complete meta tags, structured data
- **Includes**: Open Graph, Twitter Cards, business schema
- **Localization**: Chilean market optimization

---

## 📊 **Analytics Components**

### `WebVitals` - Performance monitoring

```tsx
<WebVitals debug={process.env.NODE_ENV === 'development'} />
```

- **Purpose**: Monitor Core Web Vitals performance metrics
- **Features**: Automatic tracking of CLS, INP, FCP, LCP, TTFB
- **Integration**: Google Analytics 4 and custom API endpoint
- **Alerts**: Console warnings for poor performance scores

### **Core Web Vitals Tracked**

- **CLS (Cumulative Layout Shift)**: Visual stability
- **INP (Interaction to Next Paint)**: Interactivity responsiveness (replaced FID)
- **FCP (First Contentful Paint)**: Loading performance
- **LCP (Largest Contentful Paint)**: Loading performance
- **TTFB (Time to First Byte)**: Server response time

### **Performance Thresholds**

- **Good**: Green scores (CLS ≤ 0.1, INP ≤ 200ms, LCP ≤ 2.5s)
- **Needs Improvement**: Yellow scores (moderate performance)
- **Poor**: Red scores (requires optimization)

---

## 📱 **Responsive Design**

### **Breakpoints**

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1200px
- **Large Desktop**: > 1200px

### **Mobile-First Approach**

- All components start with mobile styles
- Progressive enhancement for larger screens
- Touch-friendly interactions

---

## ⚡ **Performance Guidelines**

### **Image Optimization**

- Use Next.js `Image` component
- WebP format preferred
- Proper `sizes` attribute
- `priority` for above-fold images

### **Lazy Loading**

- Wrap below-fold sections in `LazySection`
- Use Intersection Observer
- Provide loading states

### **CSS Best Practices**

- No `!important` declarations [[memory:4986510]]
- No inline styles [[memory:4986507]]
- Use CSS variables for consistency
- Mobile-first responsive design

---

## 🔧 **Development Guidelines**

### **Component Structure**

```text
ComponentName/
├── ComponentName.tsx      # Component logic
├── ComponentName.module.css  # Component styles
└── index.ts              # Export (optional)
```

### **TypeScript**

- Use proper interfaces for props
- Export prop types for reusability
- Strict type checking enabled

### **Styling**

- CSS Modules for component styles
- CSS Variables for design tokens
- No hardcoded values [[memory:3090268]]

---

## 🚀 **Usage Examples**

### **Homepage Structure**

```tsx
<Layout>
  <SEOHead {...seoProps} />
  <HeroSection />
  <PreviewSection {...pricesProps} />
  <LazySection>
    <PreviewSection {...materialsProps} />
  </LazySection>
  <LazySection>
    <CTASection {...ctaProps} />
  </LazySection>
  <BackToTop />
</Layout>
```

### **Internal Page Structure**

```tsx
<Layout>
  <SEOHead {...seoProps} />
  <PageHero {...heroProps} />
  <YourPageContent />
  <CTASection {...ctaProps} />
  <BackToTop />
</Layout>
```

---

## 📞 **Support**

For questions about components or implementation:

1. Check this documentation first
2. Review existing component usage
3. Follow established patterns
4. Maintain brand consistency [[memory:4887423]]

---

**Last Updated**: January 2025
**Version**: 1.0.0
