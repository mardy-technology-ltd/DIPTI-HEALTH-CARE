'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/lib/adminContext';
import { ContactData } from '@/lib/siteData';

export default function ContactAdminPage() {
  const { contact, setContact } = useAdmin();
  const [form, setForm] = useState<ContactData>(contact);

  // sync when context loads from localStorage
  useEffect(() => { setForm(contact); }, [contact]);

  const update = (k: keyof ContactData, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const save = () => setContact(form);

  return (
    <div className="p-8 max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">📞 Contact Information</h1>
        <p className="text-slate-400 text-sm mt-1">Update phone, email, and location displayed on the site.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
        {[
          { label: 'Phone Number', field: 'phone' as const, icon: '📞', placeholder: '+880 17XX XXXXXX' },
          { label: 'Email Address', field: 'email' as const, icon: '✉️', placeholder: 'contact@dipticare.com' },
          { label: 'Location / Address', field: 'location' as const, icon: '🏥', placeholder: 'Hospital name, City' },
        ].map(({ label, field, icon, placeholder }) => (
          <div key={field}>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              {icon} {label}
            </label>
            <input
              type="text"
              value={form[field]}
              onChange={(e) => update(field, e.target.value)}
              placeholder={placeholder}
              className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
            />
          </div>
        ))}
      </div>

      {/* Live Preview */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Preview (Contact Card)</h2>
        <div className="bg-teal-800 rounded-xl p-6 text-white space-y-4">
          {[
            { icon: '📞', label: 'Phone', value: form.phone },
            { icon: '✉️', label: 'Email', value: form.email },
            { icon: '🏥', label: 'Location', value: form.location },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-teal-700 flex items-center justify-center shrink-0 text-lg">{icon}</div>
              <div>
                <p className="text-teal-200 text-xs font-semibold uppercase tracking-wider">{label}</p>
                <p className="text-white font-medium text-sm">{value || '—'}</p>
              </div>
            </div>
          ))}
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
