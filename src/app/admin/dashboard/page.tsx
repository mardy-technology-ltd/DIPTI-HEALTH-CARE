'use client';

import Link from 'next/link';
import { useAdmin } from '@/lib/adminContext';

export default function OverviewPage() {
  const { posts, experiences } = useAdmin();
  const publishedPosts = posts.filter((p) => p.published).length;

  const stats = [
    { label: 'Total Blog Posts', value: posts.length, icon: '📝', color: 'from-teal-500 to-cyan-500', href: '/admin/dashboard/blog' },
    { label: 'Published Posts',  value: publishedPosts, icon: '✅', color: 'from-green-500 to-emerald-500', href: '/admin/dashboard/blog' },
    { label: 'Draft Posts',      value: posts.length - publishedPosts, icon: '📄', color: 'from-amber-500 to-orange-500', href: '/admin/dashboard/blog' },
    { label: 'Experience Items', value: experiences.length, icon: '🏅', color: 'from-violet-500 to-purple-500', href: '/admin/dashboard/experience' },
  ];

  const sections = [
    { label: 'Hero Section',  desc: 'Name, tagline, buttons', icon: '🌟', href: '/admin/dashboard/hero' },
    { label: 'Experience',    desc: 'Timeline entries',       icon: '🏅', href: '/admin/dashboard/experience' },
    { label: 'My Story',      desc: 'Bio & quote',            icon: '📖', href: '/admin/dashboard/story' },
    { label: 'Blog Posts',    desc: 'Create & manage posts',  icon: '📝', href: '/admin/dashboard/blog' },
    { label: 'Contact Info',  desc: 'Phone, email, location', icon: '📞', href: '/admin/dashboard/contact' },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">Welcome back, Dipti 👋 — here's an overview of your site.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-600 transition group"
          >
            <div className={`inline-flex w-11 h-11 rounded-xl items-center justify-center bg-gradient-to-br ${s.color} text-xl mb-3`}>
              {s.icon}
            </div>
            <div className="text-3xl font-extrabold text-white">{s.value}</div>
            <div className="text-slate-400 text-sm mt-0.5 group-hover:text-slate-300 transition">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Manage Sections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((s) => (
            <Link key={s.label} href={s.href}
              className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-teal-500/50 hover:bg-slate-800/50 transition group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-800 group-hover:bg-teal-500/20 border border-slate-700 group-hover:border-teal-500/30 flex items-center justify-center text-2xl transition">
                {s.icon}
              </div>
              <div>
                <div className="font-bold text-white group-hover:text-teal-400 transition">{s.label}</div>
                <div className="text-slate-500 text-sm">{s.desc}</div>
              </div>
              <span className="ml-auto text-slate-600 group-hover:text-teal-400 transition text-lg">→</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Site info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Site Info</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {[
            ['Site URL', 'localhost:3000'],
            ['Framework', 'Next.js 16'],
            ['Status', '🟢 Running'],
            ['Blog URL', '/blog'],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="text-slate-500 mb-1">{k}</div>
              <div className="text-white font-semibold">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
