import mongoose from 'mongoose';

const promoCodeSchema = mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    validFrom: { type: Date, required: true },
    validUntil: { type: Date, required: false },
    usageLimit: { type: Number, required: true },
    newUsersOnly: { type: Boolean, default: false },
    active: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const PromoCode = mongoose.model('PromoCode', promoCodeSchema);

export default PromoCode;
