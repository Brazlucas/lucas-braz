import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

const Education = () => {
  return (
    <section id="education" className="py-20 px-8 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Education Column */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <GraduationCap className="w-8 h-8 text-purple-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Educação</h2>
            </div>

            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-slate-800 p-6 rounded-xl border-l-4 border-purple-500"
              >
                <h3 className="text-xl font-bold text-white">Análise e Desenvolvimento de Sistemas</h3>
                <p className="text-purple-400">UNICESUMAR</p>
                <p className="text-slate-400 text-sm mt-1">5º Semestre</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800 p-6 rounded-xl border-l-4 border-purple-500"
              >
                <h3 className="text-xl font-bold text-white">Advanced English</h3>
                <p className="text-purple-400">FISK</p>
                <p className="text-slate-400 text-sm mt-1">2015 - 2020</p>
              </motion.div>
            </div>
          </div>

          {/* Certifications Column */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Award className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Certificações</h2>
            </div>

            <div className="space-y-4">
              {[
                { title: "Formação front-end", org: "Alura", year: "2022" },
                { title: "REACT.js – 30 horas", org: "ENIAC", year: "" },
                { title: "SCRUM (Métodos ágeis) 10 horas", org: "ENIAC", year: "" },
                { title: "Vencedor hackaton creator-it 2022", org: "ENIAC", year: "2022" }
              ].map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                >
                  <div>
                    <h4 className="font-semibold text-white">{cert.title}</h4>
                    <p className="text-sm text-slate-400">{cert.org}</p>
                  </div>
                  {cert.year && (
                    <span className="text-xs font-mono bg-slate-700 px-2 py-1 rounded text-slate-300">
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
