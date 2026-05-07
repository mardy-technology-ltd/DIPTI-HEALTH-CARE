'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/lib/adminContext';
import { StoryData } from '@/lib/siteData';

/* ── Field component defined OUTSIDE the page ── */
function Field({
  label,
  field,
  form,
  onChange,
  multiline,
}: {
  label: string;
  field: keyof StoryData;
  form: StoryData;
  onChange: (field: keyof StoryData, value: string) => void;
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
export default function StoryAdminPage() {
  const { story, setStory } = useAdmin();
  const [form, setForm] = useState<StoryData>(story);

  // sync when context loads from localStorage
  useEffect(() => { setForm(story); }, [story]);

  const update = (k: keyof StoryData, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const save = () => setStory(form);

  return (
    <div className="p-8 max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">📖 My Story Section</h1>
        <p className="text-slate-400 text-sm mt-1">Edit the biography and story content.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label='Heading (e.g. "Beyond the")' field="heading"          form={form} onChange={update} />
          <Field label="Heading Highlight Word"        field="headingHighlight" form={form} onChange={update} />
        </div>
        <Field label="Paragraph 1" field="paragraph1" form={form} onChange={update} multiline />
        <Field label="Paragraph 2" field="paragraph2" form={form} onChange={update} multiline />
        <Field label="Paragraph 3" field="paragraph3" form={form} onChange={update} multiline />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Card Title"    field="cardTitle"    form={form} onChange={update} />
          <Field label="Card Subtitle" field="cardSubtitle" form={form} onChange={update} />
        </div>
        <Field label="Image Quote" field="quote" form={form} onChange={update} multiline />
      </div>

      {/* Preview */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Preview</h2>
        <div className="bg-white rounded-xl p-6 space-y-3">
          <h3 className="text-2xl font-extrabold text-slate-800">
            {form.heading} <span className="text-teal-600">{form.headingHighlight}</span>
          </h3>
          <p className="text-slate-600 text-sm">{form.paragraph1}</p>
          <div className="inline-flex items-center gap-3 bg-teal-50 px-4 py-3 rounded-xl border border-teal-100">
            <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm">♥</div>
            <div>
              <p className="text-teal-900 font-bold text-sm">{form.cardTitle}</p>
              <p className="text-teal-700 text-xs">{form.cardSubtitle}</p>
            </div>
          </div>
          <blockquote className="border-l-4 border-teal-200 pl-4 text-slate-500 italic text-sm">{form.quote}</blockquote>
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
