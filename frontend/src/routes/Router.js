import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/home/Home'
import Auth from '../pages/auth/Auth'
import Product from '../pages/product/Product'
import Add from '../pages/addProduct/Add'
import Edit from '../pages/edit/Edit'

const router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<div>404</div>} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/product" element={<Product />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/" element={<Home />}> 
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default router
