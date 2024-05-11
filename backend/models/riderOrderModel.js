import mongoose from 'mongoose';

const riderOrderSchema = mongoose.Schema(
  {
    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rider',
      required: true,
    },
    orderItems: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    ],
    // Total profit calculated from base fee, order value fee, distance fee, and tips
    profitAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

const RiderOrder = mongoose.model('RiderOrder', riderOrderSchema);

export default RiderOrder;
