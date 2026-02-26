import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const BASE_PRICE = 4200;

// Utility to generate a path string for lines
const curveLine = (points) => {
    if (points.length === 0) return '';
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        path += ` Q ${points[i].x} ${points[i].y}, ${xc} ${yc}`;
    }
    path += ` L ${points[points.length - 1].x} ${points[points.length - 1].y}`;
    return path;
};

// Utility to generate area between two lines
const generateCloudPath = (line1, line2) => {
    if (line1.length === 0 || line2.length === 0) return '';
    const topPath = curveLine(line1);
    let bottomPath = ` L ${line2[line2.length - 1].x} ${line2[line2.length - 1].y}`;
    for (let i = line2.length - 2; i > 0; i--) {
        const xc = (line2[i].x + line2[i - 1].x) / 2;
        const yc = (line2[i].y + line2[i - 1].y) / 2;
        bottomPath += ` Q ${line2[i].x} ${line2[i].y}, ${xc} ${yc}`;
    }
    bottomPath += ` L ${line2[0].x} ${line2[0].y} Z`;
    return topPath + bottomPath;
};

const MockTradingViewChart = () => {
    const [data, setData] = useState([]);
    const MAX_POINTS = 50;

    useEffect(() => {
        // Generate initial history
        let currentPrice = BASE_PRICE;
        let initialData = [];
        for (let i = 0; i < MAX_POINTS; i++) {
            const open = currentPrice;
            const close = open + (Math.random() * 40 - 18);
            const high = Math.max(open, close) + Math.random() * 20;
            const low = Math.min(open, close) - Math.random() * 20;
            currentPrice = close;

            // Moving averages bases
            const ema20 = close - 15 + Math.random() * 5;
            const sma50 = close - 35 + Math.random() * 10;

            // Cloud bounds
            const spanA = sma50 + 20;
            const spanB = sma50 - 40;

            initialData.push({ id: i, open, close, high, low, ema20, sma50, spanA, spanB });
        }
        setData(initialData);

        const interval = setInterval(() => {
            setData((prev) => {
                const next = [...prev];
                const lastIdx = next.length - 1;
                const last = { ...next[lastIdx] };

                // Random tick
                const tick = (Math.random() * 10 - 4.5);
                last.close += tick;
                last.high = Math.max(last.high, last.close);
                last.low = Math.min(last.low, last.close);

                last.ema20 += tick * 0.1;
                last.sma50 += tick * 0.05;
                last.spanA += tick * 0.04;
                last.spanB += tick * 0.02;

                next[lastIdx] = last;

                // occasionally add new candle
                if (Math.random() > 0.85) {
                    next.shift(); // remove oldest
                    const newOpen = last.close;
                    const newClose = newOpen + (Math.random() * 10 - 5);
                    next.push({
                        id: Date.now(),
                        open: newOpen,
                        close: newClose,
                        high: Math.max(newOpen, newClose) + 2,
                        low: Math.min(newOpen, newClose) - 2,
                        ema20: last.ema20,
                        sma50: last.sma50,
                        spanA: last.spanA,
                        spanB: last.spanB
                    });
                }

                return next;
            });
        }, 300);

        return () => clearInterval(interval);
    }, []);

    // Normalization logic
    const minLow = useMemo(() => Math.min(...data.map(d => Math.min(d.low, d.spanB))), [data]);
    const maxHigh = useMemo(() => Math.max(...data.map(d => Math.max(d.high, d.spanA))), [data]);
    const range = maxHigh - minLow || 1;

    // Scale functions (SVG viewBox is 800x400)
    const width = 800;
    const height = 400;
    const scaleY = (val) => height - ((val - minLow) / range) * (height * 0.8) - (height * 0.1);
    const scaleX = (idx) => (idx / (MAX_POINTS - 1)) * (width - 80); // leave space for right axis

    if (data.length === 0) return null;

    // Generated Paths for indicators
    const ema20Points = data.map((d, i) => ({ x: scaleX(i), y: scaleY(d.ema20) }));
    const sma50Points = data.map((d, i) => ({ x: scaleX(i), y: scaleY(d.sma50) }));
    const spanAPoints = data.map((d, i) => ({ x: scaleX(i), y: scaleY(d.spanA) }));
    const spanBPoints = data.map((d, i) => ({ x: scaleX(i), y: scaleY(d.spanB) }));

    // Check if trend is mostly up or down for cloud color
    const cloudIsBullish = data[data.length - 1].spanA > data[data.length - 1].spanB;
    const cloudColor = cloudIsBullish ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)";
    const cloudBorder = cloudIsBullish ? "rgba(16, 185, 129, 0.4)" : "rgba(239, 68, 68, 0.4)";

    // Dynamic live price tag color
    const currentPrice = data[data.length - 1].close;
    const isUp = currentPrice >= data[data.length - 1].open;
    const livePriceStr = currentPrice.toFixed(2);

    // Axis labels (Mock)
    const yAxisTicks = Array.from({ length: 6 }).map((_, i) => minLow + (range / 5) * i);

    return (
        <div className="w-full h-full bg-[#111113] relative font-mono select-none">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
                {/* Background Grid */}
                <g stroke="#ffffff0a" strokeWidth="1">
                    {yAxisTicks.map((tick, i) => (
                        <line key={`y-${i}`} x1="0" y1={scaleY(tick)} x2={width - 80} y2={scaleY(tick)} />
                    ))}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <line key={`x-${i}`} x1={(width / 8) * i} y1="0" x2={(width / 8) * i} y2={height} />
                    ))}
                </g>

                {/* Ichimoku Cloud / Shaded Area */}
                <path
                    d={generateCloudPath(spanAPoints, spanBPoints)}
                    fill={cloudColor}
                    stroke="none"
                />
                <path d={curveLine(spanAPoints)} fill="none" stroke={cloudBorder} strokeWidth="1" strokeDasharray="4 4" />
                <path d={curveLine(spanBPoints)} fill="none" stroke={cloudBorder} strokeWidth="1" opacity="0.5" />

                {/* Moving Averages */}
                <path d={curveLine(ema20Points)} fill="none" stroke="#eab308" strokeWidth="1.5" />
                <path d={curveLine(sma50Points)} fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.8" />

                {/* Candles */}
                <g>
                    {data.map((d, i) => {
                        const x = scaleX(i);
                        const isBull = d.close >= d.open;
                        const openY = scaleY(d.open);
                        const closeY = scaleY(d.close);
                        const highY = scaleY(d.high);
                        const lowY = scaleY(d.low);
                        const bodyTop = Math.min(openY, closeY);
                        const bodyHeight = Math.max(Math.abs(openY - closeY), 1);
                        const color = isBull ? '#10b981' : '#ef4444';

                        return (
                            <g key={d.id}>
                                <line x1={x} y1={highY} x2={x} y2={lowY} stroke={color} strokeWidth="1" />
                                <rect x={x - 3} y={bodyTop} width="6" height={bodyHeight} fill={color} stroke={color} strokeWidth="1" rx="0.5" />
                            </g>
                        );
                    })}
                </g>

                {/* Right Y-Axis Region */}
                <rect x={width - 80} y="0" width="80" height={height} fill="#111113" />
                <line x1={width - 80} y1="0" x2={width - 80} y2={height} stroke="#333" strokeWidth="1" />

                {/* Y Axis Ticks */}
                {yAxisTicks.map((tick, i) => (
                    <text key={`ytxt-${i}`} x={width - 70} y={scaleY(tick) + 4} fill="#666" fontSize="10px">
                        {tick.toFixed(2)}
                    </text>
                ))}

                {/* Live Price Crosshair & Badge */}
                {(() => {
                    const liveY = scaleY(currentPrice);
                    const color = isUp ? '#10b981' : '#ef4444';
                    return (
                        <g>
                            <line x1="0" y1={liveY} x2={width - 80} y2={liveY} stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
                            <rect x={width - 80} y={liveY - 10} width="80" height="20" fill={color} />
                            <polygon points={`${width - 80},${liveY} ${width - 75},${liveY - 10} ${width - 80},${liveY - 10}`} fill="#111113" />
                            <polygon points={`${width - 80},${liveY} ${width - 75},${liveY + 10} ${width - 80},${liveY + 10}`} fill="#111113" />
                            <text x={width - 66} y={liveY + 4} fill="#fff" fontSize="11px" fontWeight="bold">
                                {livePriceStr}
                            </text>
                        </g>
                    )
                })()}

            </svg>
            {/* TradingView Top Toolbar Mock */}
            <div className="absolute top-0 left-0 right-[80px] p-4 flex gap-4 text-xs font-semibold text-gray-400 border-b border-white/5 bg-gradient-to-b from-[#111113] to-transparent">
                <span className="text-white">BTCUSD</span>
                <span>5m</span>
                <span className="text-yellow-500">O {currentPrice.toFixed(1)}</span>
                <span className="text-[#10b981]">H {(Math.max(...data.slice(-5).map(d => d.high))).toFixed(1)}</span>
                <span className="text-[#ef4444]">L {(Math.min(...data.slice(-5).map(d => d.low))).toFixed(1)}</span>
            </div>
        </div>
    );
};

export default MockTradingViewChart;
