import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Github, Linkedin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-white"
        >
          Vamos Conversar?
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.a
            href="tel:+5511965189569"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-8 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-colors cursor-pointer group"
          >
            <div className="p-4 bg-blue-500/10 rounded-full mb-4 group-hover:bg-blue-500/20 transition-colors">
              <Phone className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Telefone</h3>
            <p className="text-slate-400">(11) 96518-9569</p>
          </motion.a>

          <motion.a
            href="mailto:lukkascomics@gmail.com"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-8 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-colors cursor-pointer group"
          >
            <div className="p-4 bg-purple-500/10 rounded-full mb-4 group-hover:bg-purple-500/20 transition-colors">
              <Mail className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
            <p className="text-slate-400">lukkascomics@gmail.com</p>
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 p-8 bg-slate-800/50 rounded-2xl border border-slate-700"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-slate-400" />
              <p className="text-slate-300">Rua Eduardo Vicente Nasser 427 - Barro Branco/SP</p>
            </div>
            
            <div className="flex gap-4">
              <a 
                href="https://github.com/Brazlucas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors text-white"
              >
                <Github className="w-6 h-6" />
              </a>
              {/* Assuming LinkedIn based on standard portfolio, though not in CV text explicitly, good to have placeholder or omit */}
            </div>
          </div>
        </motion.div>

        <footer className="mt-20 text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Lucas Braz. Desenvolvido com React & Tailwind.</p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
