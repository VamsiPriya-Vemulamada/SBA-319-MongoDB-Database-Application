import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import learningRouter from "./routes/learnings.js"
import dotenv from 'dotenv'; // this is from .env file but program will get confuse with . so we gave dot here

dotenv.config()
// The command dotenv.config() is used to load environment variables from a .env file into the process.env object in your Node.js application

const app = express();
const PORT = process.env.PORT
console.log(PORT)

// =========== connect to DB ===========

try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to mongodb`);
} catch (error) {
    console.error(error);  
}

// middleware
app.use(morgan ("dev")); // used for monitoring the data
app.use(express.json()); // Express.js application is essential for handling incoming JSON requests efficiently. is a middleware function in an Express.js application that parses incoming requests with JSON payloads.
app.use(express.urlencoded({extended: true})); 
//This middleware is used to parse incoming requests with URL-encoded payloads (typically sent from HTML forms). It converts the URL-encoded data into a JavaScript object that can be easily accessed in your route handlers 
app.use('/api/learnings',learningRouter )
app.get('/', (req, res) => res.send('ok'));

app.listen(PORT, ( )=> console.log(`Server running on port: ${PORT}`))
