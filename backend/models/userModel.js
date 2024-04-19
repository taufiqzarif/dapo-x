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

const addressSchema = mongoose.Schema({
  addressName: { type: String },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
});

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    authMethods: [authSchema],
    role: { type: String, required: true, default: 'user' },
    defaultAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    },
    addresses: [addressSchema],
    phone: { type: String, required: true, unique: true },
    verified: { type: Boolean, default: false }, // Limit access to unverified users e.g. (order placement)
  },
  { timestamps: true }
);

// Method to match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  const localAuth = this.authMethods.find(
    (method) => method.provider === 'local'
  );
  if (!localAuth || !localAuth.password) {
    throw new Error('Local authentication method not configured');
  }
  return await bcrypt.compare(enteredPassword, localAuth.password);
};

// Middleware to hash password before saving (Only hash the password if it has been modified (or is new))
userSchema.pre('save', async function (next) {
  const localAuth = this.authMethods.find(
    (method) => method.provider === 'local'
  );

  if (localAuth && localAuth.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    localAuth.password = await bcrypt.hash(localAuth.password, salt);
  }
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
