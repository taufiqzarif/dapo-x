import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import passport from 'passport';
import userRoutes from './routes/userRoutes.js';
import promoCodeRoutes from './routes/promoCodeRoutes.js';
import menuItemRoutes from './routes/menuItemRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
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
app.use('/api/menus', menuItemRoutes);
app.use('/api/promocodes', promoCodeRoutes);
app.use('/api/orders', orderRoutes);

// const __dirname = path.resolve(); // Set __dirname to the current working directory

// if (process.env.NODE_ENV === 'staging') {
//   app.use(express.static('frontend/build'));

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//   );
// }

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
