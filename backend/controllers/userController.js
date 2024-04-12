import passport from 'passport';
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  // console.log(req.body);
  passport.authenticate('local', { session: false }, (err, user) => {
    // console.log(err, user);
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
  const { email, addresses, defaultAddressIndex, ...otherData } = req.body;

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('Already registered');
  }

  // Validate default address index
  if (
    !addresses ||
    defaultAddressIndex >= addresses.length ||
    defaultAddressIndex < 0
  ) {
    res.status(400);
    throw new Error('Default address index out of range');
  }

  // Create the user with the initial data including addresses
  const user = new User({
    email,
    addresses,
    ...otherData,
  });

  // Set the default address using the validated index
  user.defaultAddress = addresses[defaultAddressIndex]._id; // Assigning the MongoDB ID before save to ensure it exists

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
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { authUser, registerUser, logoutUser, getUserProfile, getUserById };
