import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);


import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB Connected")
    } catch (error) {
        console.log("MongoDB Error", error)
    }
}