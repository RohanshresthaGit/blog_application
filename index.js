import express from 'express';
import dotenv from 'dotenv';
import ejs from 'ejs';
import path from 'path';
import userRouter from './routes/user.routes.js';
import blogRouter from './routes/blog.routes.js';
import connectDB from './database/db.js';
import cookieParser from 'cookie-parser';
import checkToken from './middlewares/auth.middleware.js'
import Blog from './models/blog.model.js';
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
app.use(express.static(path.resolve('./public')))
app.use(checkToken);

app.use('/user', userRouter);
app.use('/blog', blogRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is healthy', status: 'OK'});
});

app.get('/',async (req, res) => {
  const blogs = await Blog.find({})
  res.render('home',{
    user: req.user,
    blogs: blogs
  });
});


  
app.listen(process.env.PORT, () => {
  console.log(`Server is running on localhost:${process.env.PORT}`);
});