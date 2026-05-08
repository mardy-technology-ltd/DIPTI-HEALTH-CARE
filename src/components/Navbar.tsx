'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const links = [
  { label: 'Home',       id: 'home' },
  { label: 'Experience', id: 'experience' },
  { label: 'Story',      id: 'story' },
  { label: 'Blog',       id: 'blog' },
  { label: 'Contact',    id: 'contact' },
];

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
      </div>
    </nav>
  );
}
