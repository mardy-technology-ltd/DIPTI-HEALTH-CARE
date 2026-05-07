'use client';

import { motion } from 'framer-motion';
import { useContact } from '@/lib/useSiteData';

export default function ContactSection() {
  const contact = useContact();

  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
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
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-semibold text-slate-700">First Name</label>
                  <input type="text" id="firstName"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                    placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-semibold text-slate-700">Last Name</label>
                  <input type="text" id="lastName"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                    placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address</label>
                <input type="email" id="email"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                  placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-slate-700">Your Message</label>
                <textarea id="message" rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all resize-none"
                  placeholder="How can I help you?" />
              </div>

              <button type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg py-4 rounded-xl transition-colors shadow-lg shadow-teal-500/30">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
