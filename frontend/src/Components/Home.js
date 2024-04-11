import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, Link} from 'react-router-dom'

function Home() {
  var [data, setData] = useState('')
  let token =  window.localStorage.getItem('jwt-token')
  // console.log(token)

  let navigate = useNavigate()

  useEffect(() => {
    axios.get('https://authenication-backend.vercel.app/home', {
      headers: {
        myToken: token
      }
    })
      .then((res) => {
        setData(res.data)
       console.log(res.data)
      })
      .catch((err) => {
      console.log(err)
    })
  },  [token])

  if (!token) {
    return navigate('/login')
  }

  let logout = () => {
    localStorage.removeItem("jwt-token")
    navigate('/homepage')
  }
  return (
    <div className='bg-dark text-white vh-100 pt-5'>
      <h2 className='text-center pt-2 text-white'>Profile</h2>
      <div className='row pt-4'>
        <div className='col-4 m-auto bg-warning p-4 text-dark fs-3 fw-medium rounded'>
          <p>Name :  { data.username}</p>
          <p>Email : { data.email}</p>
          <button onClick={logout} style={{ background: 'blue', border: 'none', borderRadius: '7px' }}>logout</button>
          <Link to = '/dashboard'>
          <button>GotoDashboard</button>
          </Link>
        </div>

      </div>
    </div>
  )
}
export default Home;