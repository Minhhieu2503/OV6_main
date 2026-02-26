import React from 'react';
import { ChevronRight, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '../utils/paths';

const BlogSection = () => {
  const { t } = useTranslation();

  const blogImages = [
    getAssetPath('images/mentality.png'),
    getAssetPath('images/Capital_management.png'),
    getAssetPath('images/Analysis.png'),
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section
      id="blog"
      className="py-24 bg-[#080808] relative transition-colors duration-300"
    >
      {/* Ambient */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-yellow-500/3 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 uppercase tracking-widest mb-4">
            {t('blog.title')}
          </h2>
          <div className="accent-bar mx-auto" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[0, 1, 2].map((idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white/5 backdrop-blur-md rounded-[24px] overflow-hidden border border-yellow-500/10 hover:border-yellow-400/40 transition-all duration-300 shadow-lg hover:shadow-xl group flex flex-col"
            >
              {/* Image */}
              <div className="h-56 overflow-hidden relative">
                <img
                  src={blogImages[idx]}
                  alt={t(`blog.posts.${idx}.title`)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs font-bold text-black bg-yellow-400 px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    {t(`blog.posts.${idx}.category`)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-4 text-xs text-slate-400 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-yellow-400" />
                    {t(`blog.posts.${idx}.date`)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-yellow-400" />
                    OV6 Admin
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300 line-clamp-2">
                  {t(`blog.posts.${idx}.title`)}
                </h3>

                <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
                  {t(`blog.posts.${idx}.excerpt`)}
                </p>

                <button className="text-white hover:text-yellow-300 font-bold text-sm flex items-center group/btn transition-colors mt-auto w-fit">
                  {t('blog.read_more')}
                  <div className="bg-yellow-500/10 p-1 rounded-full ml-2 group-hover/btn:bg-yellow-500/20 transition-colors">
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1 text-yellow-400" />
                  </div>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
