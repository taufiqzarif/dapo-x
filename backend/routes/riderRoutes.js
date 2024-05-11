import express from 'express';
import { protect } from '../middleware/authRiderMiddleware.js';
import {
  authRider,
  authRiderGoogle,
  authRiderGoogleCallback,
  registerRider,
  logoutRider,
  getRiderProfile,
} from '../controllers/riderController.js';
import validateRequest from '../middleware/validateRequest.js';
import { registerLocalRiderValidation } from '../validations/riderValidation.js';
import APIResponse from '../utils/apiResponse.js';

const router = express.Router();

router.post('/auth', authRider);
router.post('/logout', protect, logoutRider);
router.get('/profile', protect, getRiderProfile);
router
  .route('/register')
  .post(validateRequest(registerLocalRiderValidation), registerRider);

router.get('/auth/google', authRiderGoogle);

router.get('/auth/google/callback', authRiderGoogleCallback);

router.get('/auth/google/failure', (req, res) => {
  APIResponse.unauthorized(res, 'Google authentication failed');
});

router.get('/auth/google/success', (req, res) => {
  if (req.rider) {
    APIResponse.success(res, 'Google authentication successful');
  } else {
    APIResponse.unauthorized(res, 'Not Authorized');
  }
});

export default router;
