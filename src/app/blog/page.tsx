'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePosts } from '@/lib/useSiteData';
import { categories } from '@/lib/siteData';

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);
const ClockIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
);

const catColor: Record<string, string> = {
  'Health Advice':     'bg-teal-100 text-teal-700',
  'Mental Wellness':   'bg-violet-100 text-violet-700',
  'Diet & Lifestyle':  'bg-rose-100 text-rose-700',
  'Clinical Insights': 'bg-blue-100 text-blue-700',
};

export default function BlogPage() {
  const allPosts = usePosts();
  // only show published posts to visitors
  const publishedPosts = allPosts.filter((p) => p.published);

  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return publishedPosts.filter((p) => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchQ   = query === '' ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    });
  }, [publishedPosts, activeCategory, query]);

  return (
    <div className="min-h-screen bg-[#f8fbff]">

      {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-slate-900 pt-28 pb-24">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-teal-500/20 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-24 w-[400px] h-[400px] rounded-full bg-cyan-500/15 blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

        <div className="relative container mx-auto px-6 md:px-12 max-w-7xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold uppercase tracking-widest mb-5">
              Health Insights
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              All <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Posts</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Evidence-based articles, clinical insights, and wellness tips — written by a Senior Staff Nurse with 12+ years of experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 max-w-xl mx-auto relative"
          >
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><SearchIcon /></span>
            <input
              type="text" placeholder="Search articles…" value={query} onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-2xl pl-12 pr-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition backdrop-blur-sm"
            />
          </motion.div>
        </div>
      </section>

      {/* FILTER TABS */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl py-4 flex gap-3 overflow-x-auto">
          {['All', ...categories].map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto shrink-0 self-center text-sm text-slate-400 font-medium">
            {filtered.length} article{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* POSTS GRID */}
      <main className="container mx-auto px-6 md:px-12 max-w-7xl py-16">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div key="grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-teal-900/8 hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
                >
                  <Link href={`/blog/${post.id}`} className="flex flex-col h-full">
                    <div className={`h-44 w-full bg-gradient-to-br ${post.color} relative overflow-hidden flex items-center justify-center`}>
                      {post.image ? (
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-grid-pattern opacity-30 mix-blend-overlay" />
                          <span className="text-6xl select-none drop-shadow-md group-hover:scale-110 transition-transform duration-500">{post.icon}</span>
                        </>
                      )}
                      <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${catColor[post.category] ?? 'bg-slate-100 text-slate-600'} z-10`}>
                        {post.category}
                      </span>
                      {!post.image && <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />}
                    </div>

                    <div className="p-7 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-3">
                        <span>{post.date}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <ClockIcon />
                        <span>{post.readTime}</span>
                      </div>
                      <h2 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2 leading-snug">{post.title}</h2>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 flex-1 mb-5">{post.excerpt}</p>
                      <div className="mt-auto">
                        <span className="inline-flex items-center gap-2 text-teal-600 font-bold text-sm uppercase tracking-wide group-hover:gap-3 transition-all">
                          Read Article <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <span className="text-7xl mb-6">🔍</span>
              <h3 className="text-2xl font-bold text-slate-700 mb-2">No articles found</h3>
              <p className="text-slate-400">Try a different keyword or category.</p>
              <button onClick={() => { setQuery(''); setActiveCategory('All'); }}
                className="mt-6 px-6 py-3 bg-teal-600 text-white rounded-full text-sm font-semibold hover:bg-teal-700 transition-colors">
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER CTA */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 mt-8">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-4xl mb-4 block">💌</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Have a Health Question?</h2>
            <p className="text-slate-400 mb-8 text-lg leading-relaxed">Reach out directly — I'd love to help you navigate your wellness journey.</p>
            <Link href="/#contact"
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-teal-500/30 hover:-translate-y-0.5">
              Get in Touch →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
