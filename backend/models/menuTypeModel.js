import mongoose from 'mongoose';

const menuTypeSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageURL: { type: String, required: true },
  },
  { timestamps: true }
);

const MenuType = mongoose.model('MenuType', menuTypeSchema);

export default MenuType;
