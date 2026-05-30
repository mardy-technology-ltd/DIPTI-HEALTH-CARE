'use client';

import { motion } from 'framer-motion';
import { useExperiences } from '@/lib/useSiteData';
import { Briefcase } from 'lucide-react';

export default function ExperienceSection() {
  const experiences = useExperiences();

  return (
    <section id="experience" className="py-24 bg-slate-50 scroll-mt-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-teal-800 mb-4 tracking-tight">
            My Professional Journey
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg md:text-xl">
            Significant experiences and responsibilities acquired during a long career at Dhaka Medical College Hospital.
          </p>
        </motion.div>

        <div className="relative">
          <div
            className="absolute left-1/2 -translate-x-1/2 w-1 bg-teal-200/80 h-full rounded-full"
            aria-hidden="true"
          />

          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative flex items-center mb-12 group">
              <div
                className={`flex-1 ${
                  index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'
                }`}
              >
                {index % 2 === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -100, scale: 0.8 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-150px' }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 90, delay: 0.2 }}
                    className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 transform transition-transform duration-500 group-hover:scale-105 group-hover:shadow-xl"
                  >
                    <span className="text-teal-600 font-bold text-sm tracking-widest uppercase">{exp.year}</span>
                    <h3 className="text-xl font-bold text-slate-800 mt-2">{exp.role}</h3>
                    <h4 className="text-slate-500 mb-4">{exp.department}</h4>
                    <p className="text-slate-600 leading-relaxed">{exp.description}</p>
                  </motion.div>
                )}
              </div>

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-150px' }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 150, delay: 0.1 }}
                className="absolute left-1/2 -translate-x-1/2 z-10"
              >
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center shadow-lg border-4 border-slate-50 group-hover:bg-teal-500 transition-colors duration-300">
                  <Briefcase className="text-white" size={24} />
                </div>
              </motion.div>

              <div
                className={`flex-1 ${
                  index % 2 === 0 ? 'pl-8 text-left' : 'pr-8 text-right'
                }`}
              >
                {index % 2 === 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 100, scale: 0.8 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-150px' }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 90, delay: 0.2 }}
                    className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 transform transition-transform duration-500 group-hover:scale-105 group-hover:shadow-xl"
                  >
                    <span className="text-teal-600 font-bold text-sm tracking-widest uppercase">{exp.year}</span>
                    <h3 className="text-xl font-bold text-slate-800 mt-2">{exp.role}</h3>
                    <h4 className="text-slate-500 mb-4">{exp.department}</h4>
                    <p className="text-slate-600 leading-relaxed">{exp.description}</p>
                  </motion.div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
