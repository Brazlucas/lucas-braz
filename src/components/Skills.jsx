import { motion } from 'framer-motion';
import { Code2, Database, Server, Layout, Terminal, PenTool } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SkillCard = ({ title, skills, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bg-dark-200/50 p-6 rounded-xl border border-dark-100 hover:bg-dark-200 transition-all hover:scale-105"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-3 bg-primary-500/10 rounded-lg">
        <Icon className="w-6 h-6 text-accent-400" />
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span key={skill} className="px-3 py-1 bg-dark-100/50 text-primary-100 rounded-md text-sm border border-dark-50/50">
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
);

const Skills = () => {
  const { translations } = useLanguage();
  const categories = [
    {
      title: translations.skills.categories.frontend,
      icon: Layout,
      skills: ["HTML5", "CSS3", "SASS", "JavaScript", "TypeScript", "Vue.js", "React"]
    },
    {
      title: translations.skills.categories.backend,
      icon: Server,
      skills: ["Node.js", "Nest.js", "PHP (Laravel)", "C#", ".NET", "Golang"]
    },
    {
      title: translations.skills.categories.database,
      icon: Database,
      skills: ["SQL (Relacionais)"]
    },
    {
      title: translations.skills.categories.devops,
      icon: Terminal,
      skills: ["Docker", "Kubernetes", "Git Actions"]
    },
    {
      title: translations.skills.categories.design,
      icon: PenTool,
      skills: ["Figma", "Canva", "Photoshop", "Office", "LibreOffice"]
    },
    {
      title: translations.skills.categories.os,
      icon: Code2,
      skills: ["Windows", "Arch Linux", "Kali Linux"]
    }
  ];

  return (
    <section id="skills" className="py-20 px-8 bg-dark-400/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary-400"
        >
          {translations.skills.title}
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <SkillCard key={category.title} {...category} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
