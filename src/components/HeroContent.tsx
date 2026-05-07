'use client';

import { motion } from 'framer-motion';
import { useHero } from '@/lib/useSiteData';

export default function HeroContent() {
  const hero = useHero();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
  };

  return (
    <motion.div
      className="flex flex-col justify-center h-full max-w-2xl px-6 md:px-12 z-20 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-4">
        <span className="inline-block py-1 px-3 rounded-full bg-teal-50 text-teal-700 border border-teal-100 text-sm font-semibold tracking-wider uppercase shadow-sm">
          {hero.tagline}
        </span>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6 text-slate-800 drop-shadow-sm"
      >
        {hero.name}<span className="text-teal-600">.</span><br />
        <span className="text-2xl md:text-3xl lg:text-4xl font-medium text-slate-500 mt-2 block">
          {hero.subtitle}
        </span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-lg"
      >
        {hero.description}
      </motion.p>

      <motion.div variants={itemVariants} className="flex gap-4">
        <a
          href="#experience"
          className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 hover:-translate-y-1"
        >
          {hero.ctaPrimary}
        </a>
        <a
          href="#story"
          className="bg-white/50 backdrop-blur-md border border-slate-300 hover:border-teal-600 text-slate-700 hover:text-teal-700 px-8 py-3 rounded-full font-medium transition-all hover:bg-white"
        >
          {hero.ctaSecondary}
        </a>
      </motion.div>
    </motion.div>
  );
}
