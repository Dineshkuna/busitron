import React, { useState } from 'react'
import { BASEURL, token } from '../utils/util.config'
import { useNavigate } from 'react-router-dom'

const CreateBlog = () => {
    const [blog, setBlog] = useState({

        title: undefined,
        topic: undefined,
        content: undefined

    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setBlog((prevs) =>({...prevs, [e.target.id] : e.target.value }))

    }

   

    const handleSubmit = async(e) => {
        e.preventDefault();
         console.log(blog);
        
        try {
            const res = await fetch (`${BASEURL}/blog/createblog`,{
                method : "POST",
                headers : {"Content-type":"application/json",
                    Authorization : `Bearer ${token}`
                },
                body: JSON.stringify(blog)

            })
            const result = await res.json();
            navigate('/')
            

        }catch(error){
            console.log(error)

        }



    }
    
  return (
    <>
    <div className="container mt-2 mb-3 border ">
        <form action="" className="form mt-2 mb-3" onSubmit={handleSubmit}>

            <input type="text" className="form-control " id='title' placeholder='Enter Blog Title' onChange={handleChange} />
            <input type="text" className="form-control mt-2" id='topic' placeholder='Enter topi name' onChange={handleChange} />
            <textarea  id="content" className="form-control mt-2" rows='8' placeholder='Enter Blog Content' onChange={handleChange}></textarea>
            <button className='btn btn-dark mt-2' type='submit'>Create Blog</button>
        </form>
    </div>
    
    
    </>
  )
}

export default CreateBlog
