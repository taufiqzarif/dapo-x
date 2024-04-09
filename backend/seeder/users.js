import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// seed data for users
const users = [
  {
    email: 'admin@admin.com',
    password: bcrypt.hashSync('1', 10),
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
    ],
    phone: '0123456789',
  },
  {
    email: 'test@test.com',
    password: bcrypt.hashSync('1', 10),
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
    phone: '0123456789',
  },
  {
    email: 'test2@test.com',
    password: bcrypt.hashSync('1', 10),
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
    phone: '0123456789',
  },
];

export default users;
