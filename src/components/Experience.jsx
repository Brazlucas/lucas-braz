import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const ExperienceItem = ({ role, company, period, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="relative pl-8 pb-12 border-l-2 border-slate-700 last:border-0"
  >
    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-900" />
    
    <div className="mb-2">
      <h3 className="text-xl font-bold text-white">{role}</h3>
      <div className="flex flex-wrap gap-2 items-center text-sm mt-1">
        <span className="text-blue-400 font-semibold">{company}</span>
        <span className="text-slate-500">•</span>
        <span className="text-slate-400">{period}</span>
      </div>
    </div>
    
    {description && (
      <p className="text-slate-400 mt-2">
        {description}
      </p>
    )}
  </motion.div>
);

const Experience = () => {
  const experiences = [
    {
      role: "Desenvolvedor Junior III full-stack",
      company: "INFOCAR TECNOLOGIA",
      period: "01/2023 - Atualmente",
      description: "Desenvolvimento e manutenção de sistemas web, foco em Laravel e Vue.js."
    },
    {
      role: "Desenvolvedor front-end estagiário",
      company: "AUTOVIST (SQAD)",
      period: "06/2022 - 01/2023",
      description: "Atuação no front-end utilizando tecnologias modernas para criar interfaces responsivas."
    },
    {
      role: "Manutenção de computadores",
      company: "PCHELP Informática",
      period: "2018",
      description: ""
    }
  ];

  return (
    <section id="experience" className="py-20 px-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-blue-500/10 rounded-lg">
          <Briefcase className="w-8 h-8 text-blue-400" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">Experiência</h2>
      </div>

      <div className="ml-4">
        {experiences.map((exp, index) => (
          <ExperienceItem key={index} {...exp} delay={index * 0.2} />
        ))}
      </div>
    </section>
  );
};

export default Experience;
