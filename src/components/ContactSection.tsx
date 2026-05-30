'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContact, addMessage } from '@/lib/useSiteData';

export default function ContactSection() {
  const contact = useContact();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<{ type: 'idle' | 'sending' | 'success' | 'error', message: string }>({ type: 'idle', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill out all required fields.' });
      setTimeout(() => setStatus({ type: 'idle', message: '' }), 3000);
      return;
    }

    setStatus({ type: 'sending', message: 'Sending...' });

    const { error } = await addMessage({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });

    if (error) {
      setStatus({ type: 'error', message: error.message });
      setTimeout(() => setStatus({ type: 'idle', message: '' }), 5000);
    } else {
      setStatus({ type: 'success', message: 'Message sent successfully! Thank you.' });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus({ type: 'idle', message: '' }), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">
            Get in <span className="text-teal-600">Touch</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Have a question, need consultation, or want to discuss medical opportunities? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">

          {/* Left: Contact Info */}
          <div className="w-full lg:w-2/5 bg-teal-800 text-white p-10 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/3" />

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-2">Contact Info</h3>
                <p className="text-teal-100 mb-10">Feel free to reach out through any of these channels.</p>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-700 flex items-center justify-center shrink-0 text-xl">📞</div>
                    <div>
                      <h4 className="text-teal-100 text-sm font-semibold uppercase tracking-wider mb-1">Phone</h4>
                      <p className="text-lg font-medium">{contact.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-700 flex items-center justify-center shrink-0 text-xl">✉️</div>
                    <div>
                      <h4 className="text-teal-100 text-sm font-semibold uppercase tracking-wider mb-1">Email</h4>
                      <p className="text-lg font-medium text-teal-50 break-all">{contact.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-700 flex items-center justify-center shrink-0 text-xl">🏥</div>
                    <div>
                      <h4 className="text-teal-100 text-sm font-semibold uppercase tracking-wider mb-1">Location</h4>
                      <p className="text-lg font-medium">{contact.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="w-full lg:w-3/5 p-10 md:p-14">
            <h3 className="text-3xl font-bold text-slate-800 mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-600 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={status.type === 'sending'}
                  className="px-8 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                  {status.type === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                <AnimatePresence>
                  {status.type !== 'idle' && status.type !== 'sending' && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`text-sm font-medium ${
                        status.type === 'success' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {status.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
