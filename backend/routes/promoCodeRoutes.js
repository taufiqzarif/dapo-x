import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import {
  getPromoCodes,
  getPromoCodeByCode,
  applyPromoCode,
  cancelPromoCode,
  createPromoCode,
  updatePromoCode,
  deletePromoCode,
} from '../controllers/promoCodeController.js';
import validateRequest from '../middleware/validateRequest.js';
import promoCodeSchema from '../validations/promoCodeValidation.js';
import applyPromoCodeSchema from '../validations/applyPromoCodeValidation.js';

const router = express.Router();

router.route('/').get(protect, admin, getPromoCodes);
router.post(
  '/apply',
  protect,
  validateRequest(applyPromoCodeSchema),
  applyPromoCode
);
router.post('/cancel', protect, cancelPromoCode);

// Admin
router.post(
  '/create',
  protect,
  admin,
  validateRequest(promoCodeSchema),
  createPromoCode
);
router.route('/:code').get(protect, admin, getPromoCodeByCode);
router
  .route('/:id')
  .put(protect, admin, checkObjectId, updatePromoCode)
  .delete(protect, admin, checkObjectId, deletePromoCode);

export default router;
