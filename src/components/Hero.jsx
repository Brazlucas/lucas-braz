import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, X, Terminal, Cpu, Palette, Layers, Code } from 'lucide-react';
import TypingBackground from './TypingBackground';
import { useLanguage } from '../context/LanguageContext';
import { useTerminal } from '../context/TerminalContext';

const Hero = () => {
  const { translations, language } = useLanguage();
  const { openMatrix } = useTerminal();

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center p-8 relative overflow-hidden bg-dark-500">
      <TypingBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-teal-900/20 to-cyan-900/20 -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-4 relative z-10"
      >
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-accent-400 to-emerald-400 mb-4">
          Lucas Braz
        </h1>
        <h2 className="text-2xl md:text-3xl text-primary-100 font-semibold">
          {translations.hero.role}
        </h2>
      </motion.div>

   

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-lg md:text-xl text-primary-200/80 max-w-2xl mt-4 relative z-10"
      >
        {translations.hero.description}
      </motion.p>

      <div className="h-32 flex items-center justify-center my-4 relative z-20">
        <motion.button
          key="reveal-btn"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openMatrix}
          className="px-6 py-2 bg-dark-300/50 border border-primary-500/30 rounded-full text-primary-300 font-mono text-sm hover:bg-dark-200/50 hover:border-primary-500/60 transition-all flex items-center gap-2 group backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-75" />
          {language === 'pt' ? 'Escolha seu caminho' : 'Choose your path'}
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-12 relative z-10"
      >
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a 
            href="#contact"
            className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-medium transition-all shadow-lg shadow-primary-500/40 hover:shadow-accent-500/40"
          >
            {translations.hero.contactBtn}
          </a>
          <a 
            href={`${import.meta.env.BASE_URL}cv-lucas-2026.pdf`}
            download
            className="px-8 py-3 bg-dark-200 hover:bg-dark-100 text-primary-100 rounded-full font-medium transition-colors border border-primary-700/50"
          >
            {translations.hero.downloadCv}
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10"
      >
        <ArrowDown className="w-8 h-8 text-primary-600" />
      </motion.div>

      {/* Floating Tech Stack Icons */}
      <motion.img
        src={`${import.meta.env.BASE_URL}images/PHP-logo.svg.png`}
        alt="PHP"
        className="absolute left-5 top-20 md:left-20 md:top-32 w-16 h-16 md:w-24 md:h-24 object-contain opacity-30 hover:opacity-60 transition-opacity duration-300"
        initial={{ opacity: 0, x: -50 }}
        animate={{ 
          opacity: 0.3, 
          x: 0,
          y: [0, -15, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          opacity: { duration: 1 },
          x: { duration: 1 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      <motion.img
        src={`${import.meta.env.BASE_URL}images/Typescript_logo_2020.svg.png`}
        alt="TypeScript"
        className="absolute right-5 bottom-32 md:right-20 md:bottom-40 w-16 h-16 md:w-24 md:h-24 object-contain opacity-30 hover:opacity-60 transition-opacity duration-300"
        initial={{ opacity: 0, x: 50 }}
        animate={{ 
          opacity: 0.3, 
          x: 0,
          y: [0, 15, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          opacity: { duration: 1 },
          x: { duration: 1 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
      />
    </section>
  );
};

export default Hero;
