import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import TypingBackground from './TypingBackground';
import { useLanguage } from '../context/LanguageContext';
import { useTerminal } from '../context/TerminalContext';

const Hero = () => {
  const { translations } = useLanguage();
  const { openTerminal } = useTerminal();
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

      {/* Matrix Pills - Choose Your Path */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex gap-8 items-center justify-center my-8 relative z-10"
      >
        {/* Backend Pill (Red) */}
        <motion.a
          href="#backend-section"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#backend-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="group relative cursor-pointer"
        >
          {/* Hand holding pill */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
            
            {/* Hand emoji base */}
            <div className="relative text-6xl transform group-hover:rotate-12 transition-transform duration-300">
              🤚
              {/* Pill on hand */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-6 bg-gradient-to-br from-red-400 to-pink-600 rounded-full shadow-2xl shadow-red-500/50 flex items-center justify-center group-hover:animate-pulse">
                <span className="text-[8px] font-bold text-white tracking-tight">BACK</span>
              </div>
            </div>
          </div>
          
          {/* Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
            <span className="text-xs font-mono text-red-300 opacity-0 group-hover:opacity-100 transition-opacity">
              Backend
            </span>
          </motion.div>
        </motion.a>

        {/* VS Divider - Now opens terminal! */}
        <motion.button
          onClick={(e) => {
            e.preventDefault();
            openTerminal();
          }}
          whileHover={{ scale: 1.2, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          className="text-2xl font-bold text-primary-400/30 hover:text-primary-400 font-mono cursor-pointer transition-colors relative group"
        >
          ⚡
          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <span className="text-xs font-mono text-primary-300 bg-dark-200 px-3 py-1 rounded-full border border-primary-500/30">
              Matrix Terminal
            </span>
          </motion.div>
        </motion.button>

        {/* Frontend Pill (Blue) */}
        <motion.a
          href="#frontend-section"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#frontend-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="group relative cursor-pointer"
        >
          {/* Hand holding pill */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
            
            {/* Hand emoji base */}
            <div className="relative text-6xl transform group-hover:-rotate-12 transition-transform duration-300">
              🤚
              {/* Pill on hand */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-6 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full shadow-2xl shadow-cyan-500/50 flex items-center justify-center group-hover:animate-pulse">
                <span className="text-[8px] font-bold text-white tracking-tight">FRONT</span>
              </div>
            </div>
          </div>
          
          {/* Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
            <span className="text-xs font-mono text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
              Frontend
            </span>
          </motion.div>
        </motion.a>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-lg md:text-xl text-primary-200/80 max-w-2xl mt-4 relative z-10"
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
