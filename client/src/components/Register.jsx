import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASEURL } from '../utils/util.config'

const Register = () => {
    const [credentials, setCredentials] = useState({
        name : undefined,
        email : undefined,
        password : undefined
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prv) => ({...prv, [e.target.id]: e.target.value}))
        
    }


    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${BASEURL}/user/createnewuser`,{
                method : 'POST',
                headers: {'content-type':'application/json'},
                body: JSON.stringify(credentials)

            })

            const result = await res.json();
            console.log(result);
            navigate('/login')
            

        }catch(error){
            console.log(error)

        }

    }
  return (
    <>
    <div className="container"></div>
    <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 border mt-3 mb-3">
            <form action="" className="form mt-3 mb-2" onSubmit={handleSubmit} >
                <p className="title text-center">Register User</p>
                <input type="text" className="form-control mt-2 mb-2" placeholder='Enter Your Name' id='name' onChange={handleChange} />
                <input type="email" className="form-control mt-2 mb-2" placeholder='Enter Your Email' id='email' onChange={handleChange} />
                <input type="password" className="form-control mt-2 mb-2" placeholder='Enter Your Password' id='password' onChange={handleChange} />
                <p className='mt-2'>Already have an account? <Link to='/login'>Login</Link></p>
                <button className='btn btn-info ' type='submit'>Register</button>
            </form>
            
        </div>
        <div className="col-md-4"></div>
    </div>
      
    </>
  )
}

export default Register
