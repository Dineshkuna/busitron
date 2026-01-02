import express from 'express';
import { createBlog, deleteBlog, editBlog, getBlog, getBlogById } from '../controllers/blog.controller.js';


const route = express.Router();

route.post("/createblog", createBlog)
route.put("/editblog/:id", editBlog);
route.delete("/deleteblog/:id", deleteBlog);
route.get("/getblog", getBlog);
route.get("/getblogbyid/:id", getBlogById);


export default route;