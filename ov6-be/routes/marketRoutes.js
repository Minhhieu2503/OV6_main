import express from 'express';

const router = express.Router();

// ── Symbols to display ──────────────────────────────────────────────────────────
// Binance pairs (crypto + gold)
const BINANCE_SYMBOLS = [
    { symbol: 'BTCUSDT', label: 'BTC/USD' },
    { symbol: 'ETHUSDT', label: 'ETH/USD' },
    { symbol: 'XAUUSDT', label: 'XAU/USD' },
];

// Forex pairs via ExchangeRate API
const FOREX_PAIRS = [
    { from: 'EUR', to: 'USD', label: 'EUR/USD', invert: false },
    { from: 'GBP', to: 'USD', label: 'GBP/USD', invert: false },
    { from: 'USD', to: 'JPY', label: 'USD/JPY', invert: false },
];

// ── Cache ────────────────────────────────────────────────────────────────────────
let cache = { data: null, fetchedAt: 0, prevRates: null };
const CACHE_TTL_MS = 30_000;

// ── Helpers ──────────────────────────────────────────────────────────────────────
const fmt = (num, decimals = 2) => {
    const n = parseFloat(num);
    if (isNaN(n)) return '—';
    return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};

// ── Fetch from Binance ───────────────────────────────────────────────────────────
async function fetchBinance() {
    const symbols = BINANCE_SYMBOLS.map(s => `"${s.symbol}"`).join(',');
    const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=[${encodeURIComponent(symbols.replace(/"/g, '"'))}]`;
    // Binance encodes differently, use individual calls for reliability
    const results = await Promise.all(
        BINANCE_SYMBOLS.map(async ({ symbol, label }) => {
            try {
                const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
                if (!res.ok) return { label, price: '—', change_p: '—', up: null };
                const d = await res.json();
                const price = parseFloat(d.lastPrice);
                const changePct = parseFloat(d.priceChangePercent);
                const isForex = label.includes('XAU');
                return {
                    label,
                    price: fmt(price, isForex ? 2 : 2),
                    change_p: `${changePct >= 0 ? '+' : ''}${changePct.toFixed(2)}%`,
                    up: changePct >= 0,
                };
            } catch {
                return { label, price: '—', change_p: '—', up: null };
            }
        })
    );
    return results;
}

// ── Fetch Forex from ExchangeRate API ────────────────────────────────────────────
async function fetchForex() {
    try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!res.ok) throw new Error(`ExchangeRate API error: ${res.status}`);
        const json = await res.json();
        const rates = json.rates;

        return FOREX_PAIRS.map(({ from, to, label }) => {
            let price;
            if (from === 'USD') {
                // USD/JPY → rates.JPY
                price = rates[to];
            } else {
                // EUR/USD → 1 / rates.EUR
                price = rates[from] ? 1 / rates[from] : null;
            }

            if (!price) return { label, price: '—', change_p: '—', up: null };

            // Approximate change from previous fetch (if available)
            const prevKey = `${from}${to}`;
            let changePct = null;
            let up = null;
            if (cache.prevRates && cache.prevRates[prevKey]) {
                changePct = ((price - cache.prevRates[prevKey]) / cache.prevRates[prevKey] * 100);
                up = changePct >= 0;
            }

            // Store current rate for next comparison
            if (!cache._currentRates) cache._currentRates = {};
            cache._currentRates[prevKey] = price;

            const decimals = to === 'JPY' ? 4 : 4;
            return {
                label,
                price: fmt(price, decimals),
                change_p: changePct !== null ? `${changePct >= 0 ? '+' : ''}${changePct.toFixed(2)}%` : '~0.00%',
                up: up ?? true,
            };
        });
    } catch (err) {
        console.error('[forex] Error:', err.message);
        return FOREX_PAIRS.map(({ label }) => ({ label, price: '—', change_p: '—', up: null }));
    }
}

// ── GET /api/market/ticker ───────────────────────────────────────────────────────
router.get('/ticker', async (req, res) => {
    try {
        const now = Date.now();

        // Serve from cache if fresh
        if (cache.data && now - cache.fetchedAt < CACHE_TTL_MS) {
            return res.json({ source: 'cache', data: cache.data });
        }

        // Fetch real data from both sources in parallel
        const [binanceData, forexData] = await Promise.all([
            fetchBinance(),
            fetchForex(),
        ]);

        // Combine: crypto first, then forex
        const data = [...binanceData, ...forexData];

        // Update cache + store previous forex rates for change calculation
        cache = {
            data,
            fetchedAt: now,
            prevRates: cache._currentRates || cache.prevRates,
        };

        return res.json({ source: 'live', data });
    } catch (err) {
        console.error('[market/ticker] Error:', err.message);
        if (cache.data) {
            return res.json({ source: 'stale', data: cache.data });
        }
        return res.status(500).json({ error: 'Failed to fetch market data' });
    }
});

export default router;
