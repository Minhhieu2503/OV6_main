import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GlowCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0 mix-blend-screen"
            style={{
                background: 'radial-gradient(circle, rgba(245, 197, 24, 0.05) 0%, rgba(0, 0, 0, 0) 60%)',
            }}
            animate={{
                x: mousePosition.x - 250,
                y: mousePosition.y - 250,
            }}
            transition={{
                type: 'tween',
                ease: 'linear',
                duration: 0.1,
            }}
        />
    );
};

export default GlowCursor;
