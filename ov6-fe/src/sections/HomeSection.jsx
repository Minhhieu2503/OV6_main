import React from 'react';
import { Youtube, TrendingUp, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HOME_FEATURES, HOME_STATS } from '../constants/homeData';
import { getAssetPath } from '../utils/paths';
import AnimatedCandlestickChart from '../components/AnimatedCandlestickChart';
import AnimatedCounter from '../components/AnimatedCounter';


// ── Animation variants ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay, ease: 'easeOut' },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
};

// ── Main Component ─────────────────────────────────────────────────────────────
const HomeSection = ({ scrollToSection }) => {
  const { t } = useTranslation();
  const featureKeys = ['discipline', 'risk_management', 'psychology'];
  const statKeys = ['exp', 'markets', 'students'];

  return (
    <section id="home" className="min-h-screen flex flex-col relative overflow-hidden bg-[#080808]">

      {/* ── Background ── */}
      <div className="absolute inset-0 z-0">
        <AnimatedCandlestickChart />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/40 to-[#080808]" />
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-yellow-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-amber-600/10 blur-[100px] pointer-events-none" />
      </div>

      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-yellow-400/20 blur-[80px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-yellow-600/15 blur-[80px]"
        />
      </div>

      {/* ── Hero Content ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-24 min-h-screen">
        <div className="max-w-6xl mx-auto w-full text-center">

          {/* Badge */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
            className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1.5 mb-8"
          >
            <TrendingUp className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-semibold tracking-wide uppercase">
              Professional Trading Education
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight mb-6 max-w-5xl mx-auto"
          >
            <span className="text-white">Helping Traders</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 bg-clip-text text-transparent gold-glow-text">
              Trade With Discipline
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={0.35}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12"
          >
            {t('hero.subtitle')}
          </motion.p>
          {/* Stats */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={0.6}
            className="grid grid-cols-3 gap-4 sm:gap-10 max-w-2xl mx-auto mb-24 border-t border-yellow-500/15 pt-10"
          >
            {HOME_STATS.map((stat, idx) => {
              const hasPlus = stat.num.includes('+');
              return (
                <motion.div
                  key={idx}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx * 0.15 + 0.1}
                  className="text-center group"
                >
                  <div className="text-4xl sm:text-5xl font-extrabold text-yellow-400 mb-1 group-hover:drop-shadow-[0_0_16px_rgba(245,197,24,0.7)] transition-all duration-300">
                    <AnimatedCounter value={stat.num} suffix={hasPlus ? '+' : ''} duration={2000 + (idx * 500)} />
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm uppercase tracking-widest font-medium">
                    {t(`hero.stats.${statKeys[idx]}`)}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {HOME_FEATURES.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx * 0.15}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-yellow-500/50 rounded-2xl p-6 sm:p-8 text-left transition-all duration-300 group cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-5 group-hover:bg-yellow-500/20 group-hover:border-yellow-500/40 transition-all duration-300">
                    <IconComponent className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                    {t(`features.${featureKeys[idx]}.title`)}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                    {t(`features.${featureKeys[idx]}.desc`)}
                  </p>
                  <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full group-hover:w-full transition-all duration-500" />
                </motion.div>
              );
            })}
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 flex flex-col items-center gap-2 text-gray-500"
          >
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-5 h-5 text-yellow-500/60" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
