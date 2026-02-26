import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SERVICES } from '../constants/servicesData';

const ServicesSection = ({ scrollToSection }) => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const serviceKeys = ['course', 'signals', 'mentoring'];

  return (
    <section
      id="services"
      className="py-24 bg-[#080808] relative overflow-hidden transition-colors duration-300"
    >
      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl max-h-[800px] bg-yellow-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 uppercase tracking-widest mb-4">
            {t('services.title')}
          </h2>
          <div className="accent-bar mx-auto" />
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, idx) => {
            const IconComponent = service.icon;
            const key = serviceKeys[idx] || 'course';

            // Distinct span layout for Bento Grid effect
            const getSpanClass = (index) => {
              if (index === 0) return "lg:col-span-2 lg:row-span-1";
              if (index === 1) return "lg:col-span-1 lg:row-span-2";
              if (index === 2) return "lg:col-span-2 lg:row-span-1";
              return "";
            };

            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className={`bg-white/5 backdrop-blur-lg p-8 rounded-[32px] border border-yellow-500/10 hover:border-yellow-400/40 transition-all duration-300 shadow-2xl group relative overflow-hidden flex flex-col ${getSpanClass(idx)}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="bg-yellow-500/10 p-5 rounded-2xl w-fit mb-6 group-hover:bg-yellow-500/20 transition-colors duration-300 border border-yellow-500/20 shadow-[0_0_15px_rgba(245,197,24,0.1)]">
                    <IconComponent className="h-8 w-8 text-yellow-500" />
                  </div>

                  <h3 className="text-3xl font-extrabold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300 tracking-wide">
                    {t(`services.items.${key}.title`)}
                  </h3>
                  <p className="text-yellow-500/80 mb-8 text-sm font-bold tracking-widest uppercase">
                    {t(`services.items.${key}.audience`)}
                  </p>

                  <ul className="space-y-4 mb-10 flex-1">
                    {[0, 1, 2, 3].map((i) => (
                      <li key={i} className="flex items-start group/item">
                        <ChevronRight className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0 group-hover/item:translate-x-1 transition-transform" />
                        <span className="text-slate-300 text-[15px] leading-relaxed">
                          {t(`services.items.${key}.includes.${i}`)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => scrollToSection('contact')}
                    className="w-full py-4 mt-auto bg-transparent border border-yellow-500/30 hover:border-yellow-400/80 hover:bg-yellow-500/10 text-yellow-400 font-bold tracking-widest uppercase rounded-2xl transition-all duration-300"
                  >
                    {t('services.cta')}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
