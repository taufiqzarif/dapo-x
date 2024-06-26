import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// seed data for users
const users = [
  {
    email: 'admin@admin.com',
    name: 'Admin User',
    role: 'admin',
    addresses: [
      {
        _id: new mongoose.Types.ObjectId(),
        addressName: 'Home',
        street: '123 Admin',
        city: 'Miri',
        state: 'Sarawak',
        zipCode: '98000',
      },
      {
        _id: new mongoose.Types.ObjectId(),
        street: '456 No address name',
        city: 'Miri',
        state: 'Sarawak',
        zipCode: '98000',
      },
    ],
    phone: '0123456789',
    defaultAddressIndex: 0,
    authMethods: [
      {
        provider: 'local',
        password: bcrypt.hashSync('1', 10),
      },
    ],
  },
  {
    email: 'test@test.com',
    name: 'Test User',
    role: 'user',
    addresses: [
      {
        _id: new mongoose.Types.ObjectId(),
        addressName: 'Home',
        street: '123 Test',
        city: 'Miri',
        state: 'Sarawak',
        zipCode: '98000',
      },
    ],
    phone: '01234567890',
    defaultAddressIndex: 0,
    authMethods: [
      {
        provider: 'local',
        password: bcrypt.hashSync('1', 10),
      },
    ],
  },
  {
    email: 'test2@test.com',
    name: 'Test 2 User',
    role: 'user',
    addresses: [
      {
        _id: new mongoose.Types.ObjectId(),
        addressName: 'Home',
        street: '123 Test 2',
        city: 'Miri',
        state: 'Sarawak',
        zipCode: '98000',
      },
      {
        _id: new mongoose.Types.ObjectId(),
        addressName: 'Work',
        street: '456 Test 2',
        city: 'Miri',
        state: 'Sarawak',
        zipCode: '98000',
      },
    ],
    phone: '01234567891',
    defaultAddressIndex: 1,
    authMethods: [
      {
        provider: 'local',
        password: bcrypt.hashSync('1', 10),
      },
    ],
  },
  {
    email: 'rider@rider.com',
    name: 'Rider User',
    role: 'rider',
    phone: '01234567892',
    authMethods: [
      {
        provider: 'local',
        password: bcrypt.hashSync('1', 10),
      },
    ],
    addresses: [
      {
        _id: new mongoose.Types.ObjectId(),
        addressName: 'Home',
        street: '123 Rider',
        city: 'Miri',
        state: 'Sarawak',
        zipCode: '98000',
      },
    ],
    defaultAddressIndex: 0,
  },
];

export default users;
