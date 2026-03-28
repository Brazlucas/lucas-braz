import { motion } from 'framer-motion';
import { ExternalLink, ShoppingBag, Terminal } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Projects = () => {
  const { translations } = useLanguage();
  return (
    <section id="projects" className="py-20 px-8 max-w-6xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-12 text-primary-400"
      >
        {translations.projects.title}
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="group relative bg-[#0a0a0a] rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-500 transition-all hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
          
          {/* Project Content */}
          <div className="relative z-20 p-8 h-full flex flex-col justify-end min-h-[300px]">
            <div className="mb-4">
              <div className="p-3 bg-zinc-800/50 w-fit rounded-xl mb-4 backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-colors duration-300">
                <Terminal className="w-6 h-6 text-white group-hover:text-black transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Zero Um</h3>
              <p className="text-zinc-400 mb-4 transition-colors duration-300 group-hover:text-zinc-300">
                {translations.projects.zeroeumDesc}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-zinc-900/80 text-zinc-300 rounded-full text-sm border border-zinc-800">Landing Page</span>
              <span className="px-3 py-1 bg-zinc-900/80 text-zinc-300 rounded-full text-sm border border-zinc-800">UI/UX</span>
              <span className="px-3 py-1 bg-zinc-900/80 text-zinc-300 rounded-full text-sm border border-zinc-800">Minimalist</span>
            </div>

            <a 
              href="https://zeroeum.site" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white hover:text-zinc-300 font-medium transition-colors"
            >
              {translations.projects.visitProject} <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Placeholder for future projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center bg-dark-200/30 rounded-2xl border-2 border-dashed border-dark-100 min-h-[300px]"
        >
          <p className="text-primary-400/50 font-medium">{translations.projects.soon}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
