import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';

const AnimatedCounter = ({ value, suffix = '', duration = 2500 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const [hasStarted, setHasStarted] = useState(false);
    const [liveTick, setLiveTick] = useState(0);

    // Extract the numeric part for animation
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);

    if (isInView && !hasStarted) {
        setHasStarted(true);
    }

    const count = useCountUp(hasStarted ? numericValue : 0, duration);
    const isFinished = count === numericValue;

    useEffect(() => {
        if (!isFinished) return;

        // Only run ticks on numbers large enough to make sense
        if (numericValue < 5) return;

        let activeTimeout;
        let revertTimeout;

        const triggerTick = () => {
            // Random tick up (+1) or down (-1)
            const change = Math.random() > 0.5 ? 1 : -1;
            setLiveTick(change);

            // Revert back to original number after a brief flash
            revertTimeout = setTimeout(() => {
                setLiveTick(0);
            }, 800);

            // Schedule next random tick between 2s and 5s
            activeTimeout = setTimeout(triggerTick, 2000 + Math.random() * 3000);
        };

        // Start ticking slightly after count finishes
        activeTimeout = setTimeout(triggerTick, 1500);

        return () => {
            clearTimeout(activeTimeout);
            clearTimeout(revertTimeout);
        };
    }, [isFinished, numericValue]);

    const displayValue = count + liveTick;
    const isTickUp = liveTick > 0;
    const isTickDown = liveTick < 0;

    // Add text color flash based on tick direction
    const colorClass = isTickUp
        ? "text-[#10b981] drop-shadow-[0_0_12px_rgba(16,185,129,0.5)] transition-none"
        : isTickDown
            ? "text-[#ef4444] drop-shadow-[0_0_12px_rgba(239,68,68,0.5)] transition-none"
            : "transition-colors duration-700";

    return (
        <span ref={ref} className={colorClass}>
            {displayValue}{suffix}
        </span>
    );
};

export default AnimatedCounter;
