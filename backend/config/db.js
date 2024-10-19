import mongoose from 'mongoose'
const connectDB = async ()=>
{
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log(`connect with mongo DB successfullly ${conn.connection.host}`);
        
        
    } catch (error) {
        console.log(`Error in connect with Mongo DB ${error}`);
    }
}
export default connectDB;