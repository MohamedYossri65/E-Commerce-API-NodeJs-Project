
process.on('uncaughtException', (err) => {
    console.log("error", err);
})

import express from 'express';
import 'dotenv/config';
import connectMongoDb from './database/dbConnection.js';
import { init } from './src/server.routes.js';
import cors from 'cors'
import { creaateOnlinPay } from './src/order/order.controller.js';
import { limiter } from './src/middleware/rateLimit.js';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import compression from 'compression';
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json());
/*middelware*/
app.use(compression());
app.use(helmet());

// use it before all route definitions
app.use(cors());
// Data sanitization against NoSQL query injection
app.use(ExpressMongoSanitize());
// Data sanitization against XSS
app.use(xss());

app.use(express.static('uploads'));

// Apply the rate limiting middleware to all requests.
app.use(limiter)
app.use(express.urlencoded({ extended: true }));
// Cookie parser, reading cookies into req.cookies
app.use(cookieParser());



app.post('/webhook', express.raw({ type: 'application/json' }), creaateOnlinPay);





init(app);

/*database connection*/
connectMongoDb();
/*listen to server */
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


process.on('unhandledRejection', (err) => {
    console.log(err);
})
