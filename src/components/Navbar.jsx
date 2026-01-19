import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { translations, setLanguage, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const links = [
    { name: translations.navbar.about, href: '#about' },
    { name: translations.navbar.skills, href: '#skills' },
    { name: translations.navbar.projects, href: '#projects' },
    { name: translations.navbar.experience, href: '#experience' },
    { name: translations.navbar.education, href: '#education' },
    { name: translations.navbar.contact, href: '#contact' },
  ];

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: -100 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              LB
            </a>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-slate-700">
                <button 
                  onClick={() => setLanguage('pt')} 
                  className={`p-1.5 rounded-md transition-colors ${language === 'pt' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
                  title="Português"
                >
                  🇧🇷
                </button>
                <button 
                  onClick={() => setLanguage('en')} 
                  className={`p-1.5 rounded-md transition-colors ${language === 'en' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
                  title="English"
                >
                  🇺🇸
                </button>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center gap-4 px-3 py-2 mt-2 border-t border-slate-800">
              <button 
                onClick={() => { setLanguage('pt'); setIsOpen(false); }} 
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${language === 'pt' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
              >
                🇧🇷 Português
              </button>
              <button 
                onClick={() => { setLanguage('en'); setIsOpen(false); }} 
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${language === 'en' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
              >
                🇺🇸 English
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
