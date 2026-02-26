// Seed data for development/testing
// Run this script to populate database with initial data

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import BlogPost from '../models/BlogPost.js';
import TradeResult from '../models/TradeResult.js';
import PerformanceStats from '../models/PerformanceStats.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ov6');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await BlogPost.deleteMany({});
    await TradeResult.deleteMany({});
    await PerformanceStats.deleteMany({});

    // Seed Blog Posts
    const blogPosts = [
      {
        title: 'Vì Sao 90% Trader Thua Lỗ?',
        excerpt: 'Phân tích sâu về những lý do phổ biến khiến đa số trader thất bại và cách khắc phục...',
        content: 'Nội dung chi tiết về lý do trader thua lỗ...',
        category: 'Tâm lý Trading',
        published: true,
        publishedAt: new Date('2025-12-20')
      },
      {
        title: 'Cách Tôi Quản Lý Rủi Ro Mỗi Lệnh',
        excerpt: 'Chia sẻ chi tiết về quy trình quản lý vốn và tính toán position size cho mỗi giao dịch...',
        content: 'Nội dung chi tiết về quản lý rủi ro...',
        category: 'Quản lý vốn',
        published: true,
        publishedAt: new Date('2025-12-18')
      },
      {
        title: 'Phân Tích EUR/USD Tuần Này',
        excerpt: 'Nhìn vào cấu trúc giá, supply/demand zones và kịch bản giao dịch tiềm năng...',
        content: 'Nội dung phân tích EUR/USD...',
        category: 'Phân tích',
        published: true,
        publishedAt: new Date('2025-12-16')
      }
    ];

    const createdPosts = await BlogPost.insertMany(blogPosts);
    console.log(`✅ Created ${createdPosts.length} blog posts`);

    // Seed Trade Results
    const tradeResults = [
      {
        date: new Date('2025-12-15'),
        pair: 'EUR/USD',
        type: 'Long',
        entry: 1.0850,
        exit: 1.0898,
        stopLoss: 1.0820,
        takeProfit: 1.0910,
        result: 480,
        resultPercent: 2.3,
        notes: 'Breakout trade from consolidation zone'
      },
      {
        date: new Date('2025-12-14'),
        pair: 'BTC/USDT',
        type: 'Short',
        entry: 42500,
        exit: 42160,
        stopLoss: 42800,
        takeProfit: 41800,
        result: -340,
        resultPercent: -0.8,
        notes: 'Early exit due to risk management'
      },
      {
        date: new Date('2025-12-13'),
        pair: 'GBP/JPY',
        type: 'Long',
        entry: 185.50,
        exit: 187.25,
        stopLoss: 184.80,
        takeProfit: 187.50,
        result: 1750,
        resultPercent: 3.1,
        notes: 'Strong trend continuation'
      }
    ];

    const createdTrades = await TradeResult.insertMany(tradeResults);
    console.log(`✅ Created ${createdTrades.length} trade results`);

    // Seed Performance Stats
    const performanceStats = {
      period: 'yearly',
      winRate: 58,
      avgRiskReward: 2.5,
      maxDrawdown: -12,
      totalTrades: 200,
      winningTrades: 116,
      losingTrades: 84,
      totalProfit: 15000,
      lastUpdated: new Date()
    };

    await PerformanceStats.create(performanceStats);
    console.log('✅ Created performance statistics');

    console.log('\n🎉 Seed data created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

