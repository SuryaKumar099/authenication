
import React from 'react'
import IsLoggedIn from './IsLoggedIn'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {
  return (
    IsLoggedIn() ? <Outlet /> : <Navigate to = '/login'/>
  )
}

export default ProtectedRoute