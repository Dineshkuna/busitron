import React, { useContext, useState } from 'react'
import { BASEURL, token } from '../utils/util.config'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const EditUser = () => {
    const [formdata, setFormData] = useState({
        name : undefined,
        email : undefined
    })
    const {id} = useParams();
    const { dispatch} = useContext(AuthContext);
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData((prv) => ({...prv, [e.target.id]: e.target.value}))
        
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const res = await fetch(`${BASEURL}/user/update/${id}`,{
                method : 'PUT',
                headers : {"Content-type":"application/json",
                                    Authorization : `Bearer ${token}`
                                },
                                body: JSON.stringify(formdata)

            })

            const result = await res.json();
            console.log(result);
            dispatch({
      type: "LOGOUT"
    })
    navigate('/')
      

        }catch(error){
            console.log(error)
        }
    }
     
  return (
    <>
    <div className="container border ">
    <form action="" className='mt-2' onSubmit={handleSubmit}>
        <input type="text" id='name' placeholder='Enter your name' className='form-control' onChange={handleChange}/>
        <input type="email" id='email' placeholder='Enter your email' className='form-control mt-2' onChange={handleChange}/>
        <button className='btn btn-success mt-2 mb-2' type='submit'>Update user</button>
    </form>
    </div>
    </>
  )
}

export default EditUser
