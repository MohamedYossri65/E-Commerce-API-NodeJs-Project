
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { AppError } from "../utils/AppError.js";
import { cartModel } from '../../database/models/cart.model.js ';

import { productModel } from "../../database/models/proudcts.model.js";
import { couponModel } from './../../database/models/coupon.model.js';


function calcTotalPrice(cart) {
    let totalPrice = 0;
    totalPrice = cart.item.reduce((acc, prod) => {
        return acc + (prod.price * prod.quantity);
    }, 0);
    cart.totalPrice = totalPrice;
    if (cart.discount) {
        cart.totalPriceAfterDiscount = cart.totalPrice - ((cart.totalPrice * cart.discount) / 100);
    }
}

export const addProductToCart = catchAsyncError(async (req, res, next) => {

    let product = await productModel.findOne({ _id: req.body.product });
    if (!product) return next(new AppError('product not found', 404));
    req.body.price = product.price;

    let isCartExist = await cartModel.findOne({ user: req.user._id });
    if (!isCartExist) {
        let result = new cartModel({
            user: req.user._id,
            item: [req.body]
        });
        calcTotalPrice(result);
        await result.save();
        return res.status(201).json({ message: 'success', result });
    }
    let itemFound = await isCartExist.item.find((elem) => elem.product == req.body.product);
    if (product.quantity > 0) {
        if (itemFound) {
            itemFound.quantity += 1;
        } else {
            await isCartExist.item.push(req.body);
        }
    } else {
        return next(new AppError('item not found or product not in stoke', 404));
    }
    calcTotalPrice(isCartExist);
    await isCartExist.save();
    res.status(201).json({
        status: 'success',
        message: 'product added successfully to cart',
        data: isCartExist
    });
})

export const deleteProductFromCart = catchAsyncError(async (req, res, next) => {
    let result = await cartModel.findOneAndUpdate({ user: req.user._id }, { $pull: { item: { _id: req.params.id } } }, { new: true });

    if (!result) return next(new AppError(`item not found in cart`, 404));
    calcTotalPrice(result)
    res.status(200).json({
        status: 'success',
        message: 'product deleted successfully from cart',
        data: result
    });
});

export const updateQuantity = catchAsyncError(async (req, res, next) => {
    let product = await productModel.findOne({ _id: req.body.product });
    if (!product) return next(new AppError('product not found', 404));

    let isCartExist = await cartModel.findOne({ user: req.user._id });

    let itemFound = await isCartExist.item.find((elem) => elem.product == req.body.product);

    if (itemFound && product.quantity >= req.body.quantity) {
        itemFound.quantity = req.body.quantity;
    } else {
        return next(new AppError('item not found or product not in stoke', 404));
    }
    calcTotalPrice(isCartExist);

    await isCartExist.save();
    res.status(201).json({
        status: 'success',
        message: 'Product quantity updated successfully',
        data: isCartExist
    });
});

export const applyCoupon = catchAsyncError(async (req, res, next) => {
    let coupon = await couponModel.findOne({ code: req.body.code, expires: { $gt: Date.now() } });
    let cart = await cartModel.findOne({ user: req.user._id });
    cart.discount = coupon.discount;
    cart.totalPriceAfterDiscount = cart.totalPrice - ((cart.totalPrice * coupon.discount) / 100);

    await cart.save();
    res.status(200).json({
        status: 'success',
        message: 'coupon applied successfully',
        data: cart
    });
});

export const getLoggedUserCart = catchAsyncError(async (req, res, next) => {
    let cartItems = await cartModel.findOne({ user: req.user._id }).populate('item.product');

    res.status(200).json({
        status: 'success',
        message: 'cart founded successfully',
        data: cartItems
    });
});
