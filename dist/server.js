"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: './config.env' });
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// const errorHandler = require('./middleware/error')
//connect to db
(0, db_1.connectDB)();
app.use(cors()); // Enable CORS for all requests
app.use(morgan("combined")); //  log HTTP Requests
app.use(express_1.default.json()); // Parse JSON
app.use(helmet()); // enhance API security
app.use("/api/task", require("./routes/task"));
//ErrorHandler (Should be last piece of middleware)
// app.use(errorHandler);
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged Error: ${error}`);
    server.close(() => process.exit(1));
});
module.exports = app;
//# sourceMappingURL=server.js.map