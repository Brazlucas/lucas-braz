import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 px-8 max-w-6xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-8 text-blue-400"
      >
        Sobre Mim
      </motion.h2>
      
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-4 text-slate-300 leading-relaxed"
        >
          <p>
            Desenvolvedor Full-Stack com sólida experiência em <strong>Laravel (back-end)</strong> e <strong>Vue.js (front-end)</strong>, atuando no desenvolvimento e evolução de sistemas web com foco em regra de negócio, comunicação entre áreas e sustentabilidade técnica.
          </p>
          <p>
            Tenho atuação próxima ao produto e ao negócio, participando ativamente de decisões técnicas que impactam performance, manutenção, escalabilidade e experiência do usuário.
          </p>
          <p>
            Mais do que escrever código, busco entender o problema real, traduzir requisitos em soluções claras e reduzir riscos em produção.
          </p>
          <p>
            Possuo forte atenção à arquitetura da aplicação, organização do domínio, qualidade de código e testes automatizados, não como formalidade, mas como ferramentas práticas para diminuir retrabalho e falhas em ambientes reais.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors"
        >
          <h3 className="text-xl font-semibold mb-4 text-white">Objetivo</h3>
          <p className="text-slate-400">
            Atuar com Desenvolvimento Web ou Correlatas, aplicando meus conhecimentos para criar soluções eficientes e inovadoras.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm">Full-Stack</span>
            <span className="px-3 py-1 bg-green-900/30 text-green-300 rounded-full text-sm">Arquitetura</span>
            <span className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm">Qualidade de Código</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
