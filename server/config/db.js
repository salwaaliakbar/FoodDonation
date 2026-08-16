const mongoose = require('mongoose')

async function connectDB(){
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI environment variable is not set');
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
}

module.exports = connectDB