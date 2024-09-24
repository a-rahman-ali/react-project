import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import AdminHome from './components/AdminHome.jsx';
import ManageRooms from './components/ManageRooms.jsx';
import ManageUsers from './components/ManageUsers.jsx';
import ManageBookings from './components/ManageBookings.jsx';
import History from './components/History.jsx';
import AdminLogin from './components/AdminLogin.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App />}>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/admin-login' element={<AdminLogin />} />
      <Route path='home' element={<Home />} />
      <Route path='admin-home' element={<AdminHome />} />
      <Route path='manage-rooms' element={<ManageRooms />} />
      <Route path='manage-users' element={<ManageUsers />} />
      <Route path='manage-bookings' element={<ManageBookings />} />
      <Route path='history' element={<History />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
