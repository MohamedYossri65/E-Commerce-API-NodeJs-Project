//the methode to run this script : node ./src/dev-data/import-dev-data.js --delete or --import


import mongoose from "mongoose";
import 'dotenv/config'


import fs from 'fs';

import { categoryModel } from "../../database/models/category.model.js";

// Retrieve the database URL from environment variables
let dbURl =

    mongoose.connect(process.env.URL2)
        .then(() => {
            // Log success message if connection is successful
            console.log("MongoDB Connection Succeeded🔥");
        })
        .catch(err => {
            // Log error message if connection fails
            console.error("Connection error 😥", err);
            // Exit the process with failure code
            process.exit();
        });

const categories = JSON.parse(fs.readFileSync(`./src/dev-data/category.json`, 'utf-8'));
// const plans = JSON.parse(fs.readFileSync(`./src/dev-data/plan.json`, 'utf-8'));
// const resturants = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// const categories = JSON.parse(
//     fs.readFileSync(`./src/dev-data/category.json`, 'utf-8'));


// IMPORT DATA INTO DB
const importData = async () => {
    try {
        await categoryModel.create(categories);
        console.log('Data successfully loaded!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await bookingModel.deleteMany();
        await tripModel.deleteMany();
        console.log('Data successfully deleted!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

if (process.argv[2] === '--import') {
    importData();
}

if (process.argv[2] === '--delete') {
    deleteData();
}