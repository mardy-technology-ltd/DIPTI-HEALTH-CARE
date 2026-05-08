'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/lib/adminContext';
import { BlogPost, categories, iconOptions, colorOptions } from '@/lib/siteData';

const blank = (): BlogPost => ({
  id: Date.now(),
  title: '',
  category: categories[0],
  date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
  excerpt: '',
  readTime: '5 min read',
  color: colorOptions[0].value,
  icon: iconOptions[0],
  published: true,
  image: '',
  content: '',
  images: [],
});

// ── Image Compression Helper ────────────────────────────────────
const compressImage = (file: File, maxWidth = 800, quality = 0.7): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Resize if needed
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to base64 with compression
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export default function BlogAdminPage() {
  const { posts, setPosts } = useAdmin();

  // ── FIX: sync local items whenever context posts change (including after
  //         AdminProvider loads from localStorage on first mount)
  const [items, setItems] = useState<BlogPost[]>(posts);
  useEffect(() => {
    setItems(posts);
  }, [posts]);

  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [filterCat, setFilterCat] = useState('All');
  const [search, setSearch] = useState('');

  // ── helpers that immediately persist ──────────────────────────
  const saveAll = (next: BlogPost[]) => {
    setItems(next);
    setPosts(next);   // → writes to localStorage + shows "Saved!" badge
  };

  const upsert = (post: BlogPost) => {
    console.log('📝 Upserting post:', { id: post.id, title: post.title, published: post.published });
    const next = items.find((p) => p.id === post.id)
      ? items.map((p) => (p.id === post.id ? post : p))
      : [post, ...items];
    console.log('📊 New posts array length:', next.length);
    saveAll(next);
    setEditing(null);
  };

  const remove = (id: number) => {
    if (!confirm('Delete this post?')) return;
    saveAll(items.filter((i) => i.id !== id));
  };

  // toggle publish & auto-save immediately
  const toggle = (id: number) => {
    const next = items.map((p) => (p.id === id ? { ...p, published: !p.published } : p));
    saveAll(next);
  };

  const visible = items.filter((p) => {
    const mc = filterCat === 'All' || p.category === filterCat;
    const ms = !search || p.title.toLowerCase().includes(search.toLowerCase());
    return mc && ms;
  });

  return (
    <div className="p-8 space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">📝 Blog Posts</h1>
          <p className="text-slate-400 text-sm mt-1">
            {items.filter((p) => p.published).length} published &middot; {items.filter((p) => !p.published).length} draft
          </p>
        </div>
        <button
          onClick={() => setEditing(blank())}
          className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-5 py-2.5 rounded-xl transition text-sm"
        >
          + New Post
        </button>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search posts…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 w-56"
        />
        <div className="flex gap-2 flex-wrap">
          {['All', ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setFilterCat(c)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition ${filterCat === c ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-4">Post</th>
                <th className="text-left px-5 py-4">Category</th>
                <th className="text-left px-5 py-4">Date</th>
                <th className="text-center px-5 py-4">Status</th>
                <th className="text-right px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {visible.map((post) => (
                <tr key={post.id} className="hover:bg-slate-800/30 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {post.image ? (
                        <img src={post.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-slate-700" />
                      ) : (
                        <span className="text-2xl">{post.icon}</span>
                      )}
                      <div className="flex flex-col">
                        <span className="text-white font-semibold line-clamp-1 max-w-xs">{post.title || '(Untitled)'}</span>
                        {post.image && <span className="text-xs text-teal-400">📷 Image attached</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs">{post.category}</span>
                  </td>
                  <td className="px-5 py-4 text-slate-400">{post.date}</td>
                  <td className="px-5 py-4 text-center">
                    {/* Clicking this button immediately saves the toggle */}
                    <button
                      onClick={() => toggle(post.id)}
                      title="Click to toggle publish status"
                      className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                        post.published
                          ? 'bg-green-500/15 text-green-400 border border-green-500/30 hover:bg-red-500/15 hover:text-red-400 hover:border-red-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-green-500/15 hover:text-green-400 hover:border-green-500/30'
                      }`}
                    >
                      {post.published ? '✅ Published' : '📄 Draft'}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditing(post)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs transition"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => remove(post.id)}
                        className="bg-red-900/20 hover:bg-red-900/40 text-red-400 px-3 py-1.5 rounded-lg text-xs transition"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {visible.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              <div className="text-4xl mb-3">📭</div>
              <p>No posts found.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Edit / New Post Modal ── */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] my-4">
            {/* Modal Header - Fixed */}
            <div className="p-8 pb-4 border-b border-slate-800">
              <h2 className="text-xl font-extrabold text-white">
                {items.find((p) => p.id === editing.id) ? '✏️ Edit Post' : '+ New Post'}
              </h2>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="overflow-y-auto px-8 py-4 space-y-4 flex-1">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Title</label>
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                  placeholder="Post title…"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Excerpt</label>
                <textarea
                  rows={3}
                  value={editing.excerpt}
                  onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50 resize-none text-sm"
                  placeholder="Short description…"
                />
              </div>

              {/* Full Content / Details */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Content / Details</label>
                <textarea
                  rows={10}
                  value={editing.content || ''}
                  onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50 resize-y text-sm"
                  placeholder="Full blog post content with details, links, etc..."
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Featured Image</label>
                <div className="space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const compressed = await compressImage(file, 800, 0.7);
                        setEditing({ ...editing, image: compressed });
                      }
                    }}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-500 file:cursor-pointer"
                  />
                  {editing.image && (
                    <div className="relative group">
                      <img
                        src={editing.image}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-xl border-2 border-slate-700"
                      />
                      <button
                        type="button"
                        onClick={() => setEditing({ ...editing, image: '' })}
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 text-white p-2 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition"
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Images */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Additional Images</label>
                <div className="space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={async (e) => {
                      const files = Array.from(e.target.files || []);
                      if (files.length === 0) return;
                      
                      const compressedImages = await Promise.all(
                        files.map((file) => compressImage(file, 600, 0.6))
                      );

                      const currentImages = editing.images || [];
                      setEditing({ ...editing, images: [...currentImages, ...compressedImages] });
                    }}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-500 file:cursor-pointer"
                  />
                  {editing.images && editing.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                      {editing.images.map((img, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={img}
                            alt={`Additional ${idx + 1}`}
                            className="w-full h-24 object-cover rounded-lg border-2 border-slate-700"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newImages = editing.images?.filter((_, i) => i !== idx) || [];
                              setEditing({ ...editing, images: newImages });
                            }}
                            className="absolute top-1 right-1 bg-red-600 hover:bg-red-500 text-white p-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Category</label>
                  <select
                    value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                  >
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Read Time</label>
                  <input
                    type="text"
                    value={editing.readTime}
                    onChange={(e) => setEditing({ ...editing, readTime: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                    placeholder="5 min read"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Date</label>
                  <input
                    type="text"
                    value={editing.date}
                    onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Status</label>
                  <select
                    value={editing.published ? 'published' : 'draft'}
                    onChange={(e) => setEditing({ ...editing, published: e.target.value === 'published' })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                  >
                    <option value="published">✅ Published</option>
                    <option value="draft">📄 Draft</option>
                  </select>
                </div>
              </div>

              {/* Icon picker */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Icon</label>
                <div className="flex flex-wrap gap-2">
                  {iconOptions.map((ic) => (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => setEditing({ ...editing, icon: ic })}
                      className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition ${editing.icon === ic ? 'bg-teal-600 ring-2 ring-teal-400' : 'bg-slate-800 hover:bg-slate-700'}`}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color picker */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Card Color</label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((col) => (
                    <button
                      key={col.value}
                      type="button"
                      onClick={() => setEditing({ ...editing, color: col.value })}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${col.value} transition border-2 ${editing.color === col.value ? 'border-teal-400' : 'border-transparent'}`}
                    >
                      {col.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className={`rounded-2xl bg-gradient-to-br ${editing.color} p-4 flex items-center gap-3`}>
                <span className="text-4xl">{editing.icon}</span>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{editing.title || '(No title)'}</p>
                  <p className="text-slate-600 text-xs">{editing.category} · {editing.readTime}</p>
                </div>
              </div>
            </div>

            {/* Modal Footer - Fixed */}
            <div className="p-8 pt-4 border-t border-slate-800">
              <div className="flex gap-3">
                <button
                  onClick={() => upsert(editing)}
                  className="flex-1 bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 rounded-xl transition"
                >
                  💾 Save Post
                </button>
                <button
                  onClick={() => setEditing(null)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-xl transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
