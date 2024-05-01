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

// @desc    Get promo code by id
// @route   GET /api/promocodes/:id
// @access  Private/Admin
const getPromoCodeById = asyncHandler(async (req, res) => {
  const promoCode = await PromoCode.findById(req.params.id);

  if (promoCode) {
    APIResponse.success(res, promoCode, 'Promo code retrieved successfully');
  } else {
    APIResponse.badRequest(res, 'Invalid promo code');
  }
});

// @desc    Apply promo code
// @route   POST /api/promocodes
// @access  Private
const applyPromoCode = asyncHandler(async (req, res) => {
  const { promoCodeId } = req.body;
  const user = req.user;
  console.log(user);
  if (!promoCodeId) {
    return APIResponse.badRequest(res, 'Promo code is required');
  }

  if (!user) {
    return APIResponse.unauthorized(res, 'User not found');
  }

  const promoCode = await PromoCode.findById(promoCodeId);

  if (!promoCode) {
    return APIResponse.notFound(res, 'Invalid promo code');
  }

  // Check if the promo code is active
  if (!promoCode.active) {
    return APIResponse.badRequest(res, 'Promo code is not active');
  }

  // Check if the promo code is valid
  if (promoCode.validFrom && promoCode.validFrom > new Date()) {
    return APIResponse.badRequest(res, 'Promo code is not valid');
  }

  // Check if the promo code is expired
  if (promoCode.validUntil && promoCode.validUntil < new Date()) {
    return APIResponse.badRequest(res, 'Promo code has expired');
  }

  // Check user's eligibility to use promo code
  const userPromoUsage = user.promoUsages.find((p) =>
    p.promoCode.equals(promoCodeId)
  );
  if (!userPromoUsage) {
    return APIResponse.badRequest(
      res,
      'You are not eligible to use this promo code'
    );
  }

  // Check if user reached the usage limit for the promo code
  if (userPromoUsage.usedCount >= promoCode.maxUsage) {
    return APIResponse.badRequest(
      res,
      'You have reached the maximum usage limit for this promo code'
    );
  }

  APIResponse.success(res, promoCodeId, 'Promo code applied successfully');
});

export { getPromoCodes, getPromoCodeById, applyPromoCode };
