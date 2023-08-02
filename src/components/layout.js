/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import Footer from "./footer"

const Layout = ({ children, location }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLight, setIsLight] = useState(true)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleMode = () => {
    setIsLight(!isLight)
  }

  return (
    <div className={isLight ? "light" : "dark"}>
      <Header
        location={location}
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        isLight={isLight}
        toggleMode={toggleMode}
      />
      <main>{children}</main>
      <Footer isLight={isLight}></Footer>
    </div>
  )
}

export default Layout
