import mongoose from "mongoose";
import 'dotenv/config';

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "the name is requierd"],
      trim: true,
      unique: [true, "name must be unique"],
      minLength: [2, "too short category name"],
    },
    img: {
      type: String,
      // required: [true, "the name is requierd"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "the name is requierd"],
      lowerCase: true,
    },
  },
  { timestamps: true }
);
categorySchema.post('init' ,(doc)=>{
  doc.img = process.env.BASE_URL +'/category/'+doc.img;
})

export const categoryModel = mongoose.model("category", categorySchema);

