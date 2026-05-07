import Navbar from '@/components/Navbar';
import HeroContent from '@/components/HeroContent';
import HeroImage from '@/components/HeroImage';
import ExperienceSection from '@/components/ExperienceSection';
import StorySection from '@/components/StorySection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main className="min-h-screen relative bg-grid-pattern overflow-hidden">
      {/* Ambient background glowing orbs */}
      <div className="orb-teal" />
      <div className="orb-blue" />
      
      <Navbar />
      
      {/* Hero Section */}
      <section 
        id="home" 
        className="relative pt-32 pb-20 md:pt-40 md:pb-24 lg:min-h-[90vh] flex flex-col justify-center z-10"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left: Content */}
            <div className="order-2 lg:order-1 relative z-20">
              <HeroContent />
            </div>

            {/* Right: Image Scene */}
            <div className="order-1 lg:order-2 h-[450px] lg:h-[650px] w-full relative z-20">
              <HeroImage />
            </div>
            
          </div>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <div className="relative z-10">
        <ExperienceSection />
      </div>
      
      {/* Story Section */}
      <div className="relative z-10">
        <StorySection />
      </div>

      {/* Blog Section */}
      <div className="relative z-10">
        <BlogSection />
      </div>
      
      {/* Contact Section */}
      <div className="relative z-10">
        <ContactSection />
      </div>
      
      {/* Simple Footer */}
      <footer className="relative z-10 bg-slate-900 text-slate-400 py-10 text-center text-sm border-t border-slate-800">
        <div className="container mx-auto px-6">
          <p className="font-semibold text-slate-300 mb-2">Dipti Marandi &bull; Senior Staff Nurse</p>
          <p>&copy; {new Date().getFullYear()} All rights reserved. Dhaka Medical College & Hospital.</p>
        </div>
      </footer>
    </main>
  );
}
