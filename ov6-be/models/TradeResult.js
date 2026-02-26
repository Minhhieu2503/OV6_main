import mongoose from 'mongoose';

const tradeResultSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now
  },
  pair: {
    type: String,
    required: [true, 'Trading pair is required'],
    trim: true,
    uppercase: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Long', 'Short'],
    uppercase: true
  },
  entry: {
    type: Number,
    required: true
  },
  exit: {
    type: Number,
    required: true
  },
  stopLoss: {
    type: Number,
    required: true
  },
  takeProfit: {
    type: Number,
    required: true
  },
  result: {
    type: Number,
    required: true
  },
  resultPercent: {
    type: Number,
    required: true
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

tradeResultSchema.index({ date: -1 });
tradeResultSchema.index({ pair: 1 });

export default mongoose.model('TradeResult', tradeResultSchema);

