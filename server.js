
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


const app = express();

/*middelware*/


app.use(cors());
app.use(express.static('uploads'));

// Apply the rate limiting middleware to all requests.
app.use(limiter)
app.use(express.urlencoded({ extended: true }));



app.post('/webhook', express.raw({ type: 'application/json' }), creaateOnlinPay);


app.use(express.json());


init(app);

/*database connection*/
connectMongoDb();
/*listen to server */
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


process.on('unhandledRejection', (err) => {
    console.log(err);
})
