import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Cat } from 'lucide-react';

const floatingItems = [
  'console.log()', '<div>', 'import', 'export', 'npm', 'git', 
  '{}', '[]', '=>', 'async', 'await', 'function', 'class', 
  'return', 'true', 'false', 'null', 'undefined', '<?php', 
  '$this->', '->where()', 'public', 'private', '@media', 
  '#root', '.class', 'id', 'const', 'let', 'var',
  '🐱', '🐈', '😺', '😸', '😻', '😼', '😽', '🙀', '😿', '😾',
  '010101', '101010', '110011', '001100', '111000', '000111',
  '111111', '000000', '101101', '010010', '110110', '001001'
];

const isBinary = (text) => /^[01]+$/.test(text);
const isCat = (text) => ['🐱', '🐈', '😺', '😸', '😻', '😼', '😽', '🙀', '😿', '😾'].includes(text);

const BackgroundAnimation = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Generate random elements
    const count = 30; // Increased count for more density
    const newElements = Array.from({ length: count }).map((_, i) => ({
      id: i,
      text: floatingItems[Math.floor(Math.random() * floatingItems.length)],
      x: Math.random() * 100, // Random start position %
      y: Math.random() * 100, // Random start position %
      duration: 15 + Math.random() * 20, // Random duration
      delay: Math.random() * 5,
      scale: 0.5 + Math.random() * 1,
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Background with slight transparency to show body color if needed, or just dark */}
      <div className="absolute inset-0 bg-slate-900" />
      
      {/* Animated Code Snippets & Cats */}
      {elements.map((el) => (
        <motion.div
          key={el.id}
          initial={{ 
            x: `${el.x}vw`, 
            y: '110vh', 
            opacity: 0 
          }}
          animate={{ 
            y: '-10vh', 
            opacity: [0, 0.4, 0.4, 0],
            rotate: [0, Math.random() * 360]
          }}
          transition={{ 
            duration: el.duration, 
            repeat: Infinity, 
            delay: el.delay,
            ease: "linear"
          }}
          className={`absolute font-mono font-bold whitespace-nowrap select-none ${
            isCat(el.text) 
              ? 'text-2xl opacity-50' 
              : isBinary(el.text)
                ? 'text-emerald-500/40 tracking-widest' // Matrix style for binary
                : 'text-blue-500/20'
          }`}
          style={{ 
            fontSize: isCat(el.text) ? `${el.scale * 1.5}rem` : `${el.scale}rem`,
            left: 0,
            top: 0
          }}
        >
          {el.text}
        </motion.div>
      ))}

      {/* Glowing Orbs for "Fantasy" feel */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"
      />
    </div>
  );
};

export default BackgroundAnimation;
