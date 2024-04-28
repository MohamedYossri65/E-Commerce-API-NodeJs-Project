
process.on('uncaughtException' ,(err)=>{
    console.log("error",err);
})

import express from 'express';
import 'dotenv/config';
import connectMongoDb from './database/dbConnection.js';
import { init } from './src/server.routes.js';
import cors from 'cors'
const app = express(); 


/*middelware*/
app.use(cors());
app.use(express.json()); 
app.use(express.static('uploads'))


init(app);

/*database connection*/
connectMongoDb();
/*listen to server */
const port = process.env.PORT || 3000 ;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


process.on('unhandledRejection' ,(err)=>{
    console.log(err);
})