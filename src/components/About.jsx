import { motion } from 'framer-motion';
import { Gamepad2, Cpu, Monitor } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { translations } = useLanguage();
  return (
    <section id="about" className="py-20 px-8 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-12 text-blue-400 text-center md:text-left"
      >
        {translations.about.title}
      </motion.h2>
      
      <div className="grid md:grid-cols-12 gap-12 items-start">
        {/* Profile Image Column */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="md:col-span-4 lg:col-span-3 flex flex-col gap-4"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src={`${import.meta.env.BASE_URL}images/file.jpg`}
              alt="Lucas Braz" 
              className="relative w-full aspect-square object-cover rounded-2xl shadow-2xl border-2 border-slate-700/50"
            />
          </div>
          
          {/* Hobbies Card */}
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span className="text-xl">🚀</span> {translations.about.hobbiesTitle}
            </h3>
            <div className="space-y-2 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛹</span> {translations.about.hobbies.skater}
              </div>
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-purple-400" /> {translations.about.hobbies.gamer}
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-400" /> {translations.about.hobbies.hardware}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="md:col-span-8 lg:col-span-9 space-y-6 text-slate-300 leading-relaxed text-lg"
        >
          <p dangerouslySetInnerHTML={{ __html: translations.about.description1 }}></p>
          
          <p>
            {translations.about.description2}
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-slate-800/30 p-5 rounded-xl border-l-4 border-blue-500">
              <h4 className="text-white font-bold mb-2">{translations.about.backendTitle}</h4>
              <p className="text-sm text-slate-400">
                {translations.about.backendDesc}
              </p>
            </div>
            <div className="bg-slate-800/30 p-5 rounded-xl border-l-4 border-green-500">
              <h4 className="text-white font-bold mb-2">{translations.about.frontendTitle}</h4>
              <p className="text-sm text-slate-400">
                {translations.about.frontendDesc}
              </p>
            </div>
          </div>

          <p>
            {translations.about.description3}
          </p>

          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 mt-8">
            <h3 className="text-xl font-semibold mb-2 text-white flex items-center gap-2">
              <Monitor className="w-5 h-5 text-blue-400" /> {translations.about.goalTitle}
            </h3>
            <p className="text-slate-400">
              {translations.about.goalDesc}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
