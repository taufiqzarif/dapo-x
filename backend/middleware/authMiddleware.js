import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';
import { roles } from '../utils/roles.js';
import APIResponse from '../utils/apiResponse.js';

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Get token from header
  token = req.cookies.jwt;

  if (token) {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // GET user from DB
    req.user = await User.findById(decoded.userId).select(
      '-authMethods.password'
    );

    // Check if user role is valid
    if (!req.user || !(req.user.role in roles)) {
      return APIResponse.unauthorized(res, 'Not authorized, please login');
    }

    next();
  } else {
    return APIResponse.unauthorized(res, 'Not authorized, no token');
  }
});

// Admin routes
const admin = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.userId).select(
      '-authMethods.password'
    );

    if (!req.user || req.user.role !== roles.admin) {
      return APIResponse.unauthorized(res, 'Not authorized, please login');
    }

    next();
  } else {
    return APIResponse.unauthorized(res, 'Not authorized, no token');
  }
});

export { protect, admin };
