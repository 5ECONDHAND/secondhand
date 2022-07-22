import React from 'react'
import { NavbarRemake } from '../atoms/global/'

const Layout = ({ children }) => {
  return (
    <>
      <NavbarRemake />
      <main>{children}</main>
    </>
  )
}

export default Layout
