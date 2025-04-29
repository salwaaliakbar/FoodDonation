const mongoose = require('mongoose')
require('dotenv').config();

async function connectDB(){
    try{
        console.log(process.env.MONGO_URI || 'mongodb://localhost:27017/FoodDonation'); 
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/FoodDonation');
        console.log("MongoDB Connect Successfully")
    } catch(err){
        console.error(err.message);
    } 
}

module.exports = connectDB