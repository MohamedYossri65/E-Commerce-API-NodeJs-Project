import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "the title is requierd"],
      trim: true,
      unique: [true, "title must be unique"],
      minLength: [2, "too short product title"],
    },
    slug: {
      type: String,
      required: [true, "the title is requierd"],
      lowerCase: true,
    },
    price: {
      type: Number,
      required: [true, "the title is requierd"],
      min: 0,
    },
    priceAfterDiscount: {
      type: Number,
      min: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    ratingAvg: {
      type: Number,
      min: [1, "rating average must be greater than 1"],
      max: [5, "rating average must be less than 5"],
    },
    description: {
      type: String,
      minLength: [5, "too short product description"],
      maxLength: [300, "too long product description"],
      required: [true, "the description is requierd"],
      trim: true,
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0,
      required: [true, "the quantity is requierd"],
    },
    sold: {
      type: Number,
      default: 0,
      min: 0,
    },
    imgCover: String,
    imgs: [String],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: [true, "the category is requierd"],
    },
    brands: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brands",
      required: [true, "the brands is requierd"],
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategory",
      required: [true, "the subCategory is requierd"],
    },
  },
  { timestamps: true ,toJSON: { virtuals: true }} 
);
productSchema.post('init' ,(doc)=>{
  doc.imgCover = process.env.BASE_URL +'/product/'+doc.imgCover;
  doc.imgs = doc.imgs.map(path=>process.env.BASE_URL +'/product/'+path)
})

productSchema.virtual('Reviews', {
  ref: 'review',
  localField: '_id',
  foreignField: 'product'
});

productSchema.pre(/^find/ ,function(){
  this.populate('Reviews')
})

export const productModel = mongoose.model("product", productSchema);
