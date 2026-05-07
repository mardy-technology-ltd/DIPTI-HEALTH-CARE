'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroImage() {
  return (
    <div className="relative w-full h-[450px] lg:h-[650px] flex justify-center items-center">
      {/* Decorative background glow for the image */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-teal-500/20 blur-3xl rounded-full w-3/4 h-3/4 mx-auto my-auto z-0"
      />
      
      {/* Image container with floating effect */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md lg:max-w-lg aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm"
      >
        <Image
          src="/nurse_portrait.png"
          alt="Dipti Marandi - Senior Staff Nurse"
          fill
          className="object-cover"
          priority
        />
        
        {/* Decorative overlay badge */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute bottom-6 -right-2 md:right-[-20px] bg-white/90 backdrop-blur-md shadow-xl p-4 rounded-xl border border-teal-100 flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-xl">
            10+
          </div>
          <div>
            <p className="text-slate-800 font-bold text-sm">Years of</p>
            <p className="text-teal-600 text-xs font-semibold uppercase">Experience</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
