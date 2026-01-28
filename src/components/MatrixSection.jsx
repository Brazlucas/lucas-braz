import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Lock, Unlock } from 'lucide-react';

const MatrixRain = ({ isActive }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;
    
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    
    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = Math.random() * canvas.height / fontSize;
    }
    
    const draw = () => {
      ctx.fillStyle = 'rgba(4, 16, 13, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0F9';
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };
    
    const interval = setInterval(draw, 30);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: isActive ? 1 : 0, transition: 'opacity 1s' }}
    />
  );
};

const MatrixSection = () => {
  const { translations } = useLanguage();
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const inputRef = useRef(null);

  const skills = {
    frontend: ['React', 'Vue.js', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind'],
    backend: ['Node.js', 'PHP', 'Laravel', 'C#', '.NET', 'Golang'],
    database: ['SQL', 'PostgreSQL', 'MySQL'],
    devops: ['Docker', 'Kubernetes', 'Git Actions']
  };

  const commands = {
    help: {
      pt: 'Comandos disponíveis: help, skills, matrix, unlock, clear',
      en: 'Available commands: help, skills, matrix, unlock, clear'
    },
    skills: {
      pt: 'Carregando habilidades do desenvolvedor...',
      en: 'Loading developer skills...'
    },
    matrix: {
      pt: 'Iniciando protocolo Matrix...',
      en: 'Initiating Matrix protocol...'
    },
    unlock: {
      pt: 'Desbloqueando acesso total...',
      en: 'Unlocking full access...'
    },
    clear: {
      pt: 'Terminal limpo.',
      en: 'Terminal cleared.'
    }
  };

  useEffect(() => {
    // Welcome message
    setTimeout(() => {
      setTerminalHistory([
        { type: 'system', text: translations.language === 'pt' 
          ? '> Sistema iniciado. Digite "help" para ver comandos disponíveis.'
          : '> System initialized. Type "help" to see available commands.'
        }
      ]);
    }, 500);
  }, [translations.language]);

  const handleCommand = (cmd) => {
    const command = cmd.toLowerCase().trim();
    
    const newHistory = [...terminalHistory, { type: 'input', text: `$ ${cmd}` }];

    if (command === 'help') {
      newHistory.push({ 
        type: 'output', 
        text: commands.help[translations.language]
      });
    } else if (command === 'skills') {
      newHistory.push({ 
        type: 'output', 
        text: commands.skills[translations.language]
      });
      setShowSkills(true);
      setTimeout(() => setShowSkills(false), 8000);
    } else if (command === 'matrix') {
      newHistory.push({ 
        type: 'output', 
        text: commands.matrix[translations.language]
      });
      setMatrixActive(true);
      setTimeout(() => setMatrixActive(false), 5000);
    } else if (command === 'unlock') {
      newHistory.push({ 
        type: 'output', 
        text: commands.unlock[translations.language]
      });
      setIsUnlocked(true);
      setTimeout(() => {
        newHistory.push({ 
          type: 'success', 
          text: translations.language === 'pt'
            ? '✓ Acesso concedido! Bem-vindo ao sistema, Neo.'
            : '✓ Access granted! Welcome to the system, Neo.'
        });
        setTerminalHistory([...newHistory]);
      }, 1500);
    } else if (command === 'clear') {
      setTerminalHistory([]);
      return;
    } else if (command) {
      newHistory.push({ 
        type: 'error', 
        text: translations.language === 'pt'
          ? `Comando não reconhecido: "${cmd}". Digite "help" para ajuda.`
          : `Command not recognized: "${cmd}". Type "help" for assistance.`
      });
    }

    setTerminalHistory(newHistory);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (terminalInput.trim()) {
      handleCommand(terminalInput);
      setTerminalInput('');
    }
  };

  return (
    <section id="matrix" className="relative py-20 px-8 overflow-hidden bg-dark-500 min-h-screen flex items-center">
      {/* Matrix Rain Effect */}
      <MatrixRain isActive={matrixActive} />
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-500 via-dark-400 to-dark-500" />
      
      {/* Scanlines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(34,197,94,0.1)_2px,rgba(34,197,94,0.1)_4px)]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            {isUnlocked ? (
              <Unlock className="w-8 h-8 text-primary-400 animate-pulse" />
            ) : (
              <Lock className="w-8 h-8 text-red-400" />
            )}
            <h2 className="text-4xl md:text-5xl font-bold font-mono">
              <span className="text-primary-400">{'>'}</span>
              <span className="text-white ml-2">MATRIX_TERMINAL</span>
              <span className="text-primary-400 animate-pulse">_</span>
            </h2>
          </div>
          <p className="text-primary-200/60 font-mono text-sm">
            {translations.language === 'pt' 
              ? 'Terminal interativo - Digite comandos para explorar'
              : 'Interactive terminal - Type commands to explore'}
          </p>
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          {/* Terminal Header */}
          <div className="bg-dark-200 border-2 border-primary-500/30 rounded-t-xl p-3 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-primary-500" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-primary-300 font-mono text-sm">lucas@matrix:~$</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="bg-dark-300/50 backdrop-blur-sm border-2 border-t-0 border-primary-500/30 rounded-b-xl p-6 min-h-[400px] max-h-[500px] overflow-y-auto font-mono text-sm">
            {/* Terminal History */}
            <div className="space-y-2 mb-4">
              {terminalHistory.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    ${entry.type === 'input' ? 'text-primary-300' : ''}
                    ${entry.type === 'output' ? 'text-accent-300' : ''}
                    ${entry.type === 'error' ? 'text-red-400' : ''}
                    ${entry.type === 'success' ? 'text-primary-400' : ''}
                    ${entry.type === 'system' ? 'text-primary-200/70' : ''}
                  `}
                >
                  {entry.text}
                </motion.div>
              ))}
            </div>

            {/* Skills Display */}
            <AnimatePresence>
              {showSkills && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 space-y-3"
                >
                  {Object.entries(skills).map(([category, items], idx) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.2 }}
                      className="border-l-2 border-primary-500 pl-3"
                    >
                      <div className="text-accent-400 font-bold mb-1">
                        [{category.toUpperCase()}]
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill, i) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.2 + i * 0.1 }}
                            className="px-2 py-1 bg-primary-500/10 text-primary-300 rounded border border-primary-500/30 text-xs"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-primary-400">$</span>
              <input
                ref={inputRef}
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-primary-100 font-mono caret-primary-400"
                placeholder={translations.language === 'pt' ? 'Digite um comando...' : 'Type a command...'}
                autoFocus
              />
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-4 bg-primary-400"
              />
            </form>
          </div>

          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-xl blur-xl -z-10 opacity-50" />
        </motion.div>

        {/* Quick Commands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-3 justify-center"
        >
          {['help', 'skills', 'matrix', 'unlock'].map((cmd) => (
            <motion.button
              key={cmd}
              onClick={() => {
                setTerminalInput(cmd);
                inputRef.current?.focus();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-dark-200/50 border border-primary-500/30 rounded-lg text-primary-300 font-mono text-sm hover:bg-dark-100/50 hover:border-primary-500/50 transition-all"
            >
              {cmd}
            </motion.button>
          ))}
        </motion.div>

        {/* Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <p className="text-primary-300/40 text-xs font-mono">
            {translations.language === 'pt'
              ? '💡 Dica: Tente o comando "unlock" para acesso total'
              : '💡 Hint: Try the "unlock" command for full access'}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MatrixSection;
