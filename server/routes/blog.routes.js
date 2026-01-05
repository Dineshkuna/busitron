import express from 'express';
import { createBlog, deleteBlog, editBlog, getBlog, getBlogById } from '../controllers/blog.controller.js';
import { userauth } from '../auth/tokenverifying.auth.js';


const route = express.Router();

route.post("/createblog",userauth, createBlog)
route.put("/editblog/:id",userauth, editBlog);
route.delete("/deleteblog/:id",userauth, deleteBlog);
route.get("/getblog", getBlog);
route.get("/getblogbyid/:id", getBlogById);


export default route;   