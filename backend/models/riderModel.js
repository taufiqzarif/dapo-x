import mongoose from 'mongoose';

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

const Rider = mongoose.model('Rider', riderSchema);

export default Rider;
