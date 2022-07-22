import React from 'react'
import { Loader, NavbarRemake } from '../atoms/global/'
import { Navbar } from '../molecules/global'

const Layout = ({ children }) => {
  return (
    <>
      <Loader />
      <NavbarRemake />
      {/* <Navbar /> */}
      <main>{children}</main>
    </>
  )
}

export default Layout
