import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import BackgroundAnimation from './components/BackgroundAnimation';
import LanguageTooltip from './components/LanguageTooltip';
import FloatingTerminal from './components/FloatingTerminal';
import { TerminalProvider } from './context/TerminalContext';

function App() {
  return (
    <TerminalProvider>
      <div className="min-h-screen text-primary-100 selection:bg-primary-500/30 relative">
        <BackgroundAnimation />
        <Navbar />
        <LanguageTooltip />
        <FloatingTerminal />
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Contact />
        </main>
      </div>
    </TerminalProvider>
  );
}

export default App;

