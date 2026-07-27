import express from 'express';
import dotenv from 'dotenv';
import ejs from 'ejs';
import path from 'path';
import userRouter from './routes/user.routes.js';
import connectDB from './database/db.js';
import cookieParser from 'cookie-parser';
import checkToken from './middlewares/auth.middleware.js'

dotenv.config();

const app = express();

connectDB().then(() => {
    console.log("Database connected successfully");
}).catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
});


app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/user', userRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is healthy', status: 'OK'});
});

app.get('/', checkToken, (req, res) => {
  res.render('home',{
    user: req.user
  });
});



app.listen(process.env.PORT, () => {
  console.log(`Server is running on localhost:${process.env.PORT}`);
});