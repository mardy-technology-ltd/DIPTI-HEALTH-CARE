'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/lib/adminContext';
import { HeroData } from '@/lib/siteData';

/* ── Field component defined OUTSIDE the page to prevent remount on re-render ── */
function Field({
  label,
  field,
  form,
  onChange,
  multiline,
}: {
  label: string;
  field: keyof HeroData;
  form: HeroData;
  onChange: (field: keyof HeroData, value: string) => void;
  multiline?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-300 mb-2">{label}</label>
      {multiline ? (
        <textarea
          rows={3}
          value={form[field]}
          onChange={(e) => onChange(field, e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50 resize-none text-sm"
        />
      ) : (
        <input
          type="text"
          value={form[field]}
          onChange={(e) => onChange(field, e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
        />
      )}
    </div>
  );
}

/* ── Page ── */
export default function HeroAdminPage() {
  const { hero, setHero } = useAdmin();
  const [form, setForm] = useState<HeroData>(hero);

  // sync when context loads from localStorage (runs once on mount)
  useEffect(() => { setForm(hero); }, [hero]);

  const update = (k: keyof HeroData, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const save = () => setHero(form);

  return (
    <div className="p-8 max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">🌟 Hero Section</h1>
        <p className="text-slate-400 text-sm mt-1">Edit the top hero banner content.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
        <Field label="Full Name"                   field="name"        form={form} onChange={update} />
        <Field label="Badge / Tag"                 field="tagline"     form={form} onChange={update} />
        <Field label="Subtitle (under name)"       field="subtitle"    form={form} onChange={update} />
        <Field label="Description paragraph"       field="description" form={form} onChange={update} multiline />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Primary Button Label"   field="ctaPrimary"   form={form} onChange={update} />
          <Field label="Secondary Button Label" field="ctaSecondary" form={form} onChange={update} />
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Preview</h2>
        <div className="bg-[#f8fbff] rounded-xl p-6">
          <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-100 text-xs font-bold uppercase tracking-wider mb-3">
            {form.tagline || 'Badge'}
          </span>
          <h3 className="text-3xl font-extrabold text-slate-800 mb-1">{form.name || 'Name'}.</h3>
          <p className="text-lg text-slate-500 mb-3">{form.subtitle || 'Subtitle'}</p>
          <p className="text-slate-600 text-sm mb-4 max-w-sm">{form.description}</p>
          <div className="flex gap-3">
            <span className="bg-teal-600 text-white text-xs px-4 py-2 rounded-full font-medium">{form.ctaPrimary}</span>
            <span className="border border-slate-300 text-slate-700 text-xs px-4 py-2 rounded-full font-medium">{form.ctaSecondary}</span>
          </div>
        </div>
      </div>

      <button
        onClick={save}
        className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-8 py-3 rounded-xl transition shadow-lg shadow-teal-500/20"
      >
        💾 Save Changes
      </button>
    </div>
  );
}
