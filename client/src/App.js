import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
