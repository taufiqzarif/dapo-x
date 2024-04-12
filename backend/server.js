import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import passport from "passport";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import './config/passportConfig.js';
dotenv.config();

const port = process.env.PORT || 7000;

connectDB();

const app = express();

// Middleware: JSON body parser
app.use(express.json());

// Middleware: URL Encoded body parser
app.use(express.urlencoded({ extended: true }));

// Middleware: Cookie parser
app.use(cookieParser());

// Middleware: Passport
app.use(passport.initialize());

app.use('/api/users', userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
