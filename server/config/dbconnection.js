import mongoose from "mongoose";

const dbConnect = async() => {
    try{
        //  const conn = await mongoose.connect(process.env.MONGO_URL);
         const conn = await mongoose.connect('mongodb://127.0.0.1:27017/reminderAppDB')
         console.log(`Database Connected To Host ${conn.connection.host}`);
    }
    catch(error){
        console.log(`Error: ${error}`);
    }
};

export default dbConnect;