'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useStory } from '@/lib/useSiteData';

export default function StorySection() {
  const story = useStory();

  return (
    <section id="story" className="py-24 bg-white relative overflow-hidden scroll-mt-20">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
              {story.heading} <span className="text-teal-600">{story.headingHighlight}</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">{story.paragraph1}</p>
            <p className="text-lg text-slate-600 leading-relaxed">{story.paragraph2}</p>
            <p className="text-lg text-slate-600 leading-relaxed">{story.paragraph3}</p>

            <div className="pt-6">
              <div className="inline-flex items-center gap-4 bg-teal-50 px-6 py-4 rounded-2xl border border-teal-100">
                <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xl shadow-inner">
                  &hearts;
                </div>
                <div>
                  <h4 className="text-teal-900 font-bold">{story.card_title}</h4>
                  <p className="text-teal-700 text-sm">{story.card_subtitle}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden bg-slate-100 relative shadow-2xl border-8 border-white">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-600/20 to-blue-600/20 mix-blend-multiply z-10" />
              <Image
                src="/hospital_hallway.png"
                alt="Hospital hallway"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-8 left-8 z-20 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-xs border border-teal-50">
                <p className="text-slate-800 font-semibold italic">{story.quote}</p>
              </div>
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-teal-100/50 rounded-full blur-3xl" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
