import { useState, useEffect } from 'react';

const useKonamiCode = () => {
  const [isRetroMode, setIsRetroMode] = useState(false);
  const konamiCode = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];
  const [keyIndex, setKeyIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Create a copy of the index for the check
      const currentKey = e.key;
      const expectedKey = konamiCode[keyIndex];

      if (currentKey === expectedKey) {
        // Move to next key
        const nextIndex = keyIndex + 1;
        setKeyIndex(nextIndex);

        if (nextIndex === konamiCode.length) {
          // Success!
          setIsRetroMode(prev => !prev);
          setKeyIndex(0); // Reset
          
          // Optional: sound effect could go here
        }
      } else {
        // Fail, reset
        setKeyIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyIndex]);

  useEffect(() => {
    if (isRetroMode) {
      document.body.classList.add('retro-mode');
    } else {
      document.body.classList.remove('retro-mode');
    }
  }, [isRetroMode]);

  return isRetroMode;
};

export default useKonamiCode;
