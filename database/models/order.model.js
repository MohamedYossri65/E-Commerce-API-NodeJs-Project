
import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
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
                }
            }
        ],
        totalPrice:Number,
        shipingAddress: {
            street: String,
            city: String,
            phone: String
        },
        paymentMethode: {
            type: String,
            enum: ['card', 'cash'],
            default: 'cash'
        },
        isPaid: {
            type: Boolean,
            default: false
        },
        isDelivered: {
            type: Boolean,
            default: false
        },
        paidAt: Date,
        deliveredAt: Date
    }, { timestamps: true }
);

export const orderModel = mongoose.model("order", orderSchema);