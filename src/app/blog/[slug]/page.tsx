'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePosts } from '@/lib/useSiteData';
import { BlogPost } from '@/lib/siteData';

const catColor: Record<string, string> = {
  'Health Advice':     'bg-teal-100 text-teal-700',
  'Mental Wellness':   'bg-violet-100 text-violet-700',
  'Diet & Lifestyle':  'bg-rose-100 text-rose-700',
  'Clinical Insights': 'bg-blue-100 text-blue-700',
};

// Helper to make URLs clickable
function linkifyContent(text: string) {
  if (!text) return null;
  
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  
  return parts.map((part, idx) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={idx}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-600 hover:text-teal-700 underline font-medium break-all"
        >
          {part}
        </a>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const allPosts = usePosts();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    console.log('🔍 Looking for post with slug:', slug);
    console.log('📖 Available posts:', allPosts.map(p => ({ id: p.id, slug: p.slug, title: p.title })));
    
    const publishedPosts = allPosts.filter(p => p.published);
    
    // Try to find by slug first
    let found = publishedPosts.find(p => p.slug === slug);
    
    // Fallback: try numeric ID for backward compatibility
    if (!found && !isNaN(Number(slug))) {
      found = publishedPosts.find(p => p.id === Number(slug));
      console.log('⚠️ Found by ID fallback:', found?.title);
    }
    
    console.log(found ? '✅ Found post:' : '❌ Post not found:', found?.title);
    setPost(found || null);
  }, [slug, allPosts]);

  // Auto-play carousel
  useEffect(() => {
    if (!post?.images || post.images.length <= 1 || !isAutoPlaying || isHovering) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % post.images!.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [post, isAutoPlaying, isHovering]);

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!post?.images || post.images.length <= 1) return;
      
      // Pause auto-play when user manually navigates
      setIsAutoPlaying(false);
      
      if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev - 1 + post.images!.length) % post.images!.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => (prev + 1) % post.images!.length);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [post]);

  const nextSlide = () => {
    if (post?.images) {
      setIsAutoPlaying(false); // Pause on manual navigation
      setCurrentSlide((prev) => (prev + 1) % post.images!.length);
    }
  };

  const prevSlide = () => {
    if (post?.images) {
      setIsAutoPlaying(false); // Pause on manual navigation
      setCurrentSlide((prev) => (prev - 1 + post.images!.length) % post.images!.length);
    }
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false); // Pause on manual navigation
    setCurrentSlide(index);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-[#f8fbff] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Post Not Found</h1>
          <p className="text-slate-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl transition"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fbff]">
      {/* Header */}
      <section className="relative overflow-hidden bg-slate-900 pt-28 pb-16">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-teal-500/20 blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 max-w-4xl relative">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-semibold mb-8 transition"
          >
            <span>←</span> Back to Blog
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4 text-slate-400 mb-4">
            <span>{post.date}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            <span>{post.readTime}</span>
          </div>

          <Link 
            href={`/blog?category=${encodeURIComponent(post.category)}`}
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider hover:ring-2 hover:ring-white/30 transition-all ${catColor[post.category] ?? 'bg-slate-700 text-slate-300'}`}
          >
            {post.category}
          </Link>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <article className="bg-white rounded-3xl shadow-xl shadow-slate-900/5 overflow-hidden">
            {/* Featured Image */}
            {post.image && (
              <div className="w-full h-96 relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Excerpt */}
              <div className="text-xl text-slate-600 font-medium mb-8 leading-relaxed border-l-4 border-teal-500 pl-6 py-2">
                {post.excerpt}
              </div>

              {/* Full Content */}
              {post.content && (
                <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-4">
                  {post.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4">
                      {linkifyContent(paragraph)}
                    </p>
                  ))}
                </div>
              )}

              {/* Additional Images - Carousel Slider */}
              {post.images && post.images.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-200">
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">Related Images</h3>
                  
                  <div 
                    className="relative group"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    {/* Carousel Container */}
                    <div className="relative overflow-hidden rounded-2xl bg-slate-100">
                      <div className="relative h-[500px]">
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.img
                            key={currentSlide}
                            src={post.images[currentSlide]}
                            alt={`${post.title} - Image ${currentSlide + 1}`}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </AnimatePresence>
                        
                        {/* Overlay gradient for better button visibility */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
                        
                        {/* Image Counter & Play/Pause */}
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                          <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                            {currentSlide + 1} / {post.images.length}
                          </div>
                          {post.images.length > 1 && (
                            <button
                              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                              className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                              aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
                              title={isAutoPlaying ? 'Pause' : 'Play'}
                            >
                              {isAutoPlaying ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              )}
                            </button>
                          )}
                        </div>

                        {/* Auto-play Progress Bar */}
                        {post.images.length > 1 && isAutoPlaying && !isHovering && (
                          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/30 backdrop-blur-sm">
                            <motion.div
                              key={currentSlide}
                              className="h-full bg-teal-500 shadow-lg shadow-teal-500/50"
                              initial={{ width: '0%' }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 4, ease: 'linear' }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Navigation Buttons */}
                      {post.images.length > 1 && (
                        <>
                          <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                            aria-label="Previous image"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                              <path d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                            aria-label="Next image"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                              <path d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>

                    {/* Thumbnail Navigation Dots */}
                    {post.images.length > 1 && (
                      <div className="flex justify-center gap-2 mt-6">
                        {post.images.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                              idx === currentSlide 
                                ? 'w-20 h-20 ring-4 ring-teal-500 scale-110' 
                                : 'w-16 h-16 opacity-60 hover:opacity-100 hover:scale-105'
                            }`}
                            aria-label={`Go to image ${idx + 1}`}
                          >
                            <img
                              src={img}
                              alt={`Thumbnail ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            {idx === currentSlide && (
                              <div className="absolute inset-0 bg-teal-500/20" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Simple Dots (fallback if thumbnails don't work well) */}
                    {/* {post.images.length > 1 && (
                      <div className="flex justify-center gap-2 mt-6">
                        {post.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              idx === currentSlide 
                                ? 'w-8 bg-teal-600' 
                                : 'w-2 bg-slate-300 hover:bg-slate-400'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        ))}
                      </div>
                    )} */}
                  </div>
                </div>
              )}
            </div>
          </article>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:-translate-y-0.5"
            >
              <span>←</span> Back to All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-500/10 rounded-full mb-6">
              <span className="text-3xl">💬</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Have Questions?
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              I'm here to help! Whether you need health advice, wellness tips, or have questions about this article, feel free to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-teal-500/30 hover:-translate-y-0.5"
              >
                Get in Touch →
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 border border-white/20"
              >
                Read More Articles
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-800">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <Link href="/" className="inline-block">
                <h3 className="text-xl font-bold text-white mb-3 hover:text-teal-400 transition-colors cursor-pointer">
                  Dipti Health Care
                </h3>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed">
                Providing compassionate care and expert health guidance with over 12 years of nursing experience.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-slate-400 hover:text-teal-400 text-sm transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="text-slate-400 hover:text-teal-400 text-sm transition">
                    About Me
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-slate-400 hover:text-teal-400 text-sm transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-slate-400 hover:text-teal-400 text-sm transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Categories
              </h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-slate-400 text-sm">Health Advice</span>
                </li>
                <li>
                  <span className="text-slate-400 text-sm">Mental Wellness</span>
                </li>
                <li>
                  <span className="text-slate-400 text-sm">Diet & Lifestyle</span>
                </li>
                <li>
                  <span className="text-slate-400 text-sm">Clinical Insights</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Dipti Health Care. All rights reserved.
            </p>
            <p className="text-slate-500 text-sm">
              Made with <span className="text-red-500">❤️</span> for better health
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

