'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Arrow Up SVG Icon
const ArrowUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

interface ScrollToTopProps {
  /** Scroll threshold in pixels before button appears */
  threshold?: number;
  /** Position of the button */
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  /** Show scroll progress indicator */
  showProgress?: boolean;
  /** Custom colors */
  className?: string;
  /** Scroll behavior */
  behavior?: ScrollBehavior;
}

export default function ScrollToTop({
  threshold = 300,
  position = 'bottom-right',
  showProgress = false,
  className,
  behavior = 'smooth',
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Optimized scroll handler using requestAnimationFrame
  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      const scrolled = window.scrollY;
      const shouldShow = scrolled > threshold;
      
      setIsVisible(shouldShow);

      if (showProgress) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrolled / windowHeight) * 100;
        const clampedProgress = Math.min(progress, 100);
        setScrollProgress(clampedProgress);
        
        // Debug log
        if (shouldShow && Math.random() < 0.05) { // Log only 5% of the time to avoid spam
          console.log('📈 Scroll Progress:', {
            scrolled,
            windowHeight,
            progress: clampedProgress.toFixed(1) + '%',
            strokeDashoffset: (283 - (clampedProgress / 100) * 283).toFixed(1)
          });
        }
      }
    });
  }, [threshold, showProgress]);

  useEffect(() => {
    // Passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior,
    });
  };

  // Handle keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  };

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'bottom-center': 'bottom-8 left-1/2 -translate-x-1/2',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`fixed ${positionClasses[position]} z-50 ${className || ''}`}
        >
          <motion.button
            onClick={scrollToTop}
            onKeyDown={handleKeyDown}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="group relative w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 dark:from-teal-600 dark:to-cyan-700 text-white shadow-lg hover:shadow-2xl hover:shadow-teal-500/50 dark:hover:shadow-teal-600/50 transition-shadow duration-300 overflow-hidden backdrop-blur-sm"
            aria-label="Scroll to top"
            tabIndex={0}
          >
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-sm" />
            
            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />

            {/* Scroll Progress Ring (optional) */}
            {showProgress && (
              <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 100 100"
              >
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-white/20 dark:text-white/10"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="text-white drop-shadow-sm"
                  style={{
                    strokeDasharray: 283,
                  }}
                  initial={{
                    strokeDashoffset: 283, // Start with empty circle
                  }}
                  animate={{
                    strokeDashoffset: 283 - (scrollProgress / 100) * 283,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                />
              </svg>
            )}

            {/* Arrow Icon */}
            <motion.div
              className="relative z-10 flex items-center justify-center w-full h-full"
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <ArrowUpIcon />
            </motion.div>

            {/* Ripple effect on tap */}
            <motion.div
              className="absolute inset-0 rounded-full bg-white/30"
              initial={{ scale: 0, opacity: 0.5 }}
              whileTap={{
                scale: 2.5,
                opacity: 0,
                transition: { duration: 0.6 },
              }}
            />
          </motion.button>

          {/* Tooltip on hover (optional) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-xs font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          >
            Back to top
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-800 rotate-45" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
