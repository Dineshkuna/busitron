import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import blogroute from './routes/blog.routes.js';
import userroute from './routes/user.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());



app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));

app.use('/blog', blogroute);
app.use('/user', userroute); 

console.log("Mongo URI:", process.env.MONGO_URI); // DEBUG
 
const connectDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB connection error:", error.message);
    // process.exit(1); // keep this commented during debugging
  }
};

connectDataBase();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
