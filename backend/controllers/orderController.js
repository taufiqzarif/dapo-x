import asyncHandler from '../middleware/asyncHandler.js';
import APIResponse from '../utils/apiResponse.js';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import MenuItem from '../models/menuItemModel.js';
import { calculatePrices } from '../utils/calculatePrices.js';

// @desc    Get all user orders
// @route   GET /api/orders
// @access  Private
const getUserOders = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return APIResponse.notFound(res, 'User not found');
  }

  const orders = await Order.find({ userId: req.user._id });

  APIResponse.success(res, orders, 'Orders retrieved successfully');
});

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    APIResponse.success(res, order, 'Order retrieved successfully');
  } else {
    APIResponse.notFound(res, 'Order not found');
  }
});

// @desc    Get all orders
// @route   GET /api/orders/all
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});

  APIResponse.success(res, orders, 'Orders retrieved successfully');
});

// @desc    Create an order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, paymentMethod, deliveryAddressIndex } = req.body;
  console.log(orderItems);
  console.log(paymentMethod);
  console.log(deliveryAddressIndex);

  // Check user is exist
  const user = await User.findById(req.user._id);

  if (!user) {
    return APIResponse.notFound(res, 'User not found');
  }

  const deliveryAddress = user.addresses[deliveryAddressIndex];

  console.log('deliveryAddress', deliveryAddress);

  if (!orderItems || orderItems.length === 0) {
    return APIResponse.badRequest(res, 'No order items');
  }

  const menuItemsFromDB = await MenuItem.find({
    _id: { $in: orderItems.map((menu) => menu.item) },
  });

  if (menuItemsFromDB.length === 0) {
    return APIResponse.badRequest(res, 'No menu items found');
  }

  const dbOrderItems = orderItems.map((itemFromClient) => {
    console.log('itemFromClient', itemFromClient);
    const matchedItem = menuItemsFromDB.find(
      (itemFromDB) => itemFromDB._id.toString() === itemFromClient.item
    );
    console.log('matchedItem', matchedItem);
    return {
      ...itemFromClient,
      price: matchedItem.price,
      quantity: itemFromClient.quantity,
      item: matchedItem._id,
    };
  });

  if (dbOrderItems.length === 0) {
    return APIResponse.badRequest(res, 'No order items found');
  }

  console.log(menuItemsFromDB);
  console.log('dbOrderItems', dbOrderItems);

  const { totalItemsPrice, deliveryPrice, totalPrice } =
    calculatePrices(dbOrderItems);
  console.log('totalItemsPrice', totalItemsPrice);
  console.log('deliveryPrice', deliveryPrice);
  console.log('totalPrice', totalPrice);

  // const order = new Order({
  //   userId: req.user._id,
  //   orderItems,
  //   deliveryPrice,
  //   taxPrice,
  //   totalPrice,
  //   isPaid: false,
  //   paidAt,
  //   paymentMethod,
  //   paymentResult,
  //   orderStatus,
  //   deliveryAddress,
  //   deliveryDate,
  // });

  // await order.save();

  APIResponse.created(
    res,
    { ...dbOrderItems, totalItemsPrice, totalPrice, deliveryAddress },
    'Order created successfully'
  );
});

export { getUserOders, getOrderById, createOrder, getAllOrders };
