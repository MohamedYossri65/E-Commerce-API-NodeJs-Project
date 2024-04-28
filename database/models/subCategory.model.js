import mongoose from "mongoose";

const subCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "the name is requierd"],
      trim: true,
      unique: [true, "name must be unique"],
      minLength: [2, "too short subCategory name"],
    },
    slug: {
      type: String,
      required: [true, "the name is requierd"],
      lowerCase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: [true, "the description is requierd"],
    },
  },
  { timestamps: true }
);

export const subCategoryModel = mongoose.model("subCategory", subCategorySchema);
