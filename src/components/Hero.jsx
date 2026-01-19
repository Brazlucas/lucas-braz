import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import TypingBackground from './TypingBackground';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { translations } = useLanguage();
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center p-8 relative overflow-hidden bg-slate-900">
      <TypingBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-4 relative z-10"
      >
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
          Lucas Braz
        </h1>
        <h2 className="text-2xl md:text-3xl text-slate-300 font-semibold">
          {translations.hero.role}
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-lg md:text-xl text-slate-400 max-w-2xl mt-4 relative z-10"
      >
        {translations.hero.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-12 relative z-10"
      >
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a 
            href="#contact"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors shadow-lg shadow-blue-500/30"
          >
            {translations.hero.contactBtn}
          </a>
          <a 
            href={`${import.meta.env.BASE_URL}cv-lucas-2026.pdf`}
            download
            className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-medium transition-colors border border-slate-700"
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
        <ArrowDown className="w-8 h-8 text-slate-500" />
      </motion.div>
    </section>
  );
};

export default Hero;
