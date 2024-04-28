
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { AppError } from "../utils/AppError.js";
import { cartModel } from '../../database/models/cart.model.js ';
import { productModel } from "../../database/models/proudcts.model.js";
import { orderModel } from "../../database/models/order.model.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51PAXkGAeuGRCbufKY3J7sBQgqspGDQZwdqxCEvFQiHIfbhh5id3EC4IKKddoZqBoddGMO31df1kikm3bHt50PKC000EfAOlfbI');


export const createOrder = catchAsyncError(async (req, res, next) => {
    let cart = await cartModel.findOne({ user: req.user._id });

    if (cart.item[0]) {
        let order = new orderModel({
            user: req.user._id,
            item: cart.item,
            shipingAddress: req.body.shipingAddress,
            totalPrice: cart.totalPrice
        })
        if (cart.totalPriceAfterDiscount) {
            order.totalPrice = cart.totalPriceAfterDiscount
        }
        await order.save();
        if (order) {
            let option = cart.item.filter(item => item.quantity > 0).map((item) => ({
                updateOne: {
                    filter: { _id: item.product },
                    update: { $inc: { quantity: -item.quantity, sold: item.quantity } }
                }
            }))
            await productModel.bulkWrite(option);
        }
        await cartModel.findOneAndUpdate({ user: req.user._id }, { $set: { 'item': [] } }, { new: true });
        return res.status(200).json({ message: 'success', order: order });
    }
    next(new AppError('cart is empty!!!', 404));
})

export const getUserOrder = catchAsyncError(async (req, res, next) => {
    let userOrder = await orderModel.find({ user: req.user._id }).populate('item.product');
    if (!userOrder) return next(new AppError('this user dose not create any order before', 404));
    res.status(200).json({ message: 'success', userOrder });
})

export const getAllOrders = catchAsyncError(async (req, res, next) => {
    let orders = await orderModel.find({}).populate('item.product');
    if (!orders) return next(new AppError('orders not found!!', 404));
    res.status(200).json({ message: 'success', orders });
})


export const createCheckoutSisson = catchAsyncError(async (req, res, next) => {
    let cart = await cartModel.findById( req.params.id );
    let totalPrice = cart.totalPrice
    if (cart.totalPriceAfterDiscount) {
        totalPrice = cart.totalPriceAfterDiscount
    }
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    product_data: {
                        name: req.user.name,
                    },
                    currency: "egp",
                    unit_amount: totalPrice * 100,
                },
                quantity: 1,
            }
        ],
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
        customer_email: req.user.email,
        client_reference_id: req.params.id,
        metadata: req.body.shipingAddress
    });
    res.json({ message: 'success', session });
})
