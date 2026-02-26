import React, { useRef } from 'react';
import { Award, TrendingUp, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { TRADE_HISTORY, PERFORMANCE_STATS } from '../constants/resultsData';
import CircularProgressBar from '../components/CircularProgressBar';

const equityData = [
  { name: 'Jan', equity: 10000 },
  { name: 'Feb', equity: 10800 },
  { name: 'Mar', equity: 10500 },
  { name: 'Apr', equity: 12200 },
  { name: 'May', equity: 14500 },
  { name: 'Jun', equity: 13800 },
  { name: 'Jul', equity: 16100 },
  { name: 'Aug', equity: 18500 },
  { name: 'Sep', equity: 17900 },
  { name: 'Oct', equity: 20200 },
  { name: 'Nov', equity: 22800 },
  { name: 'Dec', equity: 25400 },
];

const generateSparkline = (isWin) => {
  let val = 50;
  return Array.from({ length: 15 }).map((_, i) => {
    val += isWin ? (Math.random() * 10 - 2) : (Math.random() * 10 - 8);
    return { val };
  });
};

const ResultsSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="results" className="py-24 bg-[#080808] relative overflow-hidden" ref={ref}>
      {/* Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 uppercase tracking-widest mb-4">
            {t('results.title', 'Proven Performance')}
          </h2>
          <div className="accent-bar mx-auto" />
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16"
        >
          {/* Card 1: Performance Stats (Spans 1 col) */}
          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-lg border border-yellow-500/15 rounded-3xl p-8 flex flex-col items-center justify-center space-y-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl" />

            <h3 className="text-xl font-bold text-white mb-2 self-start uppercase tracking-wider flex items-center gap-3">
              <TrendingUp className="text-yellow-500 w-5 h-5" />
              Metrics
            </h3>

            <div className="grid grid-cols-2 gap-6 w-full mt-4">
              <CircularProgressBar percentage={78} label="Win Rate" value="78%" strokeColor="#eab308" />
              <CircularProgressBar percentage={65} label="Profit Factor" value="2.4" strokeColor="#f59e0b" />
              <CircularProgressBar percentage={25} label="Drawdown" value="8.2%" strokeColor="#ef4444" />
              <CircularProgressBar percentage={92} label="Consistency" value="92/100" strokeColor="#10b981" />
            </div>
          </motion.div>

          {/* Card 2: Equity Curve View (Spans 2 cols) */}
          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-lg border border-yellow-500/15 rounded-3xl p-8 lg:col-span-2 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
            <div className="flex justify-between items-end mb-8 relative z-10">
              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3 mb-2">
                  <Award className="text-yellow-500 w-5 h-5" />
                  Equity Curve
                </h3>
                <p className="text-sm text-slate-400">Consistent growth over 12 months</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400 uppercase tracking-widest mb-1">Total Return</div>
                <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">+154.00%</div>
              </div>
            </div>

            <div className="h-[250px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={equityData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} dy={10} axisLine={false} tickLine={false} />
                  <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '12px' }}
                    itemStyle={{ color: '#fbbf24', fontWeight: 'bold' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="equity"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorEquity)"
                    isAnimationActive={isInView}
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Card 3: Live Trades with Sparklines (Spans full width) */}
          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-lg border border-yellow-500/15 rounded-3xl p-8 lg:col-span-3 shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                <Clock className="text-yellow-500 w-5 h-5" />
                Recent Executions
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TRADE_HISTORY.slice(0, 6).map((trade, idx) => {
                const isWin = trade.result.startsWith('+');
                const sparkColor = isWin ? '#10b981' : '#ef4444';
                const sparkData = generateSparkline(isWin);

                return (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-yellow-500/20 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl ${isWin ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                        {isWin ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                      </div>
                      <div>
                        <div className="text-white font-bold tracking-wider">{trade.pair}</div>
                        <div className="text-xs text-slate-500 uppercase font-medium mt-1 tracking-widest">{trade.date} • {trade.type}</div>
                      </div>
                    </div>

                    {/* Sparkline */}
                    <div className="w-24 h-10 hidden sm:block opacity-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sparkData}>
                          <Line type="monotone" dataKey="val" stroke={sparkColor} strokeWidth={2} dot={false} isAnimationActive={isInView} animationDuration={1500} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className={`text-lg font-bold tracking-wider ${isWin ? 'text-emerald-400' : 'text-red-400'}`}>
                      {trade.result}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;
