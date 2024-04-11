import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <div>
      < div style={{ background: 'grey', height: "35px", }}>
      <Link to='/signup' style={{ margin: '20px', textDecoration: 'none', fontSize: '20px' }}>SignUp</Link>
      <Link to='/login' style={{ margin: '20px', textDecoration: 'none', fontSize: '20px' }}>Login</Link>
      </div >
    </div>
  )
}

export default Nav