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
// @route   GET /api/promocodes/:code
// @access  Private/Admin
const getPromoCodeByCode = asyncHandler(async (req, res) => {
  const promoCode = await PromoCode.findOne({ code: req.params.code });

  if (promoCode) {
    APIResponse.success(res, promoCode, 'Promo code retrieved successfully');
  } else {
    APIResponse.badRequest(res, 'Invalid promo code');
  }
});

// @desc    Apply promo code
// @route   POST /api/promocodes/apply
// @access  Private
const applyPromoCode = asyncHandler(async (req, res) => {
  let { code } = req.body;
  const user = req.user;

  if (!user) {
    return APIResponse.unauthorized(res, 'User not found');
  }

  if (!code) {
    return APIResponse.badRequest(res, 'Promo code is required');
  }

  // Only one promo code is allowed
  if (Array.isArray(code)) {
    return APIResponse.badRequest(res, 'Only one promo code is allowed');
  }

  code = code.toUpperCase().trim();

  const promoCode = await PromoCode.findOne({ code });

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
  if (promoCode.validUntil !== null && promoCode.validUntil < new Date()) {
    return APIResponse.badRequest(res, 'Promo code has expired');
  }

  // Check user's eligibility to use promo code
  const userPromoUsage = user.promoUsages.find((p) => p.promoCode.equals(code));

  // Check if user reached the usage limit for the promo code
  if (userPromoUsage && userPromoUsage.usedCount >= promoCode.maxUsage) {
    return APIResponse.badRequest(
      res,
      'You have reached the maximum usage limit for this promo code'
    );
  }

  // Create a new promo usage for the user, else if exist increment the used count
  if (!userPromoUsage) {
    user.promoUsages.push({
      promoCode: promoCode._id,
      usedCount: 1,
    });
  } else {
    userPromoUsage.usedCount += 1;
  }
  await user.save();

  APIResponse.success(res, code, 'Promo code applied successfully');
});

// @desc    Cancel promo code
// @route   POST /api/promocodes
// @access  Private
const cancelPromoCode = asyncHandler(async (req, res) => {
  const { code } = req.body;
  const user = req.user;

  if (!user) {
    return APIResponse.unauthorized(res, 'User not found');
  }

  if (!code) {
    return APIResponse.badRequest(res, 'Promo code is required');
  }

  const promoCode = await PromoCode.findOne(code);

  if (!promoCode) {
    return APIResponse.notFound(res, 'Invalid promo code');
  }

  APIResponse.success(res, code, 'Promo code cancelled successfully');
});

// @desc    Create promo code
// @route   POST /api/promocodes/create
// @access  Private/Admin
const createPromoCode = asyncHandler(async (req, res) => {
  const {
    code,
    discount,
    validFrom,
    validUntil,
    active,
    newUsersOnly,
    usageLimit,
  } = req.body;

  const newPromoCode = new PromoCode({
    code: code.toUpperCase().trim(),
    discount,
    validFrom,
    validUntil,
    active,
    newUsersOnly,
    usageLimit,
  });

  // Check if the promo code is already exists
  const promoCodeExists = await PromoCode.findOne({ code });

  if (promoCodeExists) {
    return APIResponse.badRequest(res, 'Promo code already exists');
  }

  const createdPromoCode = await newPromoCode.save();
  APIResponse.created(res, createdPromoCode, 'Promo code created successfully');
});

// @desc    Update promo code
// @route   PUT /api/promocodes/:id
// @access  Private/Admin
const updatePromoCode = asyncHandler(async (req, res) => {
  const promoCode = await PromoCode.findById(req.params.id);

  if (promoCode) {
    promoCode.code = req.body.code || promoCode.code;
    promoCode.discount = req.body.discount || promoCode.discount;
    promoCode.validFrom = req.body.validFrom || promoCode.validFrom;
    promoCode.validUntil = req.body.validUntil || promoCode.validUntil;
    promoCode.active = req.body.active || promoCode.active;
    promoCode.newUsersOnly = req.body.newUsersOnly || promoCode.newUsersOnly;
    promoCode.usageLimit = req.body.usageLimit || promoCode.usageLimit;

    const updatedPromoCode = await promoCode.save();
    APIResponse.success(
      res,
      updatedPromoCode,
      'Promo code updated successfully'
    );
  } else {
    APIResponse.notFound(res, 'Promo code not found');
  }
});

// @desc    Delete promo code
// @route   DELETE /api/promocodes/:id
// @access  Private/Admin
const deletePromoCode = asyncHandler(async (req, res) => {
  const promoCode = await PromoCode.findById(req.params.id);

  if (promoCode) {
    await promoCode.deleteOne();
    APIResponse.success(res, {}, 'Promo code deleted successfully');
  } else {
    APIResponse.notFound(res, 'Promo code not found');
  }
});

export {
  getPromoCodes,
  getPromoCodeByCode,
  applyPromoCode,
  cancelPromoCode,
  createPromoCode,
  updatePromoCode,
  deletePromoCode,
};
