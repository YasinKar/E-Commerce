'use client'

import Link from 'next/link'
import React, { useContext } from 'react'
import { UserRound, ShoppingCart, House, LayoutGrid } from 'lucide-react'
import { AuthContext, AuthContextType } from '@/context/AuthContext'

const MobNavbar = () => {
    const { user } = useContext(AuthContext) as AuthContextType

    return (
        <div className="lg:hidden sticky bottom-0 w-full bg-white py-4 shadow-[rgba(0,0,15,0.5)_0_10px_20px_5px] z-40">
            <div className="flex justify-around">

                <div className="text-gray-500 text-2xl">
                    <Link href='/' className="flex flex-col items-center">
                        <House />
                    </Link>
                </div>

                <div className="text-gray-500 text-2xl">
                    <Link href='/products' className="flex flex-col items-center">
                        <LayoutGrid />
                    </Link>
                </div>

                <div className="relative text-gray-500 text-2xl">
                    <Link href='/cart'>
                        <ShoppingCart />
                        <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[15px] h-[15px] text-[10px] text-white flex items-center justify-center place-items-center translate-x-1 -translate-y-1">
                            0
                        </div>
                    </Link>
                </div>

                <div className="text-gray-500 text-2xl">
                    <Link href={user ? '/dashboard' : '/register'} className="flex flex-col items-center">
                        <UserRound />
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default MobNavbar