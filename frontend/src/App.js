import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './Components/Login';
import Home from './Components/Home';
import Signup from './Components/Signup';
import HomePage from './Components/HomePage';
import Nav from './Components/Nav';
import ProtectedRoute from './Components/ProtectedRoute';
import Dashboard from './Components/Dashboard';

function App() {
  let location = useLocation()
  return (
    <div>
      {location.pathname === '/' && <Nav />}
      {/* {location.pathname !== '/dashboard' && <Dashboard />} */}

      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='' element={<ProtectedRoute />}>
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path='/homepage' element = {<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
