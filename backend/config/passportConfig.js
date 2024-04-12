import passport from 'passport';
import dotenv from 'dotenv';
import asyncHandler from '../middleware/asyncHandler.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/userModel.js';
dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// Local Strategy
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    asyncHandler(async (email, password, done) => {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      const isMatch = await user.matchPassword(password);

      if (!isMatch) {
        return done(null, false, { message: 'Invalid credentials' });
      }

      return done(null, user);
    })
  )
);

// JWT Strategy
passport.use(
  new JwtStrategy(
    options,
    asyncHandler(async (payload, done) => {
      const user = await User.findById(payload.userId);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    })
  )
);

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_BASE_URL}/auth/google/callback`,
      passReqToCallback: true,
    },
    asyncHandler(async (accessToken, refreshToken, profile, cb) => {
      // Console log the profile to see what data is available
      console.log(profile);
      cb(null, profile);
    })
  )
);
