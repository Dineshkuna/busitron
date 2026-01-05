import React from "react";
import {Routes,Route} from 'react-router-dom';
import Home from "../components/Home";
import SingleBlog from "../components/SingleBlog";

const Router = () => {
    return (
        <Routes>
            <Route path = '/' element = {<Home />} />
            <Route path = '/singleblog/:id' element = {<SingleBlog />} />
            

    
        </Routes>
    )
}

export default Router;

