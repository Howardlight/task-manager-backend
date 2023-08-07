import mongoose from 'mongoose';
export const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) throw "MONGO_URI has not been set! please check your config file!";

        await mongoose.connect(process.env.MONGO_URI!);
        console.log(`MongoDb Connected`);

    } catch (error) {
        console.error(`MongoDb Connection failed! Error:\n`, error);
        process.exit(1);
    };
}