import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
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

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});