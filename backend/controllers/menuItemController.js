import asyncHandler from '../middleware/asyncHandler.js';
import APIResponse from '../utils/apiResponse.js';
import MenuItem from '../models/menuItemModel.js';
import User from '../models/userModel.js';

// @desc    Get all menu items
// @route   GET /api/menuitems
// @access  Public
const getMenuItems = asyncHandler(async (req, res) => {
  const menuItems = await MenuItem.find({});
  APIResponse.success(res, menuItems, 'Menu items retrieved successfully');
});

// @desc    Get menu item by id
// @route   GET /api/menuitems/:id
// @access  Public
const getMenuItemById = asyncHandler(async (req, res) => {
  const menuItem = await MenuItem.findById(req.params.id);

  if (menuItem) {
    APIResponse.success(res, menuItem, 'Menu item retrieved successfully');
  } else {
    APIResponse.notFound(res, 'Menu item not found');
  }
});

// @desc    Create a menu item
// @route   POST /api/menuitems
// @access  Private/Admin
const createMenuItem = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    menuCategory,
    menuType,
    availability,
    availableDate,
    countInStock,
    imageURL,
    isPreOrderOnly,
  } = req.body;

  // Check user is exist
  const user = await User.findById(req.user._id);

  if (!user) {
    return APIResponse.notFound(res, 'User not found');
  }

  const menuItem = new MenuItem({
    userId: req.user._id,
    name,
    description,
    price,
    menuCategory,
    menuType,
    availability,
    availableDate,
    countInStock,
    imageURL,
    isPreOrderOnly,
  });

  const createdMenuItem = await menuItem.save();
  APIResponse.created(res, createdMenuItem, 'Menu item created successfully');
});

// @desc    Update a menu item
// @route   PUT /api/menuitems/:id
// @access  Private/Admin
const updateMenuItem = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    menuCategory,
    menuType,
    availability,
    availableDate,
    countInStock,
    imageURL,
    isPreOrderOnly,
  } = req.body;

  const menuItem = await MenuItem.findById(req.params.id);

  if (menuItem) {
    menuItem.name = name || menuItem.name;
    menuItem.description = description || menuItem.description;
    menuItem.price = price || menuItem.price;
    menuItem.menuCategory = menuCategory || menuItem.menuCategory;
    menuItem.menuType = menuType || menuItem.menuType;
    menuItem.availability = availability || menuItem.availability;
    menuItem.availableDate = availableDate || menuItem.availableDate;
    menuItem.countInStock = countInStock || menuItem.countInStock;
    menuItem.imageURL = imageURL || menuItem.imageURL;
    menuItem.isPreOrderOnly = isPreOrderOnly || menuItem.isPreOrderOnly;

    const updatedMenuItem = await menuItem.save();
    APIResponse.success(res, updatedMenuItem, 'Menu item updated successfully');
  } else {
    APIResponse.notFound(res, 'Menu item not found');
  }
});

// @desc    Delete a menu item
// @route   DELETE /api/menuitems/:id
// @access  Private/Admin
const deleteMenuItem = asyncHandler(async (req, res) => {
  const menuItem = await MenuItem.findById(req.params.id);

  if (menuItem) {
    await menuItem.deleteOne();
    APIResponse.success(res, {}, 'Menu item deleted successfully');
  } else {
    APIResponse.notFound(res, 'Menu item not found');
  }
});

export {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
