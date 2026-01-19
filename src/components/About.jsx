import { motion } from 'framer-motion';
import { Gamepad2, Cpu, Monitor } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 px-8 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-12 text-blue-400 text-center md:text-left"
      >
        Sobre Mim
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
              <span className="text-xl">🚀</span> Fora do código
            </h3>
            <div className="space-y-2 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛹</span> Skatista
              </div>
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-purple-400" /> Gamer
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-400" /> Hardware Enthusiast
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
          <p>
            Desenvolvedor Full-Stack com foco em <strong className="text-blue-400">Laravel</strong> no back-end e <strong className="text-green-400">Vue.js</strong> no front-end, atuando na construção de aplicações web bem estruturadas, escaláveis e fáceis de manter.
          </p>
          
          <p>
            Trabalho diariamente com regra de negócio, APIs, integrações e interfaces reativas, buscando equilíbrio entre performance, legibilidade de código e experiência do usuário. Tenho atenção especial à organização da arquitetura, testes automatizados e boas práticas — não por moda, mas porque reduzem problemas em produção.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-slate-800/30 p-5 rounded-xl border-l-4 border-blue-500">
              <h4 className="text-white font-bold mb-2">Back-end</h4>
              <p className="text-sm text-slate-400">
                Minha base está em PHP/Laravel, com experiência em autenticação, permissões, relacionamentos complexos, filas, integrações e modelagem de dados.
              </p>
            </div>
            <div className="bg-slate-800/30 p-5 rounded-xl border-l-4 border-green-500">
              <h4 className="text-white font-bold mb-2">Front-end</h4>
              <p className="text-sm text-slate-400">
                Utilizo Vue.js para criar interfaces claras e responsivas, com bom controle de estado e comunicação eficiente com a API.
              </p>
            </div>
          </div>

          <p>
            Também possuo familiaridade com Docker, bancos relacionais, testes automatizados e fluxo de trabalho com Git e CI/CD, o suficiente para atuar de ponta a ponta sem perder o foco no que gera valor.
          </p>

          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 mt-8">
            <h3 className="text-xl font-semibold mb-2 text-white flex items-center gap-2">
              <Monitor className="w-5 h-5 text-blue-400" /> Objetivo
            </h3>
            <p className="text-slate-400">
              Tenho como objetivo evoluir constantemente como desenvolvedor e, no futuro, atuar também com arquitetura de software e liderança técnica, sempre entregando soluções que façam a diferença.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
