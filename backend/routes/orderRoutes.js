import express from 'express';
import {
  createOrder,
  getOrderById,
  getUserOders,
  getAllOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import validateRequest from '../middleware/validateRequest.js';
import createOrderSchema from '../validations/createOrderValidation.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getUserOders)
  .post(protect, validateRequest(createOrderSchema), createOrder);
router.route('/all').get(protect, admin, getAllOrders);
router.route('/:id').get(protect, checkObjectId, getOrderById);

export default router;
