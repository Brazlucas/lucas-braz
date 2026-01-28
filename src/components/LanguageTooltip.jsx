import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const LanguageTooltip = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const { language } = useLanguage();
  const tooltipRef = useRef(null);

  useEffect(() => {
    // Calcula a posição baseado no elemento language-selector
    const calculatePosition = () => {
      const usButton = document.getElementById('us-language-button');
      if (usButton && tooltipRef.current) {
        const rect = usButton.getBoundingClientRect();
        const tooltipWidth = tooltipRef.current.offsetWidth; // largura real do tooltip
        setPosition({
          top: rect.bottom + 35, // espaço otimizado para a seta
          left: rect.left + (rect.width / 2) - (tooltipWidth / 2), // centralizado no botão
        });
      }
    };

    // Detecta scroll para esconder o tooltip quando o header sumir
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsVisible(false);
      }
    };

    // Detecta clique no botão US para esconder o tooltip
    const handleUsButtonClick = () => {
      setIsVisible(false);
    };

    const usButton = document.getElementById('us-language-button');
    
    // Calcula na montagem e quando a janela é redimensionada
    calculatePosition();
    window.addEventListener('resize', calculatePosition);
    window.addEventListener('scroll', handleScroll);
    if (usButton) {
      usButton.addEventListener('click', handleUsButtonClick);
    }
    // Recalcula após um pequeno delay para garantir que o tooltip foi renderizado
    setTimeout(calculatePosition, 100);

    // Timer para esconder após 5 segundos
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', handleScroll);
      if (usButton) {
        usButton.removeEventListener('click', handleUsButtonClick);
      }
      clearTimeout(hideTimer);
    };
  }, [language]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={tooltipRef}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
          }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ 
            duration: 0.4, 
            ease: "easeOut",
          }}
          style={{
            position: 'fixed',
            top: `${position.top}px`,
            left: `${position.left}px`,
            zIndex: 100,
            pointerEvents: 'none',
          }}
        >
          {/* Balão de texto */}
          <div className="relative">
            <motion.div
              animate={{ 
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-gradient-to-br from-accent-500 to-primary-600 text-white px-6 py-3 rounded-2xl shadow-2xl relative"
            >
              {/* Brilho interno */}
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm"></div>
              
              {/* Conteúdo */}
              <div className="relative flex items-center gap-2">
                <span className="text-lg font-semibold">English?</span>
                <motion.span
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-xl"
                >
                  🌍
                </motion.span>
              </div>

              {/* Sombra colorida */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500 to-primary-600 rounded-2xl blur-xl opacity-50 -z-10"></div>
            </motion.div>

            {/* Setinha apontando para cima */}
            <motion.div
              animate={{ 
                y: [0, -5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ right: '30%', top: '-3rem' }}
              className="absolute"
            >
              <svg 
                width="60" 
                height="60" 
                viewBox="0 0 60 60" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-lg"
              >
                {/* Seta apontando para cima */}
                <path 
                  d="M 30 10 L 30 40 M 30 10 L 22 18 M 30 10 L 38 18" 
                  stroke="url(#gradient)" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2dd4bf" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Partículas decorativas */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full blur-sm"
            ></motion.div>
            
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute -bottom-1 -left-2 w-2 h-2 bg-pink-400 rounded-full blur-sm"
            ></motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LanguageTooltip;
