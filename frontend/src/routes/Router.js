import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Auth, Product, Add, Edit, Sales, Offers } from '../pages'
import { Navbar } from '../components/molecules/global'
import ScrollToTop from '../components/atoms/global/ScrollToTop'

const router = () => {
  const displayNavbar = ['/', '/product', '/add', '/edit', '/sales', '/offers'].includes(
    window.location.pathname
  )

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        {displayNavbar && <Navbar />}
        <Routes>
          <Route path="*" element={<div>404</div>} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/" element={<Home />}></Route>
          <Route path="/product/:id" element={<Product />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/offers" element={<Offers />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default router
