import React, { useEffect, useState } from 'react'
import { BASEURL } from '../utils/util.config';
import Loader from './Loader';
import { Link } from 'react-router-dom';

const Home = () => {
    const [blogdata, setBlogData] = useState([]);

    useEffect(() => {
        getBlogData();
    }, []);

    const getBlogData = async () => {
        const res = await fetch (`${BASEURL}/blog/getblog`)
        const {data} = await res.json();
        // console.log(data);

        setBlogData(data);
        
    }


    const truncateBlog = (content, limit) => {
        
        const words = content.split(" ");
        const truncated = words.slice(0, limit).join(" ");
        return truncated + (words.length > limit ? "...!" : "");

    }

  return (
    <>
    {
        blogdata.length > 0 ? ( 
            <div className="container mt-3 mb-5">
                <div className="row row-cols-1 row-cols-lg-3 row-cols-sm-1"> 
                    {
                        blogdata.map((blog) => (
                            <div className='col mb-3'>
                                <div class="card" >
  <img src="https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">{blog.title}</h5>
    <p class="card-text">{blog.topic}</p>
    <p class="card-text">{truncateBlog(blog.content, 50)}</p>
    <Link to={`/singleblog/${blog._id}`} class="btn btn-primary">Read Full</Link>
  </div>
</div>


                            </div>

                        ))
                    }
                    
                </div>
                
            </div>
            
            
        ) : (<Loader />)
    }
    
    </>
  )
}

export default Home
