/**
 * ScrollToTop Component - Usage Examples
 * 
 * This file contains example implementations of the ScrollToTop component
 * for different use cases. Copy these examples to your pages as needed.
 */

import ScrollToTop from '@/components/ScrollToTop';

// ============================================================================
// EXAMPLE 1: Basic Implementation (Current in layout.tsx)
// ============================================================================
export function BasicScrollToTop() {
  return <ScrollToTop />;
}

// ============================================================================
// EXAMPLE 2: With Progress Indicator (Recommended)
// ============================================================================
export function ScrollToTopWithProgress() {
  return <ScrollToTop showProgress={true} />;
}

// ============================================================================
// EXAMPLE 3: Left Position
// ============================================================================
export function ScrollToTopLeft() {
  return <ScrollToTop position="bottom-left" showProgress={true} />;
}

// ============================================================================
// EXAMPLE 4: Center Position (Mobile-friendly)
// ============================================================================
export function ScrollToTopCenter() {
  return <ScrollToTop position="bottom-center" showProgress={false} />;
}

// ============================================================================
// EXAMPLE 5: Custom Threshold (Appears after 500px scroll)
// ============================================================================
export function ScrollToTopLateAppearance() {
  return <ScrollToTop threshold={500} showProgress={true} />;
}

// ============================================================================
// EXAMPLE 6: Early Appearance (Appears after 100px scroll)
// ============================================================================
export function ScrollToTopEarlyAppearance() {
  return <ScrollToTop threshold={100} showProgress={false} />;
}

// ============================================================================
// EXAMPLE 7: Custom Position with Tailwind
// ============================================================================
export function ScrollToTopCustomPosition() {
  return (
    <ScrollToTop
      showProgress={true}
      className="bottom-20 right-4 md:bottom-8 md:right-8"
    />
  );
}

// ============================================================================
// EXAMPLE 8: Instant Scroll (No Smooth Animation)
// ============================================================================
export function ScrollToTopInstant() {
  return <ScrollToTop behavior="auto" showProgress={false} />;
}

// ============================================================================
// EXAMPLE 9: For Blog Pages Only
// ============================================================================
export function BlogPageWithScrollToTop() {
  return (
    <div className="min-h-screen">
      {/* Your blog content */}
      <article className="prose">
        <h1>Blog Post Title</h1>
        {/* Long content here */}
      </article>

      {/* Scroll to top button - only on this page */}
      <ScrollToTop showProgress={true} threshold={400} />
    </div>
  );
}

// ============================================================================
// EXAMPLE 10: Multiple Buttons (Different Positions)
// Use this if you need buttons in multiple positions
// ============================================================================
export function MultipleScrollButtons() {
  return (
    <>
      {/* Main button - bottom right with progress */}
      <ScrollToTop
        position="bottom-right"
        showProgress={true}
        threshold={300}
      />

      {/* Secondary button - bottom left, no progress */}
      <ScrollToTop
        position="bottom-left"
        showProgress={false}
        threshold={500}
        className="[&_button]:from-purple-500 [&_button]:to-pink-600"
      />
    </>
  );
}

// ============================================================================
// EXAMPLE 11: Custom Styled Button (Purple Theme)
// ============================================================================
export function ScrollToTopPurpleTheme() {
  return (
    <ScrollToTop
      showProgress={true}
      className="[&_button]:from-purple-500 [&_button]:to-pink-600 [&_button]:hover:shadow-purple-500/50"
    />
  );
}

// ============================================================================
// EXAMPLE 12: Custom Styled Button (Red Theme)
// ============================================================================
export function ScrollToTopRedTheme() {
  return (
    <ScrollToTop
      showProgress={false}
      className="[&_button]:from-red-500 [&_button]:to-orange-600 [&_button]:hover:shadow-red-500/50"
    />
  );
}

// ============================================================================
// EXAMPLE 13: Larger Button
// ============================================================================
export function ScrollToTopLarge() {
  return (
    <ScrollToTop
      showProgress={true}
      className="[&_button]:w-16 [&_button]:h-16 [&_svg]:w-7 [&_svg]:h-7"
    />
  );
}

// ============================================================================
// EXAMPLE 14: Smaller Button (Mobile Optimized)
// ============================================================================
export function ScrollToTopSmall() {
  return (
    <ScrollToTop
      showProgress={false}
      className="[&_button]:w-12 [&_button]:h-12 [&_svg]:w-5 [&_svg]:h-5"
    />
  );
}

// ============================================================================
// EXAMPLE 15: Responsive Sizes
// ============================================================================
export function ScrollToTopResponsive() {
  return (
    <ScrollToTop
      showProgress={true}
      className="[&_button]:w-12 [&_button]:h-12 md:[&_button]:w-14 md:[&_button]:h-14 bottom-4 right-4 md:bottom-8 md:right-8"
    />
  );
}

// ============================================================================
// HOW TO USE IN YOUR PAGES
// ============================================================================

/**
 * Option 1: Global (Current Implementation)
 * Add to app/layout.tsx (already done)
 * Appears on all pages
 */

/**
 * Option 2: Page-Specific
 * Add to individual pages:
 * 
 * // app/blog/page.tsx
 * export default function BlogPage() {
 *   return (
 *     <div>
 *       <h1>Blog</h1>
 *       {/* content *\/}
 *       <ScrollToTop showProgress={true} />
 *     </div>
 *   );
 * }
 */

/**
 * Option 3: Conditional Rendering
 * Show only on specific conditions:
 * 
 * export default function ConditionalScrollToTop() {
 *   const [showButton, setShowButton] = useState(true);
 *   
 *   return showButton ? <ScrollToTop /> : null;
 * }
 */

/**
 * Option 4: With Route Detection
 * Different styles per route:
 * 
 * 'use client';
 * import { usePathname } from 'next/navigation';
 * 
 * export default function RouteBasedScrollToTop() {
 *   const pathname = usePathname();
 *   
 *   if (pathname.startsWith('/blog')) {
 *     return <ScrollToTop showProgress={true} position="bottom-right" />;
 *   }
 *   
 *   if (pathname === '/admin') {
 *     return <ScrollToTop showProgress={false} position="bottom-left" />;
 *   }
 *   
 *   return <ScrollToTop />;
 * }
 */
