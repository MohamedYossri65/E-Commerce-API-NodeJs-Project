import mongoose from "mongoose";

const brandsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "the name is requierd"],
      trim: true,
      unique: [true, "name must be unique"],
      minLength: [2, "too short brands name"],
    },
    slug: {
      type: String,
      required: [true, "the name is requierd"],
      lowerCase: true,
    },
    logo: {
      type: String,
      // required: [true, "the name is requierd"],
    },
  },
  { timestamps: true }
);

brandsSchema.post('init' ,(doc)=>{
  doc.logo = process.env.BASE_URL +'/brand/'+doc.logo;
})

export const brandModel = mongoose.model("brands", brandsSchema);
