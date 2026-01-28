import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Education = () => {
  const { translations } = useLanguage();
  return (
    <section id="education" className="py-20 px-8 bg-dark-400/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Education Column */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-accent-500/10 rounded-lg">
                <GraduationCap className="w-8 h-8 text-accent-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">{translations.education.title}</h2>
            </div>

            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-dark-200 p-6 rounded-xl border-l-4 border-primary-500"
              >
                <h3 className="text-xl font-bold text-white">{translations.education.items.ads}</h3>
                <p className="text-accent-400">UNICESUMAR</p>
                <p className="text-primary-200/70 text-sm mt-1">{translations.education.items.semester}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-dark-200 p-6 rounded-xl border-l-4 border-primary-500"
              >
                <h3 className="text-xl font-bold text-white">{translations.education.items.english}</h3>
                <p className="text-accent-400">FISK</p>
                <p className="text-primary-200/70 text-sm mt-1">2015 - 2020</p>
              </motion.div>
            </div>
          </div>

          {/* Certifications Column */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-emerald-500/10 rounded-lg">
                <Award className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">{translations.education.certifications}</h2>
            </div>

            <div className="space-y-4">
              {[
                { title: translations.education.certs[0].title, org: "Alura", year: "2022" },
                { title: translations.education.certs[1].title, org: "ENIAC", year: "" },
                { title: translations.education.certs[2].title, org: "ENIAC", year: "" },
                { title: translations.education.certs[3].title, org: "ENIAC", year: "2022" }
              ].map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-dark-200/50 rounded-lg border border-dark-100"
                >
                  <div>
                    <h4 className="font-semibold text-white">{cert.title}</h4>
                    <p className="text-sm text-primary-200/70">{cert.org}</p>
                  </div>
                  {cert.year && (
                    <span className="text-xs font-mono bg-dark-100 px-2 py-1 rounded text-primary-100">
                      {cert.year}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Education;
