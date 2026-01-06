import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom';
import { BASEURL } from '../utils/util.config';


const SingleBlog = () => {
  const [blog, setBlog] = useState([]);
  const {id} = useParams();
  console.log(id);


  useEffect(() => {
    getBlogData();
  },[]);


  const getBlogData = async () => {
    let res =  await fetch(`${BASEURL}/blog/getblogbyid/${id}`);
    let data = await res.json();

    setBlog(data);
  }
  
  return (

    // console.log(blog)
    <>
        <div className="mt-3 mb-5">
          <img src={`https://www.theblogstarter.com/wp-content/uploads/2014/02/4.jpg`} alt="" className='img-fluid'/>

          <div className="mt-3">
            <h5 className="card-title">{blog.title}</h5>
            <p className="card-text">{blog.topic}</p>
            <p className="card-text">{blog.content}</p>
          </div>
        </div>

    </>
  )
}

export default SingleBlog
