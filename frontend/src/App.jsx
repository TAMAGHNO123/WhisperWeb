import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import {Loader} from "lucide-react"
import Toast from "react-hot-toast"
import { Toaster } from 'react-hot-toast' 

const App = () => {
 
const {authUser, checkAuth, isCheckingAuth} = useAuthStore()
useEffect(() => {
  checkAuth()
}, [checkAuth])

console.log({authUser});
if(isCheckingAuth && !authUser) return (
  <div className="flex justify-center items-center h-screen">
    <Loader className="size-10 animate-spin"/>
  </div>
)
return (
  <div>
    <Navbar /> {/* Move Navbar outside of conditional rendering */}
    <Routes>
      <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
      <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
      <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
      <Route path='/settings' element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
      <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
    </Routes>
    <Toaster />
  </div>
)
}

export default App