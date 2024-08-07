
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { AppError } from "../utils/AppError.js";
import { cartModel } from '../../database/models/cart.model.js ';
import { productModel } from "../../database/models/proudcts.model.js";
import { orderModel } from "../../database/models/order.model.js";
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe('sk_test_51PAcenP2dEycsQdV8UkzRpy6MJvGmD3fV2ZTTYwsbwdaqFlHDgW2UaiJYmvjFv4gLEjuyRK0eeG0V7Xi8JJSUzPj00txJBojUE');

// Controller to create an order
export const createOrder = catchAsyncError(async (req, res, next) => {
    // Find the user's cart
    let cart = await cartModel.findOne({ user: req.user._id });

    // Check if the cart has items
    if (!cart.item) {
        // If cart is empty, pass an error to the next middleware
        return next(new AppError('cart is empty!!!', 404));
    }
    // Create a new order with cart items and shipping address
    let order = new orderModel({
        user: req.user._id,
        item: cart.item,
        shipingAddress: req.body,
        totalPrice: cart.totalPrice
    });

    // Adjust total price if there's a discount
    if (cart.totalPriceAfterDiscount) {
        order.totalPrice = cart.totalPriceAfterDiscount;
    }

    // Save the order to the database
    await order.save();

    // Update product quantities and sold counts in bulk
    if (order) {
        let option = cart.item.filter(item => item.quantity > 0).map((item) => ({
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { quantity: -item.quantity, sold: item.quantity } }
            }
        }));
        await productModel.bulkWrite(option);
    }

    // Clear the cart items
    await cartModel.findOneAndUpdate({ user: req.user._id }, { $set: { 'item': [] } ,totalPrice : 0 }, { new: true });

    // Respond with success message and the created order
    return res.status(200).json({ message: 'success', order: order });

});

// Controller to get all orders of the logged-in user
export const getUserOrder = catchAsyncError(async (req, res, next) => {
    // Find orders by user ID and populate product details
    let userOrder = await orderModel.find({ user: req.user._id }).populate('item.product');

    // If no orders found, pass an error to the next middleware
    if (!userOrder) return next(new AppError('this user does not create any order before', 404));

    // Respond with success message and the user's orders
    res.status(200).json({ message: 'success', userOrder });
});

// Controller to get all orders
export const getAllOrders = catchAsyncError(async (req, res, next) => {
    // Find all orders and populate product details
    let orders = await orderModel.find({}).populate('item.product');

    // If no orders found, pass an error to the next middleware
    if (!orders) return next(new AppError('orders not found!!', 404));

    // Respond with success message and the orders
    res.status(200).json({ message: 'success', orders });
});

// Controller to create a Stripe checkout session
export const createCheckoutSisson = catchAsyncError(async (req, res, next) => {
    // Find the cart by ID
    let cart = await cartModel.findById(req.params.id);

    // Determine the total price, considering any discount
    let totalPrice = cart.totalPrice;
    if (cart.totalPriceAfterDiscount) {
        totalPrice = cart.totalPriceAfterDiscount;
    }

    // Create a Stripe checkout session
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

    // Respond with success message and the session
    res.json({ message: 'success', session });
});

// Controller to handle Stripe webhook for online payment
export const creaateOnlinPay = catchAsyncError(async (request, response) => {
    const endpointSecret = "whsec_xMCv1VU0YngQbVACcG6oeCQ4axhrvpnJ";
    const sig = request.headers['stripe-signature'].toString();

    let event;

    try {
        // Construct the Stripe event from the webhook payload and signature
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the checkout session completion event
    if (event.type === "checkout.session.completed") {
        let e = event.data.object;
        let cart = await cartModel.findById(e.client_reference_id);
        let user = await userModel.findOne({ email: e.customer_email });

        // Check if the cart has items
        if (cart.item[0]) {
            // Create a new order with the event data
            let order = new orderModel({
                user: user,
                item: cart.item,
                shipingAddress: e.metadata.shipingAddress,
                totalPrice: e.amount_total / 100,
                paymentMethode: 'card',
                isPaid: true,
                paidAt: Date.now()
            });

            // Adjust total price if there's a discount
            if (cart.totalPriceAfterDiscount) {
                order.totalPrice = cart.totalPriceAfterDiscount;
            }

            // Save the order to the database
            await order.save();

            // Update product quantities and sold counts in bulk
            if (order) {
                let option = cart.item.filter(item => item.quantity > 0).map((item) => ({
                    updateOne: {
                        filter: { _id: item.product },
                        update: { $inc: { quantity: -item.quantity, sold: item.quantity } }
                    }
                }));
                await productModel.bulkWrite(option);
            }

            // Clear the cart items
            await cartModel.findOneAndUpdate({ user: user._id }, { $set: { 'item': [] } }, { new: true });

            // Respond with success message and the created order
            return response.status(200).json({ message: 'success', order: order });
        }

        // If cart is empty, pass an error to the next middleware
        next(new AppError('cart is empty!!!', 404));
    } else {
        console.log(`Unhandled event type ${event.type}`);
    }
});
