
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
  var [username, setUsername] = useState('')
  var [email, setEmail] = useState('')
  var [password, setPassword] = useState('')
  var [confirmpassword, setConfirmpassword] = useState('')

  var navigate = useNavigate()

  var submitHandler = (e) => {
    e.preventDefault()
    var data = {
      username,
      email,
      password,
      confirmpassword
    }
    axios
      .post('https://authenication-backend.vercel.app/signup', data)
      .then((res) => {
        console.log(res)
        navigate('/login')
      })
      .catch(() => { });
  }

  return (
    <div className='container mt-3'>
      <div className='row'>
        <h2 className='text-center'>Signup</h2>
        <div className='col-4 m-auto my-4 bg-secondary px-4 py-3 text-white fs-5 rounded'>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label for="username" className="form-label">User Name</label>
              <input type="text" className="form-control" id="username" aria-describedby="emailHelp" value={username}
                onChange={(e) => setUsername(e.target.value)} />

            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label for="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmpassword" className="form-label">confirmPassword</label>
              <input type="password" className="form-control" id="confirmpassword" value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary w-100 fs-5 fw-media">Register</button>
          </form>
          <p className='pt-3'>Have already account? <Link to={'/login'} className='text-warning fs-5 fw-media px-2'>Login here</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup