import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const addressSchema = mongoose.Schema({
  addressName: { type: String },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
});

const userSchema = mongoose.Schema(
  {
    method: {
      type: String,
      enum: ['local', 'google'],
      required: true,
      default: 'local',
    },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: function () {
        return this.method === 'local';
      },
    },
    name: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    defaultAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    },
    addresses: [addressSchema],
    phone: { type: String },
  },
  { timestamps: true }
);

// Method to match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
