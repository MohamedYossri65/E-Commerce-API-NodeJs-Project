import mongoose from "mongoose";

const couponSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "the code is requierd"],
      trim: true,
      unique: [true, "code must be unique"],
      minLength: [2, "too short coupon code"],
    },
    expires: {
      type: Date,
      required: [true, "the coupon date is requierd"],
    },
    discount: {
      type: Number,
      min: 0,
      required: [true, "the discount is requierd"],
    },
  },
  { timestamps: true }
);

export const couponModel = mongoose.model("coupon", couponSchema);