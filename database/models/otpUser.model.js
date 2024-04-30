
import mongoose from "mongoose";

const OtpVerificationSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "the userId is requierd"],
    },
    otpCode: {
      type: String,
      required: [true, "the otpCode is requierd"],
      maxLength: [100, "too long brands name"]
    },
    expiredAt: {
      type: String,
      required: [true, "expiredAt is requierd"],
    }
  },
  { timestamps: true }
);
export const OtpVerificationModel = mongoose.model("OtpVerification", OtpVerificationSchema);
