
import addressRouter from "./address/address.router.js";
import authRouter from "./auth/auth.router.js";
import brandRouter from "./brands/brands.router.js";
import cartRouter from "./cart/cart.router.js";
import categoryRouter from "./category/category.router.js";
import couponRouter from "./coupon/coupon.router.js";
import { globalErrorHandlingMiddleware } from "./middleware/globalErrorHandlingMiddleware.js";
import orderRouter from "./order/order.router.js";
import productRouter from "./product/product.router.js";
import reviewRouter from "./review/review.router.js";
import subCategoryRouter from "./subCategory/subCategory.router.js";
import userRouter from "./user/user.router.js";
import { AppError } from "./utils/AppError.js";
import whishlistRouter from "./whishlist/wishlist.router.js";

import { authGoogle } from './utils/passport.js'
import passport from "passport";


export const init = (app) => {


    app.use(passport.initialize());

    authGoogle(passport)

    app.use('/api/v1/categories', categoryRouter);
    app.use('/api/v1/subCategories', subCategoryRouter);
    app.use('/api/v1/brands', brandRouter);
    app.use('/api/v1/products', productRouter);
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/reviews', reviewRouter);
    app.use('/api/v1/whishlist', whishlistRouter);
    app.use('/api/v1/addresses', addressRouter);
    app.use('/api/v1/coupons', couponRouter);
    app.use('/api/v1/cart', cartRouter);
    app.use('/api/v1/order', orderRouter);
    /*----------------------------------- */


    /*routs*/

    /*----------------------------------- */

    /*error handling*/
    app.all('/*', (req, res, next) => {
        next(new AppError(`can't find this route: ${req.originalUrl}`, 404));
    })

    app.use(globalErrorHandlingMiddleware);
}
/*----------------------------------- */