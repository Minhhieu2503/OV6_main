import TradeResult from '../models/TradeResult.js';
import PerformanceStats from '../models/PerformanceStats.js';

// @desc    Get all trade results
// @route   GET /api/results/trades
// @access  Public
export const getTradeResults = async (req, res) => {
  try {
    const { limit = 50, pair } = req.query;
    const query = pair ? { pair: pair.toUpperCase() } : {};

    const trades = await TradeResult.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .select('-__v');

    res.json({
      success: true,
      data: trades,
      count: trades.length
    });
  } catch (error) {
    console.error('Get trade results error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trade results'
    });
  }
};

// @desc    Get performance statistics
// @route   GET /api/results/stats
// @access  Public
export const getPerformanceStats = async (req, res) => {
  try {
    const stats = await PerformanceStats.findOne({ period: 'yearly' });

    if (!stats) {
      // Calculate stats from trades if not exists
      const allTrades = await TradeResult.find();
      const totalTrades = allTrades.length;
      const winningTrades = allTrades.filter(t => t.result > 0).length;
      const losingTrades = totalTrades - winningTrades;
      const winRate = totalTrades > 0 ? (winningTrades / totalTrades * 100).toFixed(2) : 0;
      
      const totalProfit = allTrades.reduce((sum, t) => sum + t.result, 0);
      const avgRiskReward = 2.5; // Default or calculate from trades
      const maxDrawdown = -12; // Default or calculate from trades

      return res.json({
        success: true,
        data: {
          winRate: parseFloat(winRate),
          avgRiskReward: avgRiskReward,
          maxDrawdown: maxDrawdown,
          totalTrades,
          winningTrades,
          losingTrades,
          totalProfit
        }
      });
    }

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get performance stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch performance statistics'
    });
  }
};

// @desc    Create new trade result (Admin only)
// @route   POST /api/results/trades
// @access  Private/Admin
export const createTradeResult = async (req, res) => {
  try {
    const trade = await TradeResult.create(req.body);

    res.status(201).json({
      success: true,
      data: trade
    });
  } catch (error) {
    console.error('Create trade result error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create trade result'
    });
  }
};

// @desc    Update performance stats (Admin only)
// @route   PUT /api/results/stats
// @access  Private/Admin
export const updatePerformanceStats = async (req, res) => {
  try {
    const stats = await PerformanceStats.findOneAndUpdate(
      { period: 'yearly' },
      { ...req.body, lastUpdated: Date.now() },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Update performance stats error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update performance statistics'
    });
  }
};

