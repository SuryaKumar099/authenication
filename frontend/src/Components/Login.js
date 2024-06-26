
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {

  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');

  var [token, setToken] = useState(null)


  var navigate = useNavigate();
  
  var submitHandler =  (e) => {
    e.preventDefault();
    var data = {
      email,
      password,
    };
    axios.post('https://authenication-backend.vercel.app/login', data)
    .then((res) => {
      console.log(res.data.token);
      localStorage.setItem('jwt-token', res.data.token);
      setToken(localStorage.getItem("jwt-token"))
        // navigate('/profile');
    })  
    
  };

  if (token) {
    return navigate('/home')
  }
  return (
    <div className='container mt-3'>
      <div className='row'>
        <h2 className='text-center'>Login</h2>
        <div className='col-4 m-auto my-4 bg-secondary px-4 py-3 text-white fs-5 rounded'>


          <form onSubmit={submitHandler}>
 
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" value={email } onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password"
                value={ password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button type="submit" className="btn btn-primary w-100 fs-5 fw-media">Login</button>
          </form>
          <p className='pt-3'>Don't have account? <Link to={'/signup'} className='text-warning fs-5 fw-media px-2'>Register here</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login