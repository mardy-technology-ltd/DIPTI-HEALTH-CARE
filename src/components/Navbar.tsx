'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/70 backdrop-blur-lg border-b border-white/20 shadow-sm py-4' 
        : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="text-2xl font-extrabold text-slate-800 tracking-tight">
          Dipti<span className="text-teal-600">.Care</span>
        </div>
        <div className="hidden md:flex space-x-8 text-slate-600 font-medium">
          <a href="#home" className="hover:text-teal-600 transition-colors">Home</a>
          <a href="#experience" className="hover:text-teal-600 transition-colors">Experience</a>
          <a href="#story" className="hover:text-teal-600 transition-colors">Story</a>
          <a href="#contact" className="hover:text-teal-600 transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
}
