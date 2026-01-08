import React, { useContext } from 'react'
import { Link } from 'react-router'
import { AuthContext } from '../context/AuthContext'


const Navigation = () => {
  const {user, dispatch} = useContext(AuthContext);
  console.log(user);

  const logout = () => {
    dispatch({
      type: "LOGOUT"
    })
    window.location.reload();
  }
  
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <Link class="navbar-brand" to="/">Navbar</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to='/'>Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/createblog">Create Blog</Link>
        </li>
       
        
      </ul>
      <form class="d-flex" role='search'>

        {
          user ? (<>
          <Link class="btn btn-outline-info" type="submit" to={`/user/${user._id}`} >{user.name}</Link>
          <button class="btn btn-outline-danger ms-2" type="submit" onClick={logout} >Logout</button>

          
          </>) : (<>

          <Link class="btn btn-outline-success" type="submit" to='/register'>Register</Link>
        <Link class="btn btn-outline-dark ms-2" type="submit" to='/login'>Login</Link>
          
          
          </>)
        }
        
        
      </form>
    </div>
  </div>
</nav>
        
      
    </div>
  )
}

export default Navigation
