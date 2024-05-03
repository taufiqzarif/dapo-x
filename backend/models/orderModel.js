import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'MenuItem',
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    deliveryPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: { type: Date },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    orderStatus: { type: String },
    deliveryAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    deliveredAt: { type: Date },
    deliveredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    commissionPercentage: {
      type: Number,
      required: true,
      default: 0.0,
    },
    qrCode: {
      trackingNumber: { type: String, required: true },
      scanned: { type: Boolean, required: true, default: false },
    },
    note: { type: String },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
