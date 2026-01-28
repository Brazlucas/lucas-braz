import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, X, Terminal, Cpu, Palette, Layers, Code } from 'lucide-react';
import TypingBackground from './TypingBackground';
import { useLanguage } from '../context/LanguageContext';
import { useTerminal } from '../context/TerminalContext';

const Hero = () => {
  const { translations, language } = useLanguage();
  const { openTerminal } = useTerminal();
  const [showPills, setShowPills] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const skillsData = {
    backend: {
      title: 'Backend Development',
      description: language === 'pt' 
        ? 'Arquitetura robusta, APIs escaláveis e alta performance.' 
        : 'Robust architecture, scalable APIs and high performance.',
      techs: ['Node.js', 'PHP', 'Laravel', 'C#', '.NET', 'Golang', 'SQL'],
      color: 'from-red-500 to-pink-600',
      btnColor: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-red-400',
      targetSection: '#backend-section'
    },
    frontend: {
      title: 'Frontend Development',
      description: language === 'pt'
        ? 'Interfaces imersivas, animações fluidas e UX excepcional.'
        : 'Immersive interfaces, fluid animations and exceptional UX.',
      techs: ['React', 'Vue.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
      color: 'from-cyan-500 to-blue-600',
      btnColor: 'bg-cyan-500 hover:bg-cyan-600',
      textColor: 'text-cyan-400',
      targetSection: '#frontend-section'
    }
  };
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
        <AnimatePresence mode="wait">
          {!showPills ? (
            <motion.button
              key="reveal-btn"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPills(true)}
              className="px-6 py-2 bg-dark-300/50 border border-primary-500/30 rounded-full text-primary-300 font-mono text-sm hover:bg-dark-200/50 hover:border-primary-500/60 transition-all flex items-center gap-2 group backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-75" />
              {language === 'pt' ? 'Escolha seu caminho' : 'Choose your path'}
            </motion.button>
          ) : (
            <motion.div
              key="pills-container"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex gap-8 items-center justify-center relative z-10"
            >
              {/* Backend Pill (Red) */}
              <motion.a
                href="#backend-section"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveModal('backend');
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

              {/* Frontend Pill (Blue) */}
              <motion.a
                href="#frontend-section"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveModal('frontend');
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
          )}
        </AnimatePresence>
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
      {/* Advanced Skill Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          >
            {activeModal === 'backend' ? (
              // BACKEND MODAL - CYBERPUNK STYLE
              <motion.div
                initial={{ scale: 0.9, opacity: 0, rotateX: 20 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                exit={{ scale: 0.9, opacity: 0, rotateX: -20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl bg-black border-2 border-red-500/50 rounded-sm p-1 font-mono relative overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.3)]"
              >
                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-10 z-20" 
                     style={{ 
                       background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', 
                       backgroundSize: '100% 2px, 3px 100%' 
                     }} 
                />
                
                <div className="bg-dark-500/90 p-8 relative z-10 h-full">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-8 border-b border-red-500/30 pb-4">
                    <div className="flex items-center gap-3">
                      <Terminal className="w-6 h-6 text-red-500" />
                      <h3 className="text-2xl text-red-500 font-bold tracking-widest glitch-text">
                        SYSTEM.BACKEND_ACCESS
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-red-500/50 text-xs font-bold animate-pulse">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      LIVE CONNECTION
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column - Info */}
                    <div className="space-y-6">
                      <div className="text-red-400/80 text-sm leading-relaxed border-l-2 border-red-500/30 pl-4">
                        <p className="mb-2 opacity-50 text-xs">// SYSTEM DESCRIPTION</p>
                        {skillsData.backend.description}
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-red-500 text-xs font-bold mb-2">[ DETECTED_PROTOCOLS ]</p>
                        {skillsData.backend.techs.map((tech, i) => (
                          <motion.div 
                            key={tech}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 text-red-300/90 text-sm hover:bg-red-500/10 p-1 rounded transition-colors cursor-default group"
                          >
                            <span className="text-red-500 opacity-50 group-hover:opacity-100">{'>'}</span>
                            <span className="font-bold">{tech}</span>
                            <span className="ml-auto text-xs opacity-30">v.{Math.floor(Math.random() * 10)}.0</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Right Column - Stats/Visuals */}
                    <div className="flex flex-col gap-4">
                      <div className="border border-red-500/20 p-4 bg-red-900/5 text-xs text-red-500/60 font-mono rounded">
                        <div className="flex justify-between mb-1"><span>CPU_LOAD</span><span>98%</span></div>
                        <div className="w-full bg-red-900/30 h-1 mb-4 overflow-hidden">
                          <motion.div 
                            animate={{ width: ['90%', '98%', '92%'] }} 
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="bg-red-500 h-full" 
                          />
                        </div>
                        
                        <div className="flex justify-between mb-1"><span>MEMORY</span><span>64TB</span></div>
                        <div className="w-full bg-red-900/30 h-1 mb-4 overflow-hidden">
                          <motion.div 
                            animate={{ width: ['40%', '60%', '45%'] }} 
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="bg-red-500 h-full" 
                          />
                        </div>

                        <div className="mt-4 space-y-1 opacity-50">
                          {Array(4).fill(0).map((_, i) => (
                            <div key={i} className="truncate">0x{Math.random().toString(16).substr(2, 8).toUpperCase()}... [OK]</div>
                          ))}
                        </div>
                      </div>

                      <div className="flex-1 border border-red-500/20 p-4 flex items-center justify-center relative overflow-hidden">
                        <Cpu className="w-24 h-24 text-red-500/10 absolute animate-spin-slow" />
                        <div className="text-center z-10">
                          <div className="text-4xl font-bold text-red-500">100%</div>
                          <div className="text-xs text-red-400">SECURE</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="mt-8 flex gap-4 pt-4 border-t border-red-500/30">
                    <button 
                      onClick={() => {
                        const section = document.querySelector(skillsData.backend.targetSection);
                        section?.scrollIntoView({ behavior: 'smooth' });
                        setActiveModal(null);
                      }}
                      className="flex-1 bg-red-600 hover:bg-red-500 text-black font-bold py-3 px-6 transition-all hover:translate-x-1 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] flex items-center justify-center gap-2 group"
                    >
                      <Code className="w-4 h-4" />
                      {'>'} EXECUTE_VIEW_SKILLS
                    </button>
                    <button 
                      onClick={() => setActiveModal(null)} 
                      className="px-6 py-3 border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors font-bold"
                    >
                      [ CLOSE ]
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              // FRONTEND MODAL - GLASSMORPHISM STYLE
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.2)]"
              >
                {/* Background Orbs */}
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
                
                <div className="relative z-10">
                  <div className="text-center mb-10">
                    <motion.div 
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl mb-4 border border-white/10"
                    >
                      <Palette className="w-8 h-8 text-cyan-300" />
                    </motion.div>
                    <h3 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 mb-4">
                      Frontend Experience
                    </h3>
                    <p className="text-blue-100/70 text-lg max-w-lg mx-auto leading-relaxed">
                      {skillsData.frontend.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                    {skillsData.frontend.techs.map((tech, i) => (
                      <motion.div 
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                        className="p-4 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-md flex flex-col items-center justify-center gap-2 cursor-default group transition-all"
                      >
                        <Layers className="w-5 h-5 text-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                        <span className="text-cyan-100 font-medium">{tech}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex gap-4 justify-center">
                    <button 
                      onClick={() => {
                        const section = document.querySelector(skillsData.frontend.targetSection);
                        section?.scrollIntoView({ behavior: 'smooth' });
                        setActiveModal(null);
                      }}
                      className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all flex items-center gap-2"
                    >
                      <span>{language === 'pt' ? 'Ver Habilidades' : 'View Skills'}</span>
                      <ArrowDown className="w-4 h-4 -rotate-90" />
                    </button>
                    <button 
                      onClick={() => setActiveModal(null)} 
                      className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
