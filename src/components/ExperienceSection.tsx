'use client';

import { motion } from 'framer-motion';
import { useExperiences } from '@/lib/useSiteData';

export default function ExperienceSection() {
  const experiences = useExperiences();

  return (
    <section id="experience" className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-4">My Experience</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Significant experiences and responsibilities acquired during a long career at Dhaka Medical College Hospital.
          </p>
        </motion.div>

        <div className="relative border-l-2 border-teal-200 ml-4 md:ml-1/2 md:-translate-x-1/2">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`mb-12 relative ${
                index % 2 === 0
                  ? 'md:ml-auto md:pl-10 md:w-1/2'
                  : 'md:mr-auto md:pr-10 md:w-1/2 md:text-right'
              } pl-8 md:pl-10`}
            >
              <div
                className={`absolute top-0 w-6 h-6 rounded-full bg-teal-600 border-4 border-white shadow-sm
                  ${index % 2 === 0 ? '-left-[13px] md:-left-[13px]' : '-left-[13px] md:left-auto md:-right-[13px]'}
                `}
              />
              <div className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <span className="text-teal-600 font-bold text-sm tracking-widest uppercase">{exp.year}</span>
                <h3 className="text-xl font-bold text-slate-800 mt-2">{exp.role}</h3>
                <h4 className="text-slate-500 mb-4">{exp.department}</h4>
                <p className="text-slate-600 leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
