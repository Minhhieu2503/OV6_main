import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CircularProgressBar = ({ percentage, label, value, strokeColor }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    // Safe id for SVG filter
    const filterId = `glow-${label.replace(/[^a-zA-Z0-9]/g, '-')}`;

    return (
        <div className="flex flex-col items-center justify-center relative w-full" ref={ref}>
            <div className="relative w-[100px] h-[100px] flex items-center justify-center">
                <svg width="100" height="100" viewBox="0 0 100 100" className="transform -rotate-90 absolute inset-0">
                    <defs>
                        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#1f2937" strokeWidth="4" />
                    <motion.circle
                        cx="50" cy="50" r={radius}
                        fill="transparent"
                        stroke={strokeColor}
                        strokeWidth="4"
                        strokeDasharray={circumference}
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: circumference }}
                        animate={isInView ? { strokeDashoffset: circumference - (percentage / 100) * circumference } : {}}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                        filter={`url(#${filterId})`}
                    />
                </svg>
                <div className="flex flex-col items-center justify-center z-10 w-full text-center">
                    <span className="text-lg font-bold text-white tracking-wider">{value}</span>
                </div>
            </div>
            <span className="text-[10px] text-slate-400 mt-3 uppercase tracking-widest font-medium text-center">{label}</span>
        </div>
    );
};

export default CircularProgressBar;
