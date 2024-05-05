import mongoose from 'mongoose';

const menuCategorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageURL: { type: String, required: true },
  },
  { timestamps: true }
);

const MenuCategory = mongoose.model('MenuCategory', menuCategorySchema);

export default MenuCategory;
