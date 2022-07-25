import React from 'react'
import { Loader, Navbar } from '../atoms/global/'

const Layout = ({ children }) => {
  return (
    <>
      <Loader />
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export default Layout
