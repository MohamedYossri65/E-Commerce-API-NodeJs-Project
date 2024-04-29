
process.on('uncaughtException', (err) => {
    console.log("error", err);
})

import express from 'express';
import 'dotenv/config';
import connectMongoDb from './database/dbConnection.js';
import { init } from './src/server.routes.js';
import cors from 'cors'
import { creaateOnlinPay } from './src/order/order.controller.js';


const app = express();

/*middelware*/

app.use(cors());




app.post('/webhook', express.raw({ type: 'application/json' }), creaateOnlinPay);

app.listen(4242, () => console.log('Running on port 4242'));

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
