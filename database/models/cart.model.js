import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        },
        item: [
            {
                product: { type: mongoose.Types.ObjectId, ref: 'product' },
                quantity: {
                    type: Number,
                    default: 1,
                },
                price: Number
            }
        ],
        totalPrice: {type:Number ,default:0},
        totalPriceAfterDiscount: Number,
        discount: Number
    }, { timestamps: true }
);

export const cartModel = mongoose.model("cart", cartSchema);