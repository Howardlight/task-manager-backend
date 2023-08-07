require('dotenv').config({ path: './config.env' });

const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

import express from "express";
import { connectDB } from "./config/db";



const app = express();
const PORT = process.env.PORT || 5000;
// const errorHandler = require('./middleware/error')

//connect to db
connectDB()
app.use(cors()); // Enable CORS for all requests
app.use(morgan("combined")); //  log HTTP Requests
app.use(express.json()); // Parse JSON
app.use(helmet()) // enhance API security

app.use("/api/task", require("./routes/task"));

//ErrorHandler (Should be last piece of middleware)
// app.use(errorHandler);

const server = app.listen(
    PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    }
)
process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged Error: ${error}`);
    server.close(() => process.exit(1))

})