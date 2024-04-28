import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "the comment is requierd"],
      trim: true,
      minLength: [2, "too short review comment"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    }, rating: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/ ,function(){
  this.populate('user' ,'name')
})

export const reviewModel = mongoose.model("review", reviewSchema);
