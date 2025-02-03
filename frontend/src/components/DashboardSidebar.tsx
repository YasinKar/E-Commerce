import { User } from '@/types/user.types'
import { Heart, LogOut, Mail, MapPinHouse, MessageSquare, ShoppingCart, User as UserIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type DashboardSidebarProps = {
    user: User
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ user }) => {
    return (
        <div className='col-span-4 row-span-2 hidden lg:block xl:col-span-3'>
            <div className="w-[300px] sticky top-32 mb-4 border-r border-b border-gray-300">
                <div className="flex max-h-full flex-col">
                    <div className="flex h-full flex-col gap-4 p-4">
                        <div className="flex flex-col items-center gap-2  pb-0">
                            <Image
                                src='/assets/images/user.webp'
                                alt="Logo"
                                width={100}
                                className='m-auto rounded-full border border-sky-500'
                                height={100}
                            />
                            <h2 className='font-medium text-lg text-center'>@{user.username}</h2>
                            <p className='flex justify-center items-center gap-2 text-sm'><Mail />{user.email}</p>
                        </div>
                        <div className="grow">
                            <ul className="divide-y">
                                <li className='py-3'>
                                    <Link href='/dashboard/profile/' className='text flex justify-center items-center hover:text-sky-500 transition-all'>
                                        Profile <UserIcon className='ms-2' />
                                    </Link>
                                </li>
                                <li className='py-3'>
                                    <Link href='/dashboard/orders/' className='text flex justify-center items-center hover:text-sky-500 transition-all'>
                                        Orders <ShoppingCart className='ms-2' />
                                    </Link>
                                </li>
                                <li className='py-3'>
                                    <Link href='/dashboard/messages/' className='text flex justify-center items-center hover:text-sky-500 transition-all'>
                                        Messages <MessageSquare className='ms-2' />
                                    </Link>
                                </li>
                                <li className='py-3'>
                                    <Link href='/dashboard/addresses/' className='text flex justify-center items-center hover:text-sky-500 transition-all'>
                                        Addresses <MapPinHouse className='ms-2' />
                                    </Link>
                                </li>
                                <li className='py-3'>
                                    <Link href='/dashboard/wishlist/' className='text flex justify-center items-center hover:text-sky-500 transition-all'>
                                        Wishlist <Heart className='ms-2' />
                                    </Link>
                                </li>
                                <li className='py-3'>
                                    <Link href='/log-out/' className='font-medium text-sm lg:text-lg text-center text-red-500 flex justify-center items-center hover:text-red-600 transition-all'>
                                        Log Out <LogOut className='ms-2' />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DashboardSidebar