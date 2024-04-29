import express from 'express';
import {
  authUser,
  authUserGoogle,
  authUserGoogleCallback,
  registerUser,
  logoutUser,
  getUserProfile,
  getUserById,
  getUsers,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import validateRequest from '../middleware/validateRequest.js';
import { localRegisterSchema } from '../validations/userValidation.js';

const router = express.Router();

router
  .route('/')
  .post(validateRequest(localRegisterSchema), registerUser)
  .get(protect, admin, getUsers);
router.post('/auth', authUser);
router.post('/logout', protect, logoutUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/:id').get(protect, admin, checkObjectId, getUserById);

router.get('/auth/google', authUserGoogle);

router.get('/auth/google/callback', authUserGoogleCallback);

router.get('/auth/google/failure', (req, res) => {
  res.status(401).json({ message: 'Google authentication failed' });
});

router.get('/auth/google/success', (req, res) => {
  if (req.user) {
    res.status(200).json({ message: 'Google authentication successful' });
  } else {
    res.status(403).json({ message: 'Not Authorized' });
  }
});

export default router;
