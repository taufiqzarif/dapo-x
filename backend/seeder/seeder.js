import dotenv from 'dotenv';
import users from './users.js';
import menuItems from './menuItems.js';
import promoCodes from './promoCodes.js';
import connectDB from '../config/db.js';
import User from '../models/userModel.js';
import MenuItem from '../models/menuItemModel.js';
import Order from '../models/orderModel.js';
import Review from '../models/reviewModel.js';
import PromoCode from '../models/promoCodeModel.js';
dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Review.deleteMany();
    await User.deleteMany();
    await MenuItem.deleteMany();
    await PromoCode.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleMenuItems = menuItems.map((menuItem) => {
      return { ...menuItem, userId: adminUser };
    });

    await MenuItem.insertMany(sampleMenuItems);

    await PromoCode.insertMany(promoCodes);

    // Assign default address to admin user
    createdUsers[0].defaultAddress = createdUsers[0].addresses[0]._id;
    await createdUsers[0].save();

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Review.deleteMany();
    await User.deleteMany();
    await MenuItem.deleteMany();
    await PromoCode.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
