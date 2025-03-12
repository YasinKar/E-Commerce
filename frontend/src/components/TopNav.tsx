"use client"

import React, { useContext, useState } from 'react'
import { UserRound, ShoppingCart, Search, Heart } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { AuthContext, AuthContextType } from '@/context/AuthContext';
import { siteSettings } from '@/types/siteContent.types';
import Image from 'next/image';

type TopNavProps = {
    settings: siteSettings
}

const TopNav: React.FC<TopNavProps> = ({ settings }) => {
    const { user } = useContext(AuthContext) as AuthContextType

    const [searchValue, setSearchValue] = useState('')

    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchValue) {
            router.push(`/search/?value=${searchValue}`)
        }
    }

    return (
        <div className="border-b border-gray-200 py-2">
            <div className="container sm:flex justify-between items-center">
                <div className="font-bold text-4xl text-center pb-4 sm:pb-0 text-black">
                    <Link href='/'>
                        {settings.site_logo &&
                            <Image
                                src={settings.site_logo}
                                alt="Logo"
                                width={80}
                                className='m-auto'
                                height={80}
                            />
                        }
                    </Link>
                </div>

                <div className="w-full sm:w-[300px] md:w-[70%] relative">
                    <form onSubmit={handleSubmit}>
                        <input type="text" className="border-gray-200 border-2 p-2 px-4 rounded-lg w-full outline-none focus:border-sky-500 text-gray-600" placeholder="Search..." onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
                        <button><Search className='absolute right-0 top-0 mr-3 mt-3 text-gray-600 cursor-pointer hover' size={20} /></button>
                    </form>
                </div>

                <div className="hidden lg:flex gap-4 text-gray-600 text-[30px]">
                    <Link href={user ? '/dashboard' : '/login'}>
                        <UserRound className='cursor-pointer hover' />
                    </Link>

                    <div className="relative">
                        <Link href='/cart'>
                            <ShoppingCart className='cursor-pointer hover' />
                            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
                                0
                            </div>
                        </Link>
                    </div>

                    <div className="relative">
                        <Link href='/wishlist'>
                            <Heart className='cursor-pointer hover' />
                            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
                                0
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopNav