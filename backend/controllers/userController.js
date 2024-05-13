import passport from 'passport';
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import APIResponse from '../utils/apiResponse.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      APIResponse.unauthorized(res, 'Invalid email or password');
    } else {
      generateToken(res, user._id);

      APIResponse.success(res, 'Login successful');
    }
  })(req, res, next);
});

// @desc    Auth user with Google
// @route   GET /api/users/auth/google
// @access  Public
const authUserGoogle = asyncHandler(async (req, res, next) => {
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
    async (err, profile) => {
      if (err) {
        return next(err);
      }
      if (!profile) {
        return res.redirect('/');
      }

      const defaultEmail = profile.emails[0].value;

      if (!defaultEmail) {
        return cb(null, false, { message: 'Email not found' });
      }

      let user = await User.findOne({ email: defaultEmail });

      if (!user) {
        user = await User.create({
          name: profile.displayName,
          email: defaultEmail,
          authMethods: [{ provider: profile.provider, providerId: profile.id }],
          verified: true,
        });
      }

      generateToken(res, user._id);
      res.redirect(`http://localhost:3000/`);
      // return APIResponse.success(res, 'Google authentication successful');
    }
  )(req, res, next);
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
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
    APIResponse.badRequest(res, 'User already exists');
  }

  // Check if the phone number is already in use
  const phoneExists = await User.findOne({ phone });
  if (phoneExists) {
    APIResponse.badRequest(res, 'Phone number already in use');
  }

  // Check if the default address index is out of range
  if (
    addresses &&
    defaultAddressIndex !== undefined &&
    (defaultAddressIndex < 0 || defaultAddressIndex >= addresses.length)
  ) {
    APIResponse.badRequest(res, 'Default address index out of range');
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
  APIResponse.created(
    res,
    { _id: user._id, name: user.name, email: user.email },
    'User created successfully'
  );
});

// @desc    Log user out
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    expires: new Date(0),
    httpOnly: true,
  });

  APIResponse.success(res, 'Logged out successfully');
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    '-authMethods.password'
  );

  if (user) {
    APIResponse.success(res, user, 'User profile retrieved successfully');
  } else {
    APIResponse.notFound(res, 'User not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select(
    '-authMethods.password'
  );

  if (user) {
    APIResponse.success(res, user, 'User retrieved successfully');
  } else {
    APIResponse.notFound(res, 'User not found');
  }
});

// @desc   Get all users
// @route  GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) {
    APIResponse.success(res, users, 'Users retrieved successfully');
  } else {
    APIResponse.notFound(res, 'No users found');
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
