import { motion } from 'framer-motion';
import { ExternalLink, ShoppingBag } from 'lucide-react';
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
          className="group relative bg-dark-200 rounded-2xl overflow-hidden border border-dark-100 hover:border-primary-500/50 transition-all hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-dark-500 via-dark-500/40 to-transparent z-10" />
          
          {/* Project Content */}
          <div className="relative z-20 p-8 h-full flex flex-col justify-end min-h-[300px]">
            <div className="mb-4">
              <div className="p-3 bg-pink-500/20 w-fit rounded-xl mb-4 backdrop-blur-sm">
                <ShoppingBag className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Gataria Shop</h3>
              <p className="text-primary-100 mb-4">
                {translations.projects.gatariaDesc}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-dark-100/50 text-primary-100 rounded-full text-sm border border-dark-50">Shopify</span>
              <span className="px-3 py-1 bg-dark-100/50 text-primary-100 rounded-full text-sm border border-dark-50">E-commerce</span>
              <span className="px-3 py-1 bg-dark-100/50 text-primary-100 rounded-full text-sm border border-dark-50">Design</span>
            </div>

            <a 
              href="https://gataria.shop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent-400 hover:text-accent-300 font-medium transition-colors"
            >
              {translations.projects.visitStore} <ExternalLink className="w-4 h-4" />
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
