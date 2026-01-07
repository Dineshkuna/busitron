import React, { useEffect, useState } from 'react'
import { data, useParams} from 'react-router-dom';
import { BASEURL } from '../utils/util.config';


const SingleBlog = () => {
  const [blog, setBlog] = useState([]);
  const {id} = useParams();
  console.log(id);


  useEffect(() => {
    getBlogData();
  },[]);


   const getBlogData = async () => {
    try {
      const res = await fetch(`${BASEURL}/blog/getblogbyid/${id}`);
      const result = await res.json();

      console.log('API response:', result); // ✅ debug

      if (result.success) {
        setBlog(result.data); // ✅ ONLY set data object
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  };

  // ✅ loading state
  if (!blog) {
    return <p className="text-center mt-5">Loading blog...</p>;
  }

  

  return (

    // console.log(blog)
    <>
        <div className="mt-3 mb-5">
          <img src={`https://www.theblogstarter.com/wp-content/uploads/2014/02/4.jpg`} alt="" className='img-fluid'/>

          <div className="mt-3">
            <h4>{blog.title}</h4>
            <h5>{blog.topic}</h5>
            <p>{blog.content}</p>
          </div>
        </div>

    </>
  )
}

export default SingleBlog
