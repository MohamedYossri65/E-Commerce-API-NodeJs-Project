import  mongoose  from 'mongoose';

export default function connectMongoDb()
{
    mongoose.connect(`mongodb+srv://yossri:yossri@cluster0.trb5jbe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
        console.log('MongoDB Connection Succeeded.')
    }).catch((err) => {
            console.log('Error in DB connection: ' + err)
    });
}