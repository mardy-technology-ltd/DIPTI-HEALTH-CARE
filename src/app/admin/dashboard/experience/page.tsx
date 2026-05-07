'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/lib/adminContext';
import { ExperienceItem } from '@/lib/siteData';

const blank = (): ExperienceItem => ({ id: Date.now(), year: '', role: '', department: '', description: '' });

export default function ExperienceAdminPage() {
  const { experiences, setExperiences } = useAdmin();
  const [items, setItems] = useState<ExperienceItem[]>(experiences);
  const [editing, setEditing] = useState<ExperienceItem | null>(null);

  // sync when context loads from localStorage
  useEffect(() => { setItems(experiences); }, [experiences]);

  const saveAll = (next: ExperienceItem[]) => {
    setItems(next);
    setExperiences(next);
  };

  const upsert = (item: ExperienceItem) => {
    const next = items.find((i) => i.id === item.id)
      ? items.map((i) => (i.id === item.id ? item : i))
      : [...items, item];
    saveAll(next);
    setEditing(null);
  };

  const remove = (id: number) => saveAll(items.filter((i) => i.id !== id));

  return (
    <div className="p-8 max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">🏅 Experience Timeline</h1>
          <p className="text-slate-400 text-sm mt-1">Add, edit, or remove experience entries.</p>
        </div>
        <button
          onClick={() => setEditing(blank())}
          className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-5 py-2.5 rounded-xl transition text-sm"
        >
          + Add Entry
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {items.map((exp) => (
          <div key={exp.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-teal-600/20 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold text-sm shrink-0">
              {exp.id % 10}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-teal-400 text-xs font-bold uppercase tracking-widest">{exp.year}</div>
              <div className="text-white font-bold">{exp.role}</div>
              <div className="text-slate-400 text-sm">{exp.department}</div>
              <div className="text-slate-500 text-sm mt-1 line-clamp-2">{exp.description}</div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setEditing(exp)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs transition"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => remove(exp.id)}
                className="bg-red-900/30 hover:bg-red-900/50 text-red-400 px-3 py-1.5 rounded-lg text-xs transition"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 w-full max-w-lg shadow-2xl space-y-4">
            <h2 className="text-xl font-extrabold text-white mb-2">
              {experiences.find((e) => e.id === editing.id) ? 'Edit' : 'New'} Experience Entry
            </h2>
            {(['year', 'role', 'department'] as const).map((field) => (
              <div key={field}>
                <label className="block text-sm font-semibold text-slate-300 mb-1 capitalize">{field}</label>
                <input
                  type="text"
                  value={editing[field]}
                  onChange={(e) => setEditing({ ...editing, [field]: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1">Description</label>
              <textarea
                rows={4}
                value={editing.description}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50 resize-none text-sm"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => upsert(editing)}
                className="flex-1 bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 rounded-xl transition"
              >
                Save Entry
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
      )}

      <button
        onClick={() => saveAll(items)}
        className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-8 py-3 rounded-xl transition shadow-lg shadow-teal-500/20"
      >
        💾 Save All Changes
      </button>
    </div>
  );
}
