import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { getPromoCodes } from '../controllers/promoCodeController.js';

const router = express.Router();

router.route('/').get(protect, admin, getPromoCodes);

export default router;
