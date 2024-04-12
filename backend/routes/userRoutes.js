import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  getUserById,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import validateRequest from '../middleware/validateRequest.js';
import { registerSchema } from '../validations/userValidation.js';

const router = express.Router();

router.route('/').post(validateRequest(registerSchema), registerUser);
router.post('/auth', authUser);
router.post('/logout', protect, logoutUser);
router.route('/profile').get(protect, getUserProfile);
router.get('/:id', protect, admin, checkObjectId, getUserById);

export default router;
