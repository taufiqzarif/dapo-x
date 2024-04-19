import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  getUserById,
  getUsers,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import validateRequest from '../middleware/validateRequest.js';
import {
  localRegisterSchema,
  googleRegisterSchema,
} from '../validations/userValidation.js';
import passport from 'passport';
import generateToken from '../utils/generateToken.js';

const router = express.Router();

router
  .route('/')
  .post(validateRequest(localRegisterSchema), registerUser)
  .get(protect, admin, getUsers);
router.post('/auth', authUser);
router.post('/logout', protect, logoutUser);
router.route('/profile').get(protect, getUserProfile);
router.get('/:id', protect, admin, checkObjectId, getUserById);

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    console.log(req.user._id); // This is the user ID from the database
    generateToken(res, req.user._id);
    res.redirect(`/`);
  }
);

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
