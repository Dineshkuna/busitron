import React from "react";
import {Routes,Route} from 'react-router-dom';
import Home from "../components/Home";
import SingleBlog from "../components/SingleBlog";
import Register from "../components/Register";

const Router = () => {
    return (
        <Routes>
            <Route path = '/' element = {<Home />} />
            <Route path = '/singleblog/:id' element = {<SingleBlog />} />
            <Route path='/register' element = {<Register/>} />

    
        </Routes>
    )
}

export default Router;

