import { createContext, useState, useContext } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('pt'); // Default to Portuguese

  const t = (section, key) => {
    if (!translations[language][section]) {
      console.warn(`Section ${section} not found in translations`);
      return key;
    }
    return translations[language][section][key] || key;
  };

  const value = {
    language,
    setLanguage,
    translations: translations[language],
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
