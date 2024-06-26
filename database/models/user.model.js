
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import 'dotenv/config';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "the name is requierd"],
      trim: true,
      unique: [true, "name must be unique"],
      minLength: [2, "too short brands name"],
    },
    email: {
      type: String,
      required: [true, "the email is requierd"],
      trim: true,
      unique: [true, "email must be unique"],
      minLength: [2, "too short email name"],
    },
    password: {
      type: String,
      trim: true,
      require:[true, "the password is requierd"],
      minLength: [8, "too short"],
      maxLength: [100, "too long"]
    },
    PasswordChangeDate: Date,
    phone: {
      type: Number,
      trim: true,
      minLength: [11, "too short"],
    },
    profilImg: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    whishlist: [{ type: mongoose.Types.ObjectId, ref: 'product' }],
    addresses: [{
      street: String,
      city: String,
      phone: String,
    }],
    googleId:String
  },
  { timestamps: true }
);

userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 8);
})
userSchema.pre('findOneAndUpdate', function () {
  if (this._update.password) {
    
    this._update.password = bcrypt.hashSync(this._update.password, 8);
  }
})

userSchema.post('init', (doc) => {
  doc.profilImg = process.env.BASE_URL+'/user/'+ doc.profilImg;
})

export const userModel = mongoose.model("user", userSchema);
