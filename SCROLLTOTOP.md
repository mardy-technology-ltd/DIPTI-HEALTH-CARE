# ScrollToTop Component Documentation

A modern, highly customizable "Scroll to Top" button component for Next.js applications.

## Features

✅ **Smooth Animations** - Fade in/out with Framer Motion  
✅ **Scroll Progress** - Optional circular progress indicator  
✅ **Glassmorphism Design** - Modern glass effect with gradients  
✅ **Dark Mode Support** - Automatic dark mode styling  
✅ **Performance Optimized** - Uses `requestAnimationFrame` for smooth scrolling  
✅ **Accessibility** - Full keyboard support and ARIA labels  
✅ **Responsive** - Works on all screen sizes  
✅ **TypeScript** - Full type safety  
✅ **Customizable** - Multiple props for customization
✅ **Zero External Icon Dependencies** - Custom SVG icon built-in

## Installation

The component is already added to `layout.tsx` and will appear on all pages.

Dependencies required:
```bash
npm install framer-motion
```

**Note:** This component uses a custom SVG arrow icon, so no icon library is needed!

## Basic Usage

```tsx
import ScrollToTop from '@/components/ScrollToTop';

// Simple usage (already in layout.tsx)
<ScrollToTop />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `threshold` | `number` | `300` | Scroll distance (px) before button appears |
| `position` | `'bottom-right' \| 'bottom-left' \| 'bottom-center'` | `'bottom-right'` | Button position on screen |
| `showProgress` | `boolean` | `false` | Show circular scroll progress indicator |
| `className` | `string` | `undefined` | Additional Tailwind classes |
| `behavior` | `'smooth' \| 'auto'` | `'smooth'` | Scroll behavior when clicking |

## Examples

### Default (Current Implementation)
```tsx
<ScrollToTop showProgress={true} />
```

### Left Position
```tsx
<ScrollToTop position="bottom-left" />
```

### Center Position with Custom Threshold
```tsx
<ScrollToTop 
  position="bottom-center" 
  threshold={500}
/>
```

### Without Progress Indicator
```tsx
<ScrollToTop showProgress={false} />
```

### Custom Styling
```tsx
<ScrollToTop 
  showProgress={true}
  className="bottom-16 right-16 md:bottom-8 md:right-8"
/>
```

### Instant Scroll (No Animation)
```tsx
<ScrollToTop behavior="auto" />
```

## Styling Customization

The component uses Tailwind CSS and can be customized via the `className` prop:

```tsx
// Change colors (override gradients)
<ScrollToTop 
  className="[&_button]:bg-gradient-to-br [&_button]:from-purple-500 [&_button]:to-pink-600"
/>

// Larger button
<ScrollToTop 
  className="[&_button]:w-16 [&_button]:h-16"
/>

// Different position on mobile
<ScrollToTop 
  className="bottom-4 right-4 md:bottom-8 md:right-8"
/>
```

## Features Breakdown

### 1. Smooth Animations
- Fade in/out with scale effect
- Hover scale and rotate
- Tap feedback animation
- Continuous arrow bounce

### 2. Scroll Progress Ring
When `showProgress={true}`:
- Circular progress ring around button
- Shows exact scroll position (0-100%)
- Smooth animated updates

### 3. Glassmorphism Effect
- Gradient background (teal to cyan)
- Semi-transparent overlay
- Backdrop blur
- Animated glow on hover

### 4. Dark Mode
Automatically adapts to system/app dark mode:
- Darker gradient in dark mode
- Adjusted shadow colors
- Tooltip styling changes

### 5. Accessibility
- `aria-label` for screen readers
- Keyboard navigation (Enter/Space)
- Proper focus states
- Tab index support

### 6. Performance
- `requestAnimationFrame` for scroll handling
- Passive scroll listeners
- Debounced calculations
- Optimized re-renders

## How It Works

1. **Scroll Detection**: Listens to scroll events with optimized listener
2. **Threshold Check**: Shows button when scrolled past threshold (default: 300px)
3. **Progress Calculation**: Updates circular progress based on scroll position
4. **Smooth Scroll**: Uses native `scrollTo` API with smooth behavior
5. **Animation**: Framer Motion handles all entrance/exit animations

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Troubleshooting

### Button not appearing?
- Check if page has enough content to scroll
- Verify `threshold` prop isn't too high
- Ensure component is rendered in layout/page

### Scroll not smooth?
- Check browser support for `scroll-behavior: smooth`
- Verify `behavior="smooth"` prop is set
- Some browsers may need polyfill

### Dark mode not working?
- Ensure your app has dark mode setup in Tailwind
- Check `html` or `body` has `dark` class

## Performance Tips

1. **Don't add multiple instances** - One per layout is enough
2. **Adjust threshold** - Higher threshold = better performance
3. **Disable progress** - `showProgress={false}` for slight performance gain
4. **Use on long pages** - Not needed for short, non-scrolling pages

## Customization Ideas

### Different Icon
The component uses a custom SVG arrow icon. To customize it, edit the `ArrowUpIcon` component in `ScrollToTop.tsx`:
```tsx
// Change the SVG path to create a different arrow style
const ArrowUpIcon = () => (
  <svg>
    <path d="M12 19V5M5 12l7-7 7 7" /> {/* Modify this path */}
  </svg>
);
```

Or replace it with any other SVG icon you prefer.

### Multiple Buttons
Add to specific pages instead of layout:
```tsx
// app/blog/page.tsx
export default function BlogPage() {
  return (
    <>
      {/* content */}
      <ScrollToTop position="bottom-right" />
    </>
  );
}
```

### Custom Colors Per Page
Use className prop per page:
```tsx
// Red theme for special page
<ScrollToTop className="[&_button]:from-red-500 [&_button]:to-orange-600" />
```

## Component Structure

```
ScrollToTop
├── Motion Wrapper (AnimatePresence)
│   └── Motion Div (entrance/exit animations)
│       └── Motion Button (hover/tap animations)
│           ├── Glassmorphism Overlay
│           ├── Hover Glow Effect
│           ├── Progress Ring (optional)
│           ├── Arrow Icon (custom SVG, animated)
│           ├── Ripple Effect (tap)
│           └── Tooltip (hover)
```

## Credits

- **Icons**: Custom SVG (no external dependencies)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## License

MIT - Part of Dipti Health Care project
