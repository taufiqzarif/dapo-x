import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../controllers/menuItemController.js';
import validateRequest from '../middleware/validateRequest.js';
import menuItemSchema from '../validations/menuItemValidation.js';

const router = express.Router();

router
  .route('/')
  .get(getMenuItems)
  .post(protect, admin, validateRequest(menuItemSchema), createMenuItem);
router
  .route('/:id')
  .get(checkObjectId, getMenuItemById)
  .put(protect, admin, checkObjectId, updateMenuItem)
  .delete(protect, admin, checkObjectId, deleteMenuItem);

export default router;
