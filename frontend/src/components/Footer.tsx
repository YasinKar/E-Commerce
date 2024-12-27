import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-700 mt-10">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">E Commere</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-400 sm:mb-0">
                        <li>
                            <Link href='/' className="hover:underline me-4 md:me-6">Shop</Link>
                        </li>
                        <li>
                            <Link href='/about' className="hover:underline me-4 md:me-6">About Us</Link>
                        </li>
                        <li>
                            <Link href='/contact-us' className="hover:underline me-4 md:me-6">Contact Us</Link>
                        </li>
                        <li>
                            <Link href='/categories' className="hover:underline me-4 md:me-6">Products</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 sm:mx-auto border-gray-500 lg:my-8" />
                <span className="block text-sm text-gray-400 sm:text-center">Copyright © 2024</span>
            </div>
        </footer>
    )
}

export default Footer