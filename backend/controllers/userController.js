import passport from 'passport';
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      res.status(401).json({
        message: 'Invalid email or password',
      });
    } else {
      generateToken(res, user._id);

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    }
  })(req, res, next);
});

// @desc    Auth user with Google
// @route   GET /api/users/auth/google
// @access  Public
const authUserGoogle = asyncHandler(async (req, res, next) => {
  console.log('Went through authUserGoogle');
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })(req, res, next);
});

// @desc    Callback for Google authentication
// @route   GET /api/users/auth/google/callback
// @access  Public
const authUserGoogleCallback = asyncHandler(async (req, res, next) => {
  passport.authenticate(
    'google',
    {
      failureRedirect: '/',
      session: false,
    },
    async (err, user) => {
      console.log('user', user);
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/');
      }

      console.log('Went through authUserGoogleCallback');

      //since Register through google, verify become true terus
      user.verified = true;
      await user.save();

      generateToken(res, user._id);
      res.redirect(`/`);
    }
  )(req, res, next);
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  console.log('Went through regUser');
  const {
    email,
    password,
    addresses,
    defaultAddressIndex,
    phone,
    ...otherData
  } = req.body;

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('Email already registered');
  }

  // Check if the phone number is already in use
  const phoneExists = await User.findOne({ phone });
  if (phoneExists) {
    res.status(400);
    throw new Error('Phone number already registered');
  }

  // Check if the default address index is out of range
  if (
    addresses &&
    defaultAddressIndex !== undefined &&
    (defaultAddressIndex < 0 || defaultAddressIndex >= addresses.length)
  ) {
    res.status(400);
    throw new Error('Default address index out of range');
  }

  // Create the user with the initial data including addresses
  const user = new User({
    email,
    addresses,
    phone,
    defaultAddressIndex,
    authMethods: [{ provider: 'local', password }],
    ...otherData,
  });

  // Save the user
  await user.save();

  // Generate a token for the user
  generateToken(res, user._id);

  // Respond with the new user's information
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

// @desc    Log user out
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  console.log('Went through logoutuser');
  res.cookie('jwt', '', {
    expires: new Date(0),
    httpOnly: true,
  });

  res.status(200).json({ message: 'Logged out' });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  console.log('Went through getuserprofile');
  const user = await User.findById(req.user._id).select('-password');

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  console.log('Went through authUserbyid');
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc   Get all users
// @route  GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  console.log('Went through getusers');
  const users = await User.find({});
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404);
    throw new Error('No users found');
  }
});

export {
  authUser,
  authUserGoogle,
  authUserGoogleCallback,
  registerUser,
  logoutUser,
  getUserProfile,
  getUserById,
  getUsers,
};
