import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <div className="hidden lg:block">
      <div className="container">
        <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-black">
          <Link className="navbar__link relative hover" href='/'>Home</Link>
          <Link className="navbar__link relative hover" href='/about'>About</Link>
          <Link className="navbar__link relative hover" href='/contact-us'>Contact Us</Link>
          <Link className="navbar__link relative hover" href='/products'>Products</Link>
        </div>
      </div>
    </div>
  )
}

export default NavBar