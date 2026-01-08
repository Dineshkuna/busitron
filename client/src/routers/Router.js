import React from "react";
import {Routes,Route} from 'react-router-dom';
import Home from "../components/Home";
import SingleBlog from "../components/SingleBlog";
import Register from "../components/Register";
import Login from "../components/Login";
import CreateBlog from "../components/CreateBlog";
import EditUser from "../components/EditUser";

const Router = () => {
    return (
        <Routes>
            <Route path = '/' element = {<Home />} />
            <Route path = '/singleblog/:id' element = {<SingleBlog />} />
            <Route path='/register' element = {<Register/>} />
            <Route path='/login' element = {<Login/>} />
            <Route path='/createblog' element = {<CreateBlog/>} />
            <Route path='/user/:id' element = {<EditUser/>} />


    
        </Routes>
    )
}

export default Router;

