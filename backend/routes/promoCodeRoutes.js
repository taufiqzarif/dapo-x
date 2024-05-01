import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  getPromoCodes,
  getPromoCodeById,
  applyPromoCode,
} from '../controllers/promoCodeController.js';

const router = express.Router();

router.route('/').get(protect, admin, getPromoCodes);
router.post('/apply', protect, applyPromoCode);

export default router;
