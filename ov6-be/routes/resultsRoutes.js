import express from 'express';
import {
  getTradeResults,
  getPerformanceStats,
  createTradeResult,
  updatePerformanceStats
} from '../controllers/resultsController.js';

const router = express.Router();

router.get('/trades', getTradeResults);
router.get('/stats', getPerformanceStats);
router.post('/trades', createTradeResult);
router.put('/stats', updatePerformanceStats);

export default router;

