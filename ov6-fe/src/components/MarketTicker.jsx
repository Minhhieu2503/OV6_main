import React, { useEffect, useRef, useState, useCallback } from 'react';

// ── CORS proxy for environments where direct access is DNS-blocked ───
// Use a reliable proxy that doesn't restrict via origin block
const CORS_PROXY = 'https://corsproxy.io/?';

const fmt = (num, decimals = 2) => {
    const n = parseFloat(num);
    if (isNaN(n)) return '—';
    return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};

// ── Smart fetch: tries direct first, falls back to CORS proxy ────────
async function smartFetch(url) {
    try {
        const res = await fetch(url);
        if (res.ok) return res;
    } catch { /* direct failed, try proxy */ }

    // Fallback: use CORS proxy
    const proxied = CORS_PROXY + encodeURIComponent(url);
    const proxyRes = await fetch(proxied);
    if (!proxyRes.ok) throw new Error('Proxy blocked or failing');

    // Some proxies wrap json in .contents, corsproxy.io returns direct
    return proxyRes;
}
async function fetchCrypto() {
    try {
        const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true';
        const res = await smartFetch(url);
        if (!res.ok) throw new Error('CoinGecko error');
        const data = await res.json();

        const items = [];

        if (data.bitcoin) {
            const change = data.bitcoin.usd_24h_change || 0;
            items.push({
                label: 'BTC/USD',
                price: fmt(data.bitcoin.usd),
                change_p: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
                up: change >= 0,
            });
        }

        if (data.ethereum) {
            const change = data.ethereum.usd_24h_change || 0;
            items.push({
                label: 'ETH/USD',
                price: fmt(data.ethereum.usd),
                change_p: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
                up: change >= 0,
            });
        }

        return items;
    } catch (err) {
        console.warn('[fetchCrypto]', err.message);
        return [
            { label: 'BTC/USD', price: '—', change_p: '—', up: null },
            { label: 'ETH/USD', price: '—', change_p: '—', up: null },
        ];
    }
}

// ── Fetch gold from CoinGecko ───────────────────────────────────────
async function fetchGold() {
    try {
        const url = 'https://api.coingecko.com/api/v3/simple/price?ids=tether-gold&vs_currencies=usd&include_24hr_change=true';
        const res = await smartFetch(url);
        if (!res.ok) throw new Error('Gold fetch error');
        const data = await res.json();
        if (data['tether-gold']) {
            const g = data['tether-gold'];
            const change = g.usd_24h_change || 0;
            return [{
                label: 'XAU/USD',
                price: fmt(g.usd),
                change_p: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
                up: change >= 0,
            }];
        }
        return [{ label: 'XAU/USD', price: '—', change_p: '—', up: null }];
    } catch {
        return [{ label: 'XAU/USD', price: '—', change_p: '—', up: null }];
    }
}

// ── Fetch forex from ExchangeRate API ────────────────────────────────
const FOREX_PAIRS = [
    { from: 'EUR', to: 'USD', label: 'EUR/USD' },
    { from: 'GBP', to: 'USD', label: 'GBP/USD' },
    { from: 'USD', to: 'JPY', label: 'USD/JPY' },
];

let prevForexRates = null;

async function fetchForex() {
    try {
        const url = 'https://open.er-api.com/v6/latest/USD';
        const res = await smartFetch(url);
        if (!res.ok) throw new Error('Forex API error');
        const json = await res.json();
        const rates = json.rates;

        const results = FOREX_PAIRS.map(({ from, to, label }) => {
            let price;
            if (from === 'USD') {
                price = rates[to];
            } else {
                price = rates[from] ? 1 / rates[from] : null;
            }
            if (!price) return { label, price: '—', change_p: '—', up: null };

            const key = `${from}${to}`;
            let changePct = null;
            let up = null;
            if (prevForexRates && prevForexRates[key]) {
                changePct = ((price - prevForexRates[key]) / prevForexRates[key] * 100);
                up = changePct >= 0;
            }
            if (!prevForexRates) prevForexRates = {};
            prevForexRates[key] = price;

            return {
                label,
                price: fmt(price, 4),
                change_p: changePct !== null ? `${changePct >= 0 ? '+' : ''}${changePct.toFixed(2)}%` : '~0.00%',
                up: up ?? true,
            };
        });
        return results;
    } catch {
        return FOREX_PAIRS.map(({ label }) => ({ label, price: '—', change_p: '—', up: null }));
    }
}

// ── Component ────────────────────────────────────────────────────────
const MarketTicker = () => {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const intervalRef = useRef(null);

    const loadPrices = useCallback(async () => {
        try {
            const [cryptoData, goldData, forexData] = await Promise.all([
                fetchCrypto(),
                fetchGold(),
                fetchForex(),
            ]);
            const data = [...cryptoData, ...goldData, ...forexData];
            const hasData = data.some(d => d.price !== '—');
            if (!hasData) throw new Error('No data available');
            setPrices(data);
            setError(null);
        } catch (err) {
            console.error('[MarketTicker]', err.message);
            if (prices.length === 0) setError('Live data unavailable');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadPrices();
        intervalRef.current = setInterval(loadPrices, 30_000);
        return () => clearInterval(intervalRef.current);
    }, [loadPrices]);

    const items = prices.length > 0 ? [...prices, ...prices] : [];

    return (
        <>
            <style>{`
        @keyframes ov6-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ov6-ticker-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: ov6-ticker 35s linear infinite;
        }
        .ov6-ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

            <div
                style={{ height: 44, overflow: 'hidden', position: 'relative' }}
                className="w-full bg-black/95 border-b border-yellow-500/25"
            >
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                {loading && (
                    <div className="flex items-center justify-center h-full gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                )}

                {!loading && error && (
                    <div className="flex items-center justify-center h-full text-red-400/70 text-xs tracking-widest">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="ov6-ticker-track h-full">
                        {items.map((item, i) => (
                            <div
                                key={i}
                                style={{ whiteSpace: 'nowrap' }}
                                className="mx-6 flex items-center gap-2.5 text-sm h-full"
                            >
                                <span className="text-yellow-400 font-bold tracking-wide">{item.label}</span>
                                <span className="text-gray-100 font-mono">{item.price}</span>
                                <span
                                    className={`font-semibold text-xs ${item.up === null
                                        ? 'text-gray-500'
                                        : item.up
                                            ? 'text-emerald-400'
                                            : 'text-red-400'
                                        }`}
                                >
                                    {item.up === true ? '▲' : item.up === false ? '▼' : ''} {item.change_p}
                                </span>
                                <span className="text-yellow-500/25 ml-4">│</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default MarketTicker;
