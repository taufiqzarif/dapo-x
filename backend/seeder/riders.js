import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const riders = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Rider 1',
    email: 'r1@rider.com',
    phone: '01234567890',
    city: 'Miri',
    authMethods: [
      {
        provider: 'local',
        password: bcrypt.hashSync('1', 10),
      },
    ],
    isVerified: true,
    icCardImage: '/images/ic-card-1.jpg',
    selfieImage: '/images/selfie-1.jpg',
    active: true,
    available: true,
  },
];

export default riders;
