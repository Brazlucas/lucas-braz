import { createContext, useContext, useState } from 'react';

const TerminalContext = createContext();

export const TerminalProvider = ({ children }) => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);

  const openTerminal = () => setIsTerminalOpen(true);
  const closeTerminal = () => setIsTerminalOpen(false);
  const toggleTerminal = () => setIsTerminalOpen(prev => !prev);
  const openMatrix = () => setShowMatrix(true);
  const closeMatrix = () => setShowMatrix(false);

  return (
    <TerminalContext.Provider value={{ 
      isTerminalOpen, 
      setIsTerminalOpen, 
      openTerminal, 
      closeTerminal, 
      toggleTerminal,
      showMatrix,
      setShowMatrix,
      openMatrix,
      closeMatrix
    }}>
      {children}
    </TerminalContext.Provider>
  );
};

export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
};
