import { ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
            <div className="flex h-[calc(100vh-106px)] items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-4 space-y-5">
                    <Image src="/assets/images/404.webp" alt="404" height={1000} width={1000} className="max-w-lg w-[300px] sm:w-[500px] object-cover" />
                    <h1 className="sr-only">404</h1>
                    <div className="text-xl text-black">This page could not be found.</div>
                    <Link
                        href="/"
                        className="flex justify-center items-center gap-1 rounded-lg bg-sky-500 px-4 py-2 text-white duration-300 hover:bg-sky-600"
                    >
                        Return Home
                        <ChevronRightIcon />
                    </Link>
                </div>
            </div>
    )
}

export default NotFound