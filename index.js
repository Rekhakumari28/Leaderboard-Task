//import express
const express = require("express")
const app = express()

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const {initializeDatabase} = require('./config/db.connect')
const userRoutes = require('./routes/userRoute.js');

app.use(express.json())

initializeDatabase();

app.get("/", (req,res)=>{
    res.send("Welcome to leaderboard backend.")
})

app.use('/api', userRoutes);

//port
const PORT = 3000 || process.env.PORT
app.listen(PORT,()=>{
    console.log('Server is running on port:', PORT)
})

module.exports = app;