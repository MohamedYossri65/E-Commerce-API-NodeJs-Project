import mongoose from 'mongoose';

export default function connectMongoDb() {
    mongoose.connect(process.env.URL2).then(() => {
        console.log('MongoDB Connection Succeeded🔥.')
    }).catch((err) => {
        console.log('Error in DB connection😒: ' + err)
    });
}