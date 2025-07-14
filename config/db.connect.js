const mongoose = require('mongoose')
require('dotenv').config()

const mongoUri = process.env.MONGODB

const initializeDatabase = async ()=>{
   try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" Connected to MongoDB database.");
  } catch (error) {
    console.error(" Error connecting to MongoDB:", error.message);
    process.exit(1); // stop app if DB is not connected
  }  
}

module.exports = {initializeDatabase}