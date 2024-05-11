import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import Rider from '../models/riderModel.js';
import APIResponse from '../utils/apiResponse.js';

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.rider = await Rider.findById(decoded.riderId).select(
      '-authMethods.password'
    );

    if (!req.rider) {
      return APIResponse.unauthorized(res, 'Not authorized, please login');
    }

    next();
  } else {
    return APIResponse.unauthorized(res, 'Not authorized, no token');
  }
});

export { protect };
