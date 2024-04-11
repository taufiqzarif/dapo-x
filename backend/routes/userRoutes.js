import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

const router = express.Router();

router.route('/').post(registerUser);
router.post('/auth', authUser);
router.post('/logout', protect, logoutUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
