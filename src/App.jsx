import React, { useContext } from 'react'
import './App.css'
import{ BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import ProfileCard from './pages/ProfileCard'
import SimpleSlider from './pages/SimpleSlider'
import { authContext } from './Context/AuthContext'
import Cart from './pages/Cart'
import ViewDetails from './pages/ViewDetails'
import FormOrder from './pages/FormOrder'
import { Toaster } from 'react-hot-toast'
import Navbar from './component/Navbar'

const App = () => {

  const { user } = useContext(authContext)

  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={user ? <Navigate to={'/home'} /> : <SignUp/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/login' element={user ? <Navigate to={'/home'} /> : <Login/>} />
          <Route path='/profileCard' element={<ProfileCard/>} />
          <Route path='/slider' element={<SimpleSlider/>} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/details/:id' element={<ViewDetails/>} />
          <Route path='/orderForm' element={<FormOrder/>} />
        </Routes>
        <Toaster/>
      </BrowserRouter>
    </div>
  )
}

export default App