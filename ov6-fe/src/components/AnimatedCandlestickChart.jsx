import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedCandlestickChart = () => {
    const [candles, setCandles] = useState([]);

    useEffect(() => {
        // Generate initial set of candles
        const screenWidth = window.innerWidth;
        const numCandles = Math.floor(screenWidth / 35); // 35px spacing

        const initialCandles = Array.from({ length: numCandles }).map((_, i) => ({
            id: i,
            x: i * 35,
            height: Math.random() * 80 + 20,
            yOffset: Math.random() * 200 + 50,
            isUp: Math.random() > 0.48, // slightly more bullish for a positive feel
            wickTop: Math.random() * 40,
            wickBottom: Math.random() * 40,
        }));
        setCandles(initialCandles);

        // Animate the last few candles simulating real-time trading
        const interval = setInterval(() => {
            setCandles(prev => {
                const next = [...prev];
                const lastIndex = next.length - 1;

                // Randomly fluctuate the very last candle heavily
                const last = { ...next[lastIndex] };
                last.height = Math.max(10, last.height + (Math.random() * 30 - 15));
                last.yOffset = last.yOffset + (Math.random() * 10 - 5);
                last.wickTop = Math.random() * 50;
                last.wickBottom = Math.random() * 50;
                // Also sometimes change color direction
                if (Math.random() > 0.9) last.isUp = !last.isUp;
                next[lastIndex] = last;

                return next;
            });
        }, 700);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 opacity-30 pointer-events-none flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full min-w-[1200px]" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="goldUp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#b45309" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="goldDown" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#450a0a" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
                    </linearGradient>
                </defs>

                <g transform="translate(0, 150)">
                    {candles.map((candle, i) => {
                        const isLast = i === candles.length - 1;
                        const strokeColor = candle.isUp ? "#fbbf24" : "#92400e";

                        return (
                            <motion.g
                                key={candle.id}
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, delay: i * 0.03, ease: 'easeOut' }}
                            >
                                {/* The wick (High/Low) */}
                                <motion.line
                                    x1={candle.x + 6}
                                    y1={candle.yOffset - candle.wickTop}
                                    x2={candle.x + 6}
                                    y2={candle.yOffset + candle.height + candle.wickBottom}
                                    stroke={strokeColor}
                                    strokeWidth="1.5"
                                    animate={isLast ? {
                                        y1: (candle.yOffset - candle.wickTop) || 0,
                                        y2: (candle.yOffset + candle.height + candle.wickBottom) || 0
                                    } : {}}
                                    transition={{ type: "spring", stiffness: 80 }}
                                />

                                {/* The body (Open/Close) */}
                                <motion.rect
                                    x={candle.x}
                                    y={candle.yOffset}
                                    width="12"
                                    height={candle.height}
                                    fill={candle.isUp ? "url(#goldUp)" : "url(#goldDown)"}
                                    stroke={strokeColor}
                                    strokeWidth="1.2"
                                    rx="2"
                                    animate={isLast ? {
                                        height: candle.height || 0,
                                        y: candle.yOffset || 0
                                    } : {}}
                                    transition={{ type: "spring", stiffness: 80 }}
                                />
                            </motion.g>
                        );
                    })}
                </g>
            </svg>
        </div>
    );
};

export default AnimatedCandlestickChart;
