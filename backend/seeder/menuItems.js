import mongoose from 'mongoose';

const menuCategory = {
  _id: new mongoose.Types.ObjectId(),
  name: 'food',
  description: 'Food Menu Items',
  imageURL: '/images/food.jpg',
};

const menuType = {
  _id: new mongoose.Types.ObjectId(),
  name: 'daily',
  description: 'Daily Menu Items',
  imageURL: '/images/daily.jpg',
};

const menuItems = [
  {
    name: 'Garlic Bread',
    description: 'Simple and delicious garlic bread',
    price: 5.99,
    menuCategory: menuCategory._id,
    menuType: menuType._id,
    availability: true,
    availableDate: new Date(),
    countInStock: 100,
    imageURL: '/images/garlic-bread.jpg',
  },
  {
    name: 'Chicken Alfredo',
    description: 'Creamy chicken fettuccine alfredo',
    price: 15.99,
    menuCategory: menuCategory._id,
    menuType: menuType._id,
    availability: true,
    availableDate: new Date(),
    countInStock: 100,
    imageURL: '/images/chicken-alfredo.jpg',
  },
  {
    name: 'Pepperoni Pizza',
    description: 'Classic pepperoni pizza',
    price: 12.99,
    menuCategory: menuCategory._id,
    menuType: menuType._id,
    availability: true,
    availableDate: new Date(),
    countInStock: 100,
    imageURL: '/images/pepperoni-pizza.jpg',
  },
  {
    name: 'Spaghetti and Meatballs',
    description: 'Spaghetti and meatballs in marinara sauce',
    price: 13.99,
    menuCategory: menuCategory._id,
    menuType: menuType._id,
    availability: true,
    availableDate: new Date(),
    countInStock: 100,
    imageURL: '/images/spaghetti-meatballs.jpg',
  },
  {
    name: 'Caesar Salad',
    description:
      'Crisp romaine lettuce with croutons, parmesan cheese, and caesar dressing',
    price: 8.99,
    menuCategory: menuCategory._id,
    menuType: menuType._id,
    availability: true,
    availableDate: new Date(),
    countInStock: 0,
    imageURL: '/images/caesar-salad.jpg',
  },
  {
    name: 'Cheeseburger',
    description: 'Classic cheeseburger with lettuce, tomato, and pickles',
    price: 10.99,
    menuCategory: menuCategory._id,
    menuType: menuType._id,
    availability: true,
    availableDate: new Date(),
    countInStock: 99,
    imageURL: '/images/cheeseburger.jpg',
  },
  {
    name: 'Chicken Tenders',
    description: 'Crispy chicken tenders with your choice of dipping sauce',
    price: 9.99,
    menuCategory: menuCategory._id,
    menuType: menuType._id,
    availability: true,
    availableDate: new Date(),
    countInStock: 100,
    imageURL: '/images/chicken-tenders.jpg',
  },
  {
    name: 'Chocolate Cake',
    description: 'Rich and decadent chocolate cake',
    price: 6.99,
    menuCategory: menuCategory._id,
    menuType: menuType._id,
    availability: true,
    availableDate: new Date(),
    countInStock: 100,
    imageURL: '/images/chocolate-cake.jpg',
  },
];

export { menuCategory, menuType, menuItems };
