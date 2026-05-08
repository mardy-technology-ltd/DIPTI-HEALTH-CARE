'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Home',       id: 'home' },
  { label: 'Experience', id: 'experience' },
  { label: 'Story',      id: 'story' },
  { label: 'Blog',       id: 'blog' },
  { label: 'Contact',    id: 'contact' },
];

// Hamburger Menu Icon Component
const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="w-6 h-5 flex flex-col justify-between cursor-pointer">
    <motion.span
      animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-0.5 bg-slate-800 rounded-full"
    />
    <motion.span
      animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="w-full h-0.5 bg-slate-800 rounded-full"
    />
    <motion.span
      animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-0.5 bg-slate-800 rounded-full"
    />
  </div>
);

// Menu Icons
const menuIcons: Record<string, JSX.Element> = {
  home: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  ),
  experience: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  story: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  blog: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  ),
  contact: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
};

function scrollTo(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Remove hash from URL to keep it clean
    window.history.replaceState(null, '', '/');
  }
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Only track sections on home page
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' } // Top 20% of viewport triggers active
    );

    // Observe all sections
    links.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  const handleClick = (id: string) => {
    setIsMobileMenuOpen(false); // Close mobile menu
    if (pathname === '/') {
      scrollTo(id);
    } else {
      // Navigate to home with hash, home page will handle scrolling and cleanup
      router.push(`/#${id}`);
    }
  };

  const handleLogoClick = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-lg border-b border-slate-100 shadow-sm py-4">
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <motion.button
            onClick={handleLogoClick}
            className="text-2xl font-extrabold text-slate-800 tracking-tight cursor-pointer group relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="inline-block">Dipti</span>
            <span className="text-teal-600 inline-block">.Care</span>
            
            {/* Underline Draw Effect */}
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-teal-600"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            />
            
            {/* Hover Glow */}
            <motion.div
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(circle, rgba(20, 184, 166, 0.1) 0%, transparent 70%)',
              }}
            />
          </motion.button>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-slate-600 font-medium">
            {links.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => handleClick(id)}
                className={`transition-colors ${
                  activeSection === id
                    ? 'text-teal-600 font-semibold'
                    : 'hover:text-teal-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 -mr-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <MenuIcon isOpen={isMobileMenuOpen} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] md:hidden"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-[73px] right-0 bottom-0 w-[320px] shadow-2xl z-[95] md:hidden overflow-hidden"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl" />
              
              {/* Content */}
              <div className="relative h-full flex flex-col">
                {/* Header with Profile */}
                <div className="px-6 pt-8 pb-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        D
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-base">Dipti Marandi</h3>
                        <p className="text-slate-400 text-xs">Senior Staff Nurse</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 hover:bg-white/10 rounded-xl transition-colors backdrop-blur-sm"
                      aria-label="Close menu"
                    >
                      <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                  {links.map(({ label, id }, idx) => (
                    <motion.button
                      key={id}
                      onClick={() => handleClick(id)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className={`w-full group flex items-center gap-4 px-4 py-3.5 rounded-xl font-semibold transition-all relative overflow-hidden ${
                        activeSection === id
                          ? 'bg-white/15 text-white shadow-lg backdrop-blur-sm'
                          : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {/* Active Indicator */}
                      {activeSection === id && (
                        <motion.div
                          layoutId="mobile-active-pill"
                          className="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-cyan-500/30 rounded-xl"
                          transition={{ type: 'spring', duration: 0.6 }}
                        />
                      )}
                      
                      {/* Icon */}
                      <div className={`relative z-10 transition-transform group-hover:scale-110 ${
                        activeSection === id ? 'text-teal-400' : ''
                      }`}>
                        {menuIcons[id]}
                      </div>
                      
                      {/* Label */}
                      <span className="relative z-10">{label}</span>
                      
                      {/* Arrow */}
                      <svg 
                        className={`relative z-10 w-4 h-4 ml-auto transition-transform group-hover:translate-x-1 ${
                          activeSection === id ? 'text-teal-400' : 'text-slate-500'
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth={2.5} 
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  ))}
                </nav>

                {/* Footer */}
                <div className="px-6 py-6 border-t border-white/10">
                  <div className="text-center">
                    <p className="text-xs text-slate-400 mb-2">
                      Professional Healthcare Portfolio
                    </p>
                    <p className="text-[10px] text-slate-500">
                      © 2026 Dipti Health Care
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
