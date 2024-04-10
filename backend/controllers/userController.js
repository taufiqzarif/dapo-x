import passport from 'passport';
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  })(req, res);
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('Already registered');
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  generateToken(res, user._id);

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

export { authUser, registerUser };
