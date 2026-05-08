'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const links = [
  { label: 'Home',       id: 'home' },
  { label: 'Experience', id: 'experience' },
  { label: 'Story',      id: 'story' },
  { label: 'Blog',       id: 'blog' },
  { label: 'Contact',    id: 'contact' },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        <button
          onClick={handleLogoClick}
          className="text-2xl font-extrabold text-slate-800 tracking-tight"
        >
          Dipti<span className="text-teal-600">.Care</span>
        </button>
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
