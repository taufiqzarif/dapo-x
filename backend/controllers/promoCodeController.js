import asyncHandler from '../middleware/asyncHandler.js';
import APIResponse from '../utils/apiResponse.js';
import PromoCode from '../models/promoCodeModel.js';

// @desc    Get all promo codes
// @route   GET /api/promocodes
// @access  Private/Admin
const getPromoCodes = asyncHandler(async (req, res) => {
  const promoCodes = await PromoCode.find({});
  APIResponse.success(res, promoCodes, 'Promo codes retrieved successfully');
});

export { getPromoCodes };
