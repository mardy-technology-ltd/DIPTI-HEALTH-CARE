'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePosts } from '@/lib/useSiteData';

const catColor: Record<string, string> = {
  'Health Advice':     'bg-teal-100 text-teal-700',
  'Mental Wellness':   'bg-violet-100 text-violet-700',
  'Diet & Lifestyle':  'bg-rose-100 text-rose-700',
  'Clinical Insights': 'bg-blue-100 text-blue-700',
};

export default function BlogSection() {
  const allPosts = usePosts();
  // show only published posts, max 3
  const featured = allPosts.filter((p) => p.published).slice(0, 3);

  return (
    <section id="blog" className="py-24 bg-white relative scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">
              Health <span className="text-teal-600">Insights</span>
            </h2>
            <p className="text-slate-600 text-lg">
              Regular articles, tips, and medical advice to help you maintain a healthy lifestyle.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-teal-600 font-bold hover:text-teal-700 transition-colors group"
            >
              View All Posts
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-teal-900/5 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col"
            >
              {/* Card header */}
              <div className={`h-48 w-full bg-gradient-to-br ${post.color} relative overflow-hidden flex items-center justify-center`}>
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-grid-pattern opacity-30 mix-blend-overlay" />
                    <span className="text-6xl select-none drop-shadow-md group-hover:scale-110 transition-transform duration-500">
                      {post.icon}
                    </span>
                  </>
                )}
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${catColor[post.category] ?? 'bg-slate-100 text-slate-600'} z-10`}>
                  {post.category}
                </span>
                {!post.image && <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />}
              </div>

              {/* Card content */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-3 text-sm text-slate-500 font-medium mb-3">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-slate-600 mb-6 line-clamp-3 flex-1">{post.excerpt}</p>
                <div className="mt-auto flex items-center gap-1 text-teal-600 font-bold text-sm uppercase tracking-wide">
                  Read Article
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-teal-500/20 hover:-translate-y-0.5 group"
          >
            View All {allPosts.filter((p) => p.published).length} Posts
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
