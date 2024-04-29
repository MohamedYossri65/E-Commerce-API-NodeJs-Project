
import mongoose from "mongoose";

const OtpVerificationSchema = mongoose.Schema(
  {
    userId:String,
    otpCode: {
      type: String,
      required: [true, "the name is requierd"],
    },
    expiredAt: {
      type: String,
      required: [true, "the email is requierd"],
    }
  },
  { timestamps: true }
);
export const OtpVerificationModel = mongoose.model("OtpVerification", OtpVerificationSchema);
