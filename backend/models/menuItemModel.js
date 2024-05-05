import mongoose from 'mongoose';

const menuItemSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    menuCategory: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'MenuCategory',
    },
    menuType: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'MenuType',
    },
    availability: { type: Boolean, required: true, default: false },
    availableDate: { type: Date, required: false },
    countInStock: { type: Number, required: true, default: 0 },
    imageURL: { type: String, required: true },
    isPreOrderOnly: { type: Boolean, required: false, default: false },
  },
  { timestamps: true }
);

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;
