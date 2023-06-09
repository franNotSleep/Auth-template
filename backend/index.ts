import express, { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";

import userRoute from "./routes/users.js";
import errorHandler, { invalidPathHandler } from "./middleware/errorHandler.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

import cors from "cors";
import ExpressMongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

if (process.env.NODE_ENV == "development") {
    app.use((req: Request, _res: Response, next: NextFunction) => {
        console.log(`${req.method} ${req.protocol}://${req.hostname}:${port}${req.url}`);
        next();
    });
}

// Connect DB
connectDB();

app.use(express.json());
app.use(cookieParser());

// Sanitize data
app.use(ExpressMongoSanitize());

// Set security header
app.use(helmet());

// Enable cors
app.use(cors())

// Routes
app.use("/api/users/", userRoute);

// Error Middleware
app.use(errorHandler);
app.use(invalidPathHandler);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
