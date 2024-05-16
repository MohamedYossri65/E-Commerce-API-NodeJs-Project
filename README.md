<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/6295/6295417.png" width="100" />
</p>
<p align="center">
    <h1 align="center">E-COMMERCE-API-NODEJS-PROJECT</h1>
</p>

<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat&logo=Nodemon&logoColor=white" alt="Nodemon">
	<img src="https://img.shields.io/badge/Stripe-008CDD.svg?style=flat&logo=Stripe&logoColor=white" alt="Stripe">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
	<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
</p>
<hr>

##  Quick Links

> - [ Overview](#-overview)
> - [ Features](#-features)
> - [ Repository Structure](#-repository-structure)
> - [ Modules](#-modules)
> - [ Getting Started](#-getting-started)
>   - [ Installation](#-installation)
>   - [ Running E-Commerce-API-NodeJs-Project](#-running-E-Commerce-API-NodeJs-Project)
>   - [ Tests](#-tests)
> - [ Project Roadmap](#-project-roadmap)
> - [ Contributing](#-contributing)
> - [ License](#-license)
> - [ Acknowledgments](#-acknowledgments)

---

##  Overview

This full E-Commerce API build using Express and MongoDb, and other Npm Packages listed below , for learning purposes. Here it contains all the required functionalities of a full-fledged E-commerce API like User registration, User Login, Reviews Add, Edit & Delete, Product Add, Edit, Delete, Add product feature image & Add product images, Order creation and etc...,

---

##  Features

<h1>Middleware Features:</h1>
    <ol>
        <li>
            <h2>Error Handling:</h2>
            <p>Implement error handling middleware that catches errors from any function in the code. This middleware should format the error response consistently and handle different types of errors gracefully.</p>
        </li>
        <li>
            <h2>Rate Limiting:</h2>
            <p>Introduce rate-limiting middleware to prevent abuse or excessive usage of the API endpoints. Set limits on the number of requests allowed within a certain time frame to ensure server stability and security.</p>
        </li>
        <li>
            <h2>Validation:</h2>
            <p>Develop middleware for request validation, ensuring that incoming data meets specific criteria before proceeding with the request. This can include validating input fields, request parameters, and request body against predefined schemas or rules.</p>
        </li>
        <li>
            <h2>Global Error Handling:</h2>
            <p>Implement global error handling middleware to catch unhandled errors and provide a standardized response format for all errors. This middleware should ensure that errors are properly logged and that sensitive information is not leaked in error responses.</p>
        </li>
    </ol>

<h1>Authentication Features:</h1>
    <ol>
        <li>
            <h2>Signup with Email Verification:</h2>
            <p>Allow users to sign up by providing necessary details, such as email and password. Upon signup, send a verification email containing an OTP code to the user's email address for email verification.</p>
        </li>
        <li>
            <h2>Resend OTP Verification Code:</h2>
            <p>Provide an endpoint to resend the OTP verification code to users if the code has expired or if they haven't received it.</p>
        </li>
        <li>
            <h2>Sign In:</h2>
            <p>Implement an endpoint for users to sign in using their email and password credentials. Ensure that users can only sign in after verifying their email address.</p>
        </li>
        <li>
            <h2>Forget and Reset Password:</h2>
            <p>Enable users to initiate a forgot password process by providing their email address. Send an OTP code to the user's email for password reset verification. Allow users to reset their password by providing a new password along with the OTP code.</p>
        </li>
        <li>
            <h2>Protected Routes:</h2>
            <p>Create middleware to protect certain routes, ensuring that only authenticated users with valid JWT tokens can access them. Also, implement role-based access control to restrict access based on user roles (admin and user).</p>
        </li>
    </ol>

<h1>Project Features:</h1>
    <ol>
        <li>
            <h2>CRUD Operations:</h2>
            <p>Implement CRUD functionality for managing categories, subcategories, brands, products, reviews, wishlists, and users. Each entity should have endpoints for creation, retrieval, updating, and deletion.</p>
        </li>
        <li>
            <h2>Coupon Management:</h2>
            <p>Develop features to apply coupons to orders, including creating, updating, and deleting coupons. Implement logic to calculate discounts based on coupon codes and apply them to orders.</p>
        </li>
        <li>
            <h2>Order and Cart Operations:</h2>
            <p>Implement endpoints for managing user carts, such as adding items, removing items, and updating quantities. Develop features for handling orders, including placing orders, viewing order history, and tracking orders.</p>
        </li>
    </ol>

---
 <h1>Technologies Used:</h1>
    <ul>
        <li>Node.js</li>
        <li>Express</li>
        <li>MongoDB</li>
        <li>Mongoose</li>
        <li>dotenv</li>
        <li>cookie-parser</li>
        <li>jsonwebtoken</li>
        <li>validator</li>
        <li>express-rate-limit</li>
        <li>helmet</li>
        <li>bcryptjs</li>
        <li>morgan</li>
        <li>cors</li>
        <li>express-file-upload</li>
        <li>Postman</li>
    </ul>

 <h1>Postman Link:</h1>
    <p><a href="https://documenter.getpostman.com/view/32926244/2sA3BuXUdD">Postman Collection Link</a></p>

##  Repository Structure

```sh
└── E-Commerce-API-NodeJs-Project/
    ├── README.md
    ├── database
    │   ├── dbConnection.js
    │   └── models
    │       ├── brands.model.js
    │       ├── cart.model.js
    │       ├── category.model.js
    │       ├── coupon.model.js
    │       ├── order.model.js
    │       ├── otpUser.model.js
    │       ├── proudcts.model.js
    │       ├── reviews.model.js
    │       ├── subCategory.model.js
    │       └── user.model.js
    ├── package-lock.json
    ├── package.json
    ├── server.js
    ├── src
    │   ├── address
    │   │   ├── address.router.js
    │   │   ├── addresse.controller.js
    │   │   └── validation.address.js
    │   ├── auth
    │   │   ├── auth.controller.js
    │   │   ├── auth.router.js
    │   │   ├── user.email.js
    │   │   └── validation.auth.js
    │   ├── brands
    │   │   ├── brands.controller.js
    │   │   ├── brands.router.js
    │   │   └── validation.brands.js
    │   ├── cart
    │   │   ├── cart.controller.js
    │   │   ├── cart.router.js
    │   │   └── validation.cart.js
    │   ├── category
    │   │   ├── category.controller.js
    │   │   ├── category.router.js
    │   │   └── validation.category.js
    │   ├── coupon
    │   │   ├── coupon.controller.js
    │   │   ├── coupon.router.js
    │   │   └── validation.coupon.js
    │   ├── handlers
    │   │   └── factor.handler.js
    │   ├── middleware
    │   │   ├── catchAsyncError.js
    │   │   ├── fileUpload.js
    │   │   ├── globalErrorHandlingMiddleware.js
    │   │   └── validation.js
    │   ├── order
    │   │   ├── order.controller.js
    │   │   ├── order.router.js
    │   │   └── validation.order.js
    │   ├── product
    │   │   ├── product.controller.js
    │   │   ├── product.router.js
    │   │   └── validation.product.js
    │   ├── review
    │   │   ├── review.controller.js
    │   │   ├── review.router.js
    │   │   └── validation.review.js
    │   ├── server.routes.js
    │   ├── subCategory
    │   │   ├── subCategory.controller.js
    │   │   ├── subCategory.router.js
    │   │   └── validation.subCategory.js
    │   ├── user
    │   │   ├── user.controller.js
    │   │   ├── user.router.js
    │   │   └── validation.user.js
    │   ├── utils
    │   │   ├── AppError.js
    │   │   └── apiFeaturs.js
    │   └── whishlist
    │       ├── validation.whishlist.js
    │       ├── whishlist.controller.js
    │       └── wishlist.router.js
    └── uploads
        ├── brand
        │   └── images.png
        ├── category
        │   └── images.png
        ├── product
        │   └── 1714059082611-461468471-1920-1080-sample.jpg
        └── user
            └── images.png
```

---

##  Modules

<details closed><summary>.</summary>

| File                                                                                                                    | Summary                                       |
| ---                                                                                                                     | ---                                           |
| [server.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/server.js)                 | HTTP error 401 for prompt `server.js`         |
| [package.json](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/package.json)           | HTTP error 401 for prompt `package.json`      |
| [package-lock.json](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/package-lock.json) | HTTP error 401 for prompt `package-lock.json` |

</details>

<details closed><summary>database</summary>

| File                                                                                                                         | Summary                                              |
| ---                                                                                                                          | ---                                                  |
| [dbConnection.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/database/dbConnection.js) | HTTP error 401 for prompt `database/dbConnection.js` |

</details>

<details closed><summary>database.models</summary>

| File                                                                                                                                          | Summary                                                          |
| ---                                                                                                                                           | ---                                                              |
| [category.model.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/database/models/category.model.js)       | HTTP error 401 for prompt `database/models/category.model.js`    |
| [proudcts.model.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/database/models/proudcts.model.js)       | HTTP error 401 for prompt `database/models/proudcts.model.js`    |
| [otpUser.model.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/database/models/otpUser.model.js)         | HTTP error 401 for prompt `database/models/otpUser.model.js`     |
| [coupon.model.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/database/models/coupon.model.js)           | HTTP error 401 for prompt `database/models/coupon.model.js`      |
| [user.model.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/database/models/user.model.js)               | HTTP error 401 for prompt `database/models/user.model.js`        |
| [cart.model.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/database/models/cart.model.js)               | HTTP error 401 for prompt `database/models/cart.model.js`        |
| [reviews.model.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/database/models/reviews.model.js)         | HTTP error 401 for prompt `database/models/reviews.model.js`     |
| [brands.model.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/database/models/brands.model.js)           | HTTP error 401 for prompt `database/models/brands.model.js`      |
| [subCategory.model.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/database/models/subCategory.model.js) | HTTP error 401 for prompt `database/models/subCategory.model.js` |
| [order.model.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/database/models/order.model.js)             | HTTP error 401 for prompt `database/models/order.model.js`       |

</details>

<details closed><summary>src</summary>

| File                                                                                                                      | Summary                                          |
| ---                                                                                                                       | ---                                              |
| [server.routes.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/server.routes.js) | HTTP error 401 for prompt `src/server.routes.js` |

</details>

<details closed><summary>src.middleware</summary>

| File                                                                                                                                                                 | Summary                                                                     |
| ---                                                                                                                                                                  | ---                                                                         |
| [globalErrorHandlingMiddleware.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/middleware/globalErrorHandlingMiddleware.js) | HTTP error 401 for prompt `src/middleware/globalErrorHandlingMiddleware.js` |
| [fileUpload.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/middleware/fileUpload.js)                                       | HTTP error 401 for prompt `src/middleware/fileUpload.js`                    |
| [catchAsyncError.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/middleware/catchAsyncError.js)                             | HTTP error 401 for prompt `src/middleware/catchAsyncError.js`               |
| [validation.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/middleware/validation.js)                                       | HTTP error 401 for prompt `src/middleware/validation.js`                    |

</details>

<details closed><summary>src.whishlist</summary>

| File                                                                                                                                              | Summary                                                           |
| ---                                                                                                                                               | ---                                                               |
| [whishlist.controller.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/whishlist/whishlist.controller.js) | HTTP error 401 for prompt `src/whishlist/whishlist.controller.js` |
| [wishlist.router.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/whishlist/wishlist.router.js)           | HTTP error 401 for prompt `src/whishlist/wishlist.router.js`      |
| [validation.whishlist.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/whishlist/validation.whishlist.js) | HTTP error 401 for prompt `src/whishlist/validation.whishlist.js` |

</details>

<details closed><summary>src.address</summary>

| File                                                                                                                                          | Summary                                                        |
| ---                                                                                                                                           | ---                                                            |
| [addresse.controller.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/address/addresse.controller.js) | HTTP error 401 for prompt `src/address/addresse.controller.js` |
| [validation.address.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/address/validation.address.js)   | HTTP error 401 for prompt `src/address/validation.address.js`  |
| [address.router.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/address/address.router.js)           | HTTP error 401 for prompt `src/address/address.router.js`      |

</details>

<details closed><summary>src.cart</summary>

| File                                                                                                                               | Summary                                                 |
| ---                                                                                                                                | ---                                                     |
| [validation.cart.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/cart/validation.cart.js) | HTTP error 401 for prompt `src/cart/validation.cart.js` |
| [cart.controller.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/cart/cart.controller.js) | HTTP error 401 for prompt `src/cart/cart.controller.js` |
| [cart.router.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/cart/cart.router.js)         | HTTP error 401 for prompt `src/cart/cart.router.js`     |

</details>

<details closed><summary>src.brands</summary>

| File                                                                                                                                     | Summary                                                     |
| ---                                                                                                                                      | ---                                                         |
| [brands.router.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/brands/brands.router.js)         | HTTP error 401 for prompt `src/brands/brands.router.js`     |
| [brands.controller.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/brands/brands.controller.js) | HTTP error 401 for prompt `src/brands/brands.controller.js` |
| [validation.brands.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/brands/validation.brands.js) | HTTP error 401 for prompt `src/brands/validation.brands.js` |

</details>

<details closed><summary>src.category</summary>

| File                                                                                                                                           | Summary                                                         |
| ---                                                                                                                                            | ---                                                             |
| [category.controller.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/category/category.controller.js) | HTTP error 401 for prompt `src/category/category.controller.js` |
| [category.router.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/category/category.router.js)         | HTTP error 401 for prompt `src/category/category.router.js`     |
| [validation.category.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/category/validation.category.js) | HTTP error 401 for prompt `src/category/validation.category.js` |

</details>

<details closed><summary>src.order</summary>

| File                                                                                                                                  | Summary                                                   |
| ---                                                                                                                                   | ---                                                       |
| [order.controller.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/order/order.controller.js) | HTTP error 401 for prompt `src/order/order.controller.js` |
| [validation.order.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/order/validation.order.js) | HTTP error 401 for prompt `src/order/validation.order.js` |
| [order.router.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/order/order.router.js)         | HTTP error 401 for prompt `src/order/order.router.js`     |

</details>

<details closed><summary>src.coupon</summary>

| File                                                                                                                                     | Summary                                                     |
| ---                                                                                                                                      | ---                                                         |
| [coupon.router.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/coupon/coupon.router.js)         | HTTP error 401 for prompt `src/coupon/coupon.router.js`     |
| [validation.coupon.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/coupon/validation.coupon.js) | HTTP error 401 for prompt `src/coupon/validation.coupon.js` |
| [coupon.controller.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/coupon/coupon.controller.js) | HTTP error 401 for prompt `src/coupon/coupon.controller.js` |

</details>

<details closed><summary>src.utils</summary>

| File                                                                                                                      | Summary                                             |
| ---                                                                                                                       | ---                                                 |
| [apiFeaturs.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/utils/apiFeaturs.js) | HTTP error 401 for prompt `src/utils/apiFeaturs.js` |
| [AppError.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/utils/AppError.js)     | HTTP error 401 for prompt `src/utils/AppError.js`   |

</details>

<details closed><summary>src.handlers</summary>

| File                                                                                                                                 | Summary                                                    |
| ---                                                                                                                                  | ---                                                        |
| [factor.handler.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/handlers/factor.handler.js) | HTTP error 401 for prompt `src/handlers/factor.handler.js` |

</details>

<details closed><summary>src.subCategory</summary>

| File                                                                                                                                                    | Summary                                                               |
| ---                                                                                                                                                     | ---                                                                   |
| [subCategory.controller.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/subCategory/subCategory.controller.js) | HTTP error 401 for prompt `src/subCategory/subCategory.controller.js` |
| [validation.subCategory.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/subCategory/validation.subCategory.js) | HTTP error 401 for prompt `src/subCategory/validation.subCategory.js` |
| [subCategory.router.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/subCategory/subCategory.router.js)         | HTTP error 401 for prompt `src/subCategory/subCategory.router.js`     |

</details>

<details closed><summary>src.auth</summary>

| File                                                                                                                               | Summary                                                 |
| ---                                                                                                                                | ---                                                     |
| [validation.auth.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/auth/validation.auth.js) | HTTP error 401 for prompt `src/auth/validation.auth.js` |
| [user.email.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/auth/user.email.js)           | HTTP error 401 for prompt `src/auth/user.email.js`      |
| [auth.controller.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/auth/auth.controller.js) | HTTP error 401 for prompt `src/auth/auth.controller.js` |
| [auth.router.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/auth/auth.router.js)         | HTTP error 401 for prompt `src/auth/auth.router.js`     |

</details>

<details closed><summary>src.product</summary>

| File                                                                                                                                        | Summary                                                       |
| ---                                                                                                                                         | ---                                                           |
| [product.router.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/product/product.router.js)         | HTTP error 401 for prompt `src/product/product.router.js`     |
| [validation.product.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/product/validation.product.js) | HTTP error 401 for prompt `src/product/validation.product.js` |
| [product.controller.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/product/product.controller.js) | HTTP error 401 for prompt `src/product/product.controller.js` |

</details>

<details closed><summary>src.review</summary>

| File                                                                                                                                     | Summary                                                     |
| ---                                                                                                                                      | ---                                                         |
| [review.controller.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/review/review.controller.js) | HTTP error 401 for prompt `src/review/review.controller.js` |
| [validation.review.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/review/validation.review.js) | HTTP error 401 for prompt `src/review/validation.review.js` |
| [review.router.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/review/review.router.js)         | HTTP error 401 for prompt `src/review/review.router.js`     |

</details>

<details closed><summary>src.user</summary>

| File                                                                                                                               | Summary                                                 |
| ---                                                                                                                                | ---                                                     |
| [user.controller.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/user/user.controller.js) | HTTP error 401 for prompt `src/user/user.controller.js` |
| [user.router.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/user/user.router.js)         | HTTP error 401 for prompt `src/user/user.router.js`     |
| [validation.user.js](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/master/src/user/validation.user.js) | HTTP error 401 for prompt `src/user/validation.user.js` |

</details>

---

##  Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

* **JavaScript**

###  Installation

1. Clone the E-Commerce-API-NodeJs-Project repository:

```sh
git clone https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git
```

2. Change to the project directory:

```sh
cd E-Commerce-API-NodeJs-Project
```

3. Install the dependencies:

```sh
npm install
```

###  Running E-Commerce-API-NodeJs-Project

Use the following command to run E-Commerce-API-NodeJs-Project:

```sh
node app.js
```

###  Tests

To execute tests, run:

```sh
npm test
```

---

##  Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git/issues)**: Submit bugs found or log feature requests for E-commerce-api-nodejs-project.

<details closed>
    <summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone https://github.com/MohamedYossri65/E-Commerce-API-NodeJs-Project.git
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

##  License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

##  Acknowledgments

- List any resources, contributors, inspiration, etc. here.

[**Return**](#-quick-links)

---
