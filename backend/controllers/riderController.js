import passport from 'passport';
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import Rider from '../models/riderModel.js';
import APIResponse from '../utils/apiResponse.js';

// @desc    Auth rider & get token
// @route   POST /api/riders/login
// @access  Public
const authRider = asyncHandler(async (req, res, next) => {
  passport.authenticate('rider-local', { session: false }, (err, rider) => {
    if (err || !rider) {
      APIResponse.unauthorized(res, 'Invalid email or password');
    } else {
      generateToken(res, rider._id);

      APIResponse.success(res, 'Login successful');
    }
  })(req, res, next);
});

// @desc    Auth rider with Google
// @route   GET /api/riders/auth/google
// @access  Public
const authRiderGoogle = asyncHandler(async (req, res, next) => {
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })(req, res, next);
});

// @desc    Callback for Google authentication
// @route   GET /api/riders/auth/google/callback
// @access  Public
const authRiderGoogleCallback = asyncHandler(async (req, res, next) => {
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

      let rider = await Rider.findOne({ email: defaultEmail });

      if (!rider) {
        rider = await Rider.create({
          name: profile.displayName,
          email: defaultEmail,
          phone: profile.phone,
          authMethods: [
            {
              provider: 'google',
              providerId: profile.id,
            },
          ],
          // city: profile.city, // need to think other logic for this
          icCardImage: profile.icCardImage,
          selfieImage: profile.selfieImage,
        });
      }

      generateToken(res, rider._id);

      APIResponse.success(res, 'Login successful');
    }
  )(req, res, next);
});

// @desc    Register a new rider
// @route   POST /api/riders/register
// @access  Public
const registerRider = asyncHandler(async (req, res) => {
  const { name, email, phone, authMethods, city, icCardImage, selfieImage } =
    req.body;

  const riderExists = await Rider.findOne({ email });

  if (riderExists) {
    return APIResponse.badRequest(res, 'Rider already exists');
  }

  const phoneExists = await Rider.findOne({ phone });

  if (phoneExists) {
    return APIResponse.badRequest(res, 'Phone number already in use');
  }

  const rider = await Rider.create({
    name,
    email,
    phone,
    authMethods,
    city,
    icCardImage,
    selfieImage,
  });

  await rider.save();

  generateToken(res, rider._id);

  APIResponse.created(res, 'Rider created successfully');
});

// @desc    Logout rider
// @route   POST /api/riders/logout
// @access  Private
const logoutRider = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    expires: new Date(0),
    httpOnly: true,
  });

  APIResponse.success(res, 'Logged out successfully');
});

// @desc    Get rider profile
// @route   GET /api/riders/profile
// @access  Private
const getRiderProfile = asyncHandler(async (req, res) => {
  const rider = await Rider.findById(req.rider._id);

  if (rider) {
    APIResponse.success(res, rider);
  } else {
    APIResponse.notFound(res, 'Rider not found');
  }
});

export {
  authRider,
  authRiderGoogle,
  authRiderGoogleCallback,
  registerRider,
  logoutRider,
  getRiderProfile,
};
