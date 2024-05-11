import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const authSchema = mongoose.Schema(
  {
    provider: { type: String, required: true }, // 'local', 'google'
    providerId: { type: String, unique: true, sparse: true }, // Unique only for entries with provider 'google'
    password: { type: String }, // Only required for local auth
    token: { type: String }, // Optional store token if needed
  },
  { _id: false }
);

const riderSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    authMethods: [authSchema],
    city: { type: String, required: true },
    isVerified: { type: Boolean, required: true, default: false }, // Rider verification status using IC card and selfie image. Admin can verify rider.
    icCardImage: { type: String, required: true }, // IC card image for verification
    selfieImage: { type: String, required: true }, // Selfie image for verification
    active: { type: Boolean, required: true, default: false }, // Rider account activation by admin
    available: { type: Boolean, required: true, default: false }, // Rider availability status for delivery orders
  },
  { timestamps: true }
);

riderSchema.methods.matchPassword = async function (enteredPassword) {
  const localAuth = this.authMethods.find(
    (method) => method.provider === 'local'
  );
  if (!localAuth || !localAuth.password) {
    throw new Error('Local authentication method not configured');
  }
  return await bcrypt.compare(enteredPassword, localAuth.password);
};

riderSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const localAuth = this.authMethods.find(
    (method) => method.provider === 'local'
  );
  const salt = await bcrypt.genSalt(10);
  localAuth.password = await bcrypt.hash(localAuth.password, salt);
});

const Rider = mongoose.model('Rider', riderSchema);

export default Rider;
