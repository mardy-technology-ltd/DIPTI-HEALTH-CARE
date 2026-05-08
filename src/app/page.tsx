'use client';

import { useEffect } from 'react';
import HeroContent from '@/components/HeroContent';
import HeroImage from '@/components/HeroImage';
import ExperienceSection from '@/components/ExperienceSection';
import StorySection from '@/components/StorySection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  // Handle hash scrolling when arriving from another page (e.g. /blog → /#experience)
  useEffect(() => {
    const id = window.location.hash?.slice(1);
    if (id) {
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Remove hash from URL to keep it clean
          window.history.replaceState(null, '', '/');
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <main className="relative bg-grid-pattern overflow-hidden">
        {/* Decorative background orbs */}
        <div className="orb-teal" />
        <div className="orb-blue" />

        {/* Hero Section */}
        <section
          id="home"
          className="relative pt-32 pb-20 md:pt-40 md:pb-24 lg:min-h-[90vh] flex flex-col justify-center"
        >
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

              {/* Left: Content */}
              <div className="order-2 lg:order-1 relative">
                <HeroContent />
              </div>

              {/* Right: Image Scene */}
              <div className="order-1 lg:order-2 h-[450px] lg:h-[650px] w-full relative">
                <HeroImage />
              </div>

            </div>
          </div>
        </section>

        {/* Experience Timeline Section */}
        <ExperienceSection />

        {/* Story Section */}
        <StorySection />

        {/* Blog Section */}
        <BlogSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Simple Footer */}
        <footer className="bg-slate-900 text-slate-400 py-10 text-center text-sm border-t border-slate-800">
          <div className="container mx-auto px-6">
            <p className="font-semibold text-slate-300 mb-2">Dipti Marandi &bull; Senior Staff Nurse</p>
            <p>&copy; {new Date().getFullYear()} All rights reserved. Dhaka Medical College & Hospital.</p>
          </div>
        </footer>
      </main>
    </>
  );
}

