import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useTerminal } from '../context/TerminalContext';
import { Lock, Unlock, Maximize2, Minimize2, X, Terminal as TerminalIcon } from 'lucide-react';
import SnakeGame from './terminal/SnakeGame';

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

const AnimatedCat = () => {
  const [frameIndex, setFrameIndex] = useState(0);
  
  const frames = [
    `
      |\\__/,|   (\`\\
    _.|o o  |_   ) )
  -(((---(((--------
    `,
    `
      |\\__/,|   / /
    _.|-. - |_  \\_\\
  -(((---(((--------
    `,
    `
      |\\__/,|   (\`\\
    _.|o o  |_   ) )
  -(((---(((--------
    `,
    `
      |\\__/,|   / /
    _.|^ ^  |_  \\_\\
  -(((---(((--------
    `
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frames.length);
    }, 250);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="whitespace-pre-wrap leading-tight font-mono text-primary-400 font-bold select-none">
      {frames[frameIndex]}
    </div>
  );
};

const FloatingTerminal = () => {
  const { translations, language } = useLanguage();
  const { isTerminalOpen, setIsTerminalOpen, showMatrix, setShowMatrix, closeMatrix, openMatrix, openTerminal } = useTerminal();
  const [isExpanded, setIsExpanded] = useState(false);
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

  // Função para destacar palavras reservadas
  const renderTextWithHighlight = (text) => {
    if (!text || typeof text !== 'string') return text;
    
    const keywords = ['help', 'skills', 'unlock', 'matrix', 'clear', 'cat', 'whois', 'snake'];
    
    // Regex para encontrar palavras reservadas (case insensitive)
    // Inclui tratamento especial para "sudo rm -rf /" fora do padrão de word boundary tradicional para barra
    const regex = new RegExp(`\\b(${keywords.join('|')})\\b|(sudo rm -rf /)`, 'gi');
    let match;
    let lastIndex = 0;
    const parts = [];
    
    while ((match = regex.exec(text)) !== null) {
      // Adiciona o texto antes da palavra reservada
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${lastIndex}`}>
            {text.substring(lastIndex, match.index)}
          </span>
        );
      }
      
      // Adiciona a palavra reservada com destaque
      parts.push(
        <span key={`keyword-${match.index}`} className="text-accent-400 font-bold">
          {match[0]}
        </span>
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    // Adiciona o texto restante
    if (lastIndex < text.length) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {text.substring(lastIndex)}
        </span>
      );
    }
    
    return parts.length > 0 ? <>{parts}</> : text;
  };

  const commands = {
    help: {
      pt: [
        '╔══════════════════════════════════════════════════════════╗',
        '║              COMANDOS DISPONÍVEIS                        ║',
        '╚══════════════════════════════════════════════════════════╝',
        '',
        '  help      - Exibe esta mensagem de ajuda',
        '  skills    - Mostra minhas habilidades técnicas',
        '  unlock    - Desbloqueia acesso total ao sistema',
        '  matrix    - Ativa o efeito Matrix',
        '  snake     - Jogue o clássico Snake',
        '  cat       - ???',
        '  whois     - Dossiê do Lucas',
        '  clear     - Limpa o histórico do terminal',
        '',
        '💡 Dica: Clique nos botões abaixo para executar rapidamente!'
      ],
      en: [
        '╔══════════════════════════════════════════════════════════╗',
        '║              AVAILABLE COMMANDS                          ║',
        '╚══════════════════════════════════════════════════════════╝',
        '',
        '  help      - Display this help message',
        '  skills    - Show my technical skills',
        '  unlock    - Unlock full system access',
        '  matrix    - Activate Matrix effect',
        '  snake     - Play classic Snake game',
        '  cat       - ???',
        '  whois     - Lucas\' dossier',
        '  clear     - Clear terminal history',
        '',
        '💡 Tip: Click the buttons below for quick execution!'
      ]
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
    cat: {
      pt: 'Invocando assistente felino...',
      en: 'Summoning feline assistant...'
    },
    clear: {
      pt: 'Terminal limpo.',
      en: 'Terminal cleared.'
    }
  };

  // Auto-scroll logic
  const terminalBodyRef = useRef(null);
  
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalHistory]);
  
  useEffect(() => {
    if (isTerminalOpen && terminalHistory.length === 0) {
      setTimeout(() => {
        setTerminalHistory([
          { type: 'system', text: language === 'pt' 
            ? '> Sistema iniciado. Digite "help" para ver comandos disponíveis.'
            : '> System initialized. Type "help" to see available commands.'
          }
        ]);
      }, 500);
    }
  }, [isTerminalOpen, language, terminalHistory.length]);

  // Force full screen on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsExpanded(true);
      }
    };

    // Check initially
    if (window.innerWidth < 768) {
      setIsExpanded(true);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCommand = (cmd, bypassSecurity = false) => {
    const command = cmd.toLowerCase().trim();
    const lang = language === 'pt' ? 'pt' : 'en';
    
    let newHistory = [...terminalHistory, { type: 'input', text: `$ ${cmd}` }];

    if (command === 'help') {
      const helpLines = commands.help[lang] || commands.help['en'];
      if (Array.isArray(helpLines)) {
        helpLines.forEach(line => {
          newHistory.push({ 
            type: 'output', 
            text: line
          });
        });
      }
      setTerminalHistory(newHistory);
    } else if (command === 'skills') {
      newHistory.push({ 
        type: 'output', 
        text: commands.skills[language] || commands.skills['en']
      });
      setTerminalHistory(newHistory);
      setShowSkills(true);
      setTimeout(() => setShowSkills(false), 8000);
    } else if (command === 'matrix') {
      newHistory.push({ 
        type: 'output', 
        text: commands.matrix[lang] || commands.matrix['en']
      });
      setTerminalHistory(newHistory);
      setTerminalHistory(newHistory);
      openMatrix();
      setMatrixActive(true);
    } else if (command === 'unlock') {
      newHistory.push({ 
        type: 'output', 
        text: commands.unlock[language] || commands.unlock['en']
      });
      setTerminalHistory(newHistory);
      setIsUnlocked(true);
      setTimeout(() => {
        setTerminalHistory(prev => [
          ...prev,
          { 
            type: 'success', 
            text: language === 'pt'
              ? '✓ Acesso concedido! Bem-vindo ao sistema, Neo.'
              : '✓ Access granted! Welcome to the system, Neo.'
          }
        ]);
      }, 1500);
    } else if (command === 'cat') {
      newHistory.push({ 
        type: 'output', 
        text: commands.cat[language] || commands.cat['en']
      });
      
      // Adiciona o componente de animação do gato
      newHistory.push({
        type: 'cat_animation',
        text: 'Cat Animation' // Fallback text if needed, though we will render component
      });
      
      setTerminalHistory(newHistory);

      setTimeout(() => {
         setTerminalHistory(prev => [
          ...prev,
          {
            type: 'system',
            text: language === 'pt' ? 'Miau! 🐱' : 'Meow! 🐱'
          }
        ]);
      }, 2000);

    } else if (command === 'whois') {
      const dossier = language === 'pt' ? [
        '╔══════════════════════════════════════════════════════════╗',
        '║                 DOSSIÊ DO OPERADOR                       ║',
        '╚══════════════════════════════════════════════════════════╝',
        '',
        '  NOME:       Lucas Braz',
        '  CODINOME:   Full Stack Developer',
        '  LOCAL:      Brasil (Base de Operações)',
        '  STATUS:     Disponível para Missões',
        '  STACK:      React, Node.js, PHP, .NET',
        '',
        '  MISSÃO:     "Building the future bit by bit..."',
        '',
        '  [ACESSO AUTORIZADO]'
      ] : [
        '╔══════════════════════════════════════════════════════════╗',
        '║                 OPERATOR DOSSIER                         ║',
        '╚══════════════════════════════════════════════════════════╝',
        '',
        '  NAME:       Lucas Braz',
        '  CODENAME:   Full Stack Developer',
        '  LOCATION:   Brazil (Base of Operations)',
        '  STATUS:     Available for Missions',
        '  STACK:      React, Node.js, PHP, .NET',
        '',
        '  MISSION:    "Building the future bit by bit..."',
        '',
        '  [ACCESS GRANTED]'
      ];

      // Note: handleCommand logic for whois previously added input then output. logic flow preserved.
      
      dossier.forEach(line => {
        newHistory.push({
          type: 'success',
          text: line
        });
      });
      setTerminalHistory(newHistory);

    } else if (command === 'snake') {
      if (window.innerWidth >= 768) {
         setIsExpanded(true); // Full screen for game ONLY on desktop/tablet where it can toggle
      }
      // Mobile is already full screen
      
      newHistory.push({ 
        type: 'output', 
        text: language === 'pt' ? 'Iniciando Snake Game...' : 'Starting Snake Game...'
      });
      newHistory.push({ type: 'game_snake', text: 'Snake Game' });
      setTerminalHistory(newHistory);

    } else if (command === 'sudo rm -rf /') {
      if (!isUnlocked && !bypassSecurity) {
         newHistory.push({ 
          type: 'error', 
          text: language === 'pt' 
            ? 'PERMISSÃO NEGADA: Acesso de superusuário necessário. Digite "unlock" primeiro.' 
            : 'PERMISSION DENIED: Root access required. Type "unlock" first.'
        });
        setTerminalHistory(newHistory);
        return;
      }

      newHistory.push({ 
        type: 'error', 
        text: language === 'pt' 
          ? '⚠️ ATENÇÃO: INICIANDO SEQUÊNCIA DE FORMATAÇÃO GLOBAL...' 
          : '⚠️ WARNING: INITIATING GLOBAL FORMAT SEQUENCE...'
      });
      setTerminalHistory(newHistory);

      // Trigger chaos
      setTimeout(() => {
        document.body.classList.add('self-destruct');
      }, 1000);

      // Blackout and reset
      setTimeout(() => {
        document.body.classList.remove('self-destruct');
        document.body.style.backgroundColor = 'black';
        document.body.style.margin = '0';
        document.body.style.overflow = 'hidden';
        
        document.body.innerHTML = `
          <div style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100vw;
            color: #22c55e;
            font-family: 'Courier New', monospace;
            text-align: center;
            background-color: black;
          ">
            <h1 style="
              font-size: 2.5rem; 
              margin-bottom: 2rem; 
              text-shadow: 0 0 10px #22c55e;
            ">SYSTEM DELETED_</h1>
            
            <p id="f5-msg" style="
              font-size: 1.25rem; 
              opacity: 0; 
              transition: opacity 1s ease-in;
              letter-spacing: 2px;
            ">
              > PRESS <span style="border: 1px solid #22c55e; padding: 2px 6px;">F5</span> TO REBOOT
            </p>
          </div>
        `;
        
        setTimeout(() => {
          const msg = document.getElementById('f5-msg');
          if (msg) {
             msg.style.opacity = '1';
             setInterval(() => {
               msg.style.opacity = (msg.style.opacity === '0' ? '1' : '0');
             }, 800);
          }
        }, 2000);
      }, 4000);

    } else if (command === 'clear') {
      const clearMessage = {
        type: 'success',
        text: language === 'pt'
          ? '🗑️  TERMINAL LIMPO COM SUCESSO!'
          : '🗑️  TERMINAL CLEARED SUCCESSFULLY!'
      };
      setTerminalHistory([clearMessage]);
      setTimeout(() => {
        setTerminalHistory([]);
      }, 1500);
      return;
    } else if (command) {
      newHistory.push({ 
        type: 'error', 
        text: language === 'pt'
          ? `Comando não reconhecido: "${cmd}". Digite "help" para ajuda.`
          : `Command not recognized: "${cmd}". Type "help" for assistance.`
      });
      setTerminalHistory(newHistory);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (terminalInput.trim()) {
      handleCommand(terminalInput);
      setTerminalInput('');
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isTerminalOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsTerminalOpen(true)}
            className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full shadow-2xl shadow-primary-500/50 flex items-center justify-center text-white font-bold text-2xl hover:shadow-primary-500/70 transition-shadow"
          >
            <TerminalIcon className="w-8 h-8" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Terminal Window */}
      <AnimatePresence>
        {isTerminalOpen && (
          <>
            {/* Backdrop when expanded */}
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-dark-500/95 backdrop-blur-sm z-40"
                onClick={() => {
                  // Only allow closing full screen backdrop click on desktop
                  if (window.innerWidth >= 768) setIsExpanded(false);
                }}
              />
            )}

            {/* Matrix Rain */}
            {matrixActive && <MatrixRain isActive={matrixActive} />}

            {/* Terminal */}
            <motion.div
              initial={{ 
                scale: 0, 
                x: '100%', 
                y: '100%',
                opacity: 0 
              }}
              animate={{ 
                scale: 1,
                x: isExpanded ? 0 : 0,
                y: isExpanded ? 0 : 0,
                opacity: 1,
                width: isExpanded ? '100vw' : '600px',
                height: isExpanded ? '100vh' : '500px'
              }}
              exit={{ 
                scale: 0, 
                x: '100%', 
                y: '100%',
                opacity: 0 
              }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`
                fixed z-[100]
                ${isExpanded 
                  ? 'inset-0 md:p-8 p-0' 
                  : 'inset-0 md:inset-auto md:bottom-8 md:right-8 md:w-[600px]'
                }
              `}
            >
              <div className="h-full flex flex-col">
                {/* Terminal Header */}
                <div className="bg-dark-200 border-2 border-primary-500/30 rounded-none md:rounded-t-xl p-3 flex items-center gap-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsTerminalOpen(false)}
                      className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                    />
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors hidden md:block"
                    />
                    <button className="w-3 h-3 rounded-full bg-primary-500 hover:bg-primary-600 transition-colors" />
                  </div>
                  
                  <div className="flex-1 text-center flex items-center justify-center gap-2">
                    {isUnlocked ? (
                      <Unlock className="w-4 h-4 text-primary-400 animate-pulse" />
                    ) : (
                      <Lock className="w-4 h-4 text-red-400" />
                    )}
                    <span className="text-primary-300 font-mono text-sm">lucas@matrix:~$</span>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-primary-400 hover:text-primary-300 transition-colors hidden md:block"
                    >
                      {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsTerminalOpen(false)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Terminal Body */}
                <div 
                  ref={terminalBodyRef}
                  className={`
                  bg-dark-300/50 backdrop-blur-sm border-2 border-t-0 border-primary-500/30 rounded-none md:rounded-b-xl p-6 
                  ${isExpanded ? 'flex-1' : 'h-[500px]'}
                  overflow-y-auto font-mono text-sm
                `}>
                  {/* Terminal History */}
                  <div className="space-y-2 mb-4">
                    {terminalHistory.map((entry, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`
                          whitespace-pre-wrap leading-tight
                          ${entry.type === 'input' ? 'text-primary-300' : ''}
                          ${entry.type === 'output' ? 'text-accent-300' : ''}
                          ${entry.type === 'error' ? 'text-red-400' : ''}
                          ${entry.type === 'success' ? 'text-primary-400' : ''}
                          ${entry.type === 'system' ? 'text-primary-200/70' : ''}
                        `}
                      >
                        {entry.type === 'cat_animation' ? (
                          <AnimatedCat />
                        ) : entry.type === 'game_snake' ? (
                          <SnakeGame isExpanded={isExpanded} />
                        ) : (
                          renderTextWithHighlight(entry.text)
                        )}
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
                  {/* Input Form */}
                  <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
                    <span className="text-primary-400 shrink-0">$</span>
                    
                    <div className="relative flex-1 h-6 flex items-center">
                      {/* Highlighted Text Layer */}
                      <div 
                        className="absolute inset-0 pointer-events-none font-mono text-primary-100 whitespace-pre"
                        aria-hidden="true"
                      >
                        {renderTextWithHighlight(terminalInput)}
                      </div>

                      {/* Transparent Input Layer */}
                      <input
                        ref={inputRef}
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        className="w-full h-full bg-transparent border-none outline-none text-transparent font-mono caret-primary-400 z-10"
                        placeholder={!terminalInput ? (language === 'pt' ? 'Digite um comando...' : 'Type a command...') : ''}
                        autoFocus
                        autoComplete="off"
                        spellCheck="false"
                      />
                    </div>

                    <motion.div
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-4 bg-primary-400 shrink-0"
                    />
                  </form>

                  {/* Quick Commands */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {['skills', 'help', 'clear', 'matrix', 'cat'].map((cmd) => (
                      <motion.button
                        key={cmd}
                        onClick={() => {
                          handleCommand(cmd);
                          setTerminalInput('');
                          inputRef.current?.focus();
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-dark-200/50 border border-primary-500/30 rounded text-primary-300 font-mono text-xs hover:bg-dark-100/50 hover:border-primary-500/50 transition-all"
                      >
                        {cmd}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-xl blur-xl -z-10 opacity-50" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Matrix Choice Modal */}
      <AnimatePresence>
        {showMatrix && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center font-mono overflow-hidden"
          >
            {/* Background Matrix Rain */}
            <div className="absolute inset-0 opacity-30">
              <MatrixRain isActive={true} />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center space-y-12 p-4 max-w-4xl">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="space-y-4"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-green-500 tracking-wider glitch-text" style={{ textShadow: '0 0 10px #0f0' }}>
                  THE MATRIX HAS YOU
                </h1>
                <p className="text-xl md:text-2xl text-green-400 animate-pulse">
                  {language === 'pt' 
                    ? 'A escolha é sua, Neo.' 
                    : 'The choice is yours, Neo.'}
                </p>
              </motion.div>

              <div className="flex flex-col md:flex-row gap-12 items-center justify-center mt-12">
                {/* Blue Pill */}
                <motion.button
                  whileHover={{ scale: 1.1, filter: 'brightness(1.2)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    closeMatrix();
                    setMatrixActive(false);
                    handleCommand('clear');
                  }}
                  className="group relative"
                >
                  <div className="w-32 h-16 bg-gradient-to-b from-blue-400 to-blue-700 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.6)] border border-blue-300/30 flex items-center justify-center overflow-hidden">
                    <div className="absolute top-2 left-4 w-20 h-6 bg-white/20 rounded-full blur-sm" />
                  </div>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-blue-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {language === 'pt' ? 'Ignorância' : 'Ignorance'}
                  </span>
                </motion.button>

                {/* Red Pill */}
                <motion.button
                  whileHover={{ scale: 1.1, filter: 'brightness(1.2)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    closeMatrix();
                    openTerminal();
                    
                    // 1. Executa o unlock visualmente
                    setTimeout(() => {
                      handleCommand('unlock');
                    }, 200);

                    // 2. Inicia a autodestruição após a mensagem de sucesso do unlock
                    setTimeout(() => {
                      handleCommand('sudo rm -rf /', true);
                    }, 2000);
                  }}
                  className="group relative"
                >
                  <div className="w-32 h-16 bg-gradient-to-b from-red-400 to-red-700 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.6)] border border-red-300/30 flex items-center justify-center overflow-hidden">
                    <div className="absolute top-2 left-4 w-20 h-6 bg-white/20 rounded-full blur-sm" />
                  </div>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-red-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {language === 'pt' ? 'Verdade' : 'Truth'}
                  </span>
                </motion.button>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-green-600/60 text-sm max-w-md mx-auto mt-8"
              >
                {language === 'pt'
                  ? '"Lembre-se: tudo o que ofereço é a verdade. Nada mais."'
                  : '"Remember: all I\'m offering is the truth. Nothing more."'}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingTerminal;
