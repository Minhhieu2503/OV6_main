import React, { useState } from 'react';
import { LineChart, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '../utils/paths';

import MockTradingViewChart from '../components/MockTradingViewChart';

const StrategySection = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="strategy"
      className="py-24 bg-[#080808] relative overflow-hidden transition-colors duration-300"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-yellow-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-600/6 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 uppercase tracking-widest mb-4">
            {t('strategy.title')}
          </h2>
          <div className="accent-bar mx-auto" />
        </motion.div>

        {/* Method + Chart */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl font-bold text-white mb-4 flex items-center">
                <span className="bg-yellow-500/15 p-2 rounded-lg mr-4 border border-yellow-500/30">
                  <LineChart className="h-6 w-6 text-yellow-400" />
                </span>
                {t('strategy.method_title')}
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                {t('strategy.method_desc')}
              </p>
            </motion.div>

            <motion.ul variants={containerVariants} className="space-y-4">
              {[0, 1, 2, 3].map((idx) => (
                <motion.li key={idx} variants={itemVariants} className="flex items-start group">
                  <div className="h-2 w-2 rounded-full mt-2.5 mr-4 bg-yellow-400 shrink-0 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_8px_rgba(245,197,24,0.5)]" />
                  <span className="text-gray-300 group-hover:text-yellow-300 transition-colors duration-300 text-lg">
                    {t(`strategy.methods.${idx}`)}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Chart image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-700 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-500" />
            <div className="relative rounded-3xl overflow-hidden border border-yellow-500/20 group-hover:border-yellow-400/50 transition-all duration-500 shadow-2xl">
              <div className="aspect-video overflow-hidden bg-[#111113] relative">
                <MockTradingViewChart />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        </div>

        {/* Risk Management Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-24"
        >
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold text-center text-white mb-12 uppercase tracking-wide"
          >
            {t('strategy.risk_title')}
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[0, 1, 2].map((idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white/5 backdrop-blur-lg border border-yellow-500/10 p-8 rounded-[32px] text-center hover:bg-white/10 hover:border-yellow-400/50 transition-all duration-300 shadow-2xl group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-5xl font-extrabold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {t(`strategy.risk_items.${idx}.value`)}
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{t(`strategy.risk_items.${idx}.title`)}</h4>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {t(`strategy.risk_items.${idx}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Different Approach Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden p-[1px] bg-gradient-to-r from-yellow-400/30 via-yellow-500/60 to-yellow-400/30 shadow-xl"
        >
          <div className="bg-[#080808]/90 backdrop-blur-xl rounded-[23px] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-8">
                {t('strategy.diff_title')}
              </h4>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                {(Array.isArray(t('strategy.diff_desc', { returnObjects: true }))
                  ? t('strategy.diff_desc', { returnObjects: true })
                  : [t('strategy.diff_desc')]
                ).map((point, idx) => (
                  <div key={idx} className="flex items-start bg-white/5 p-4 rounded-xl border border-yellow-500/10 hover:border-yellow-400/30 transition-colors shadow-sm">
                    <div className="h-2 w-2 rounded-full mt-2 mr-3 bg-yellow-500 shrink-0 shadow-[0_0_5px_rgba(245,197,24,0.6)]" />
                    <p className="text-slate-300 text-sm font-medium leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StrategySection;
