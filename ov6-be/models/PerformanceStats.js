import mongoose from 'mongoose';

const performanceStatsSchema = new mongoose.Schema({
  period: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
    required: true,
    unique: true
  },
  winRate: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  avgRiskReward: {
    type: Number,
    required: true,
    min: 0
  },
  maxDrawdown: {
    type: Number,
    required: true,
    max: 0
  },
  totalTrades: {
    type: Number,
    required: true,
    min: 0
  },
  winningTrades: {
    type: Number,
    required: true,
    min: 0
  },
  losingTrades: {
    type: Number,
    required: true,
    min: 0
  },
  totalProfit: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

performanceStatsSchema.index({ period: 1 });

export default mongoose.model('PerformanceStats', performanceStatsSchema);

