; import { getUser } from '@/utils/actions/user.actions';
import { CalendarDays, Clock3, IdCard, Lock, MessageSquare, PackageCheck, ShieldCheck, Truck, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const Dashboard = async () => {
    const user = await getUser()

    return (
        <div className='space-y-10'>
            <div className='space-y-5'>
                <h3 className='flex items-center gap-2 text-sm lg:text-lg'>
                    <span className='w-3 h-3 bg-sky-500 rounded-full'></span>
                    Account
                </h3>
                <div className='flex justify-between items-center'>
                    <Link href='/dashboard/account/'>
                        <div className='bg-white border-2 border-sky-400 rounded-lg flex justify-center items-center w-52 py-5 text-sky-400 font-medium text-sm lg:text-lg text-center hover:text-sky-500 transition-all'>
                            Edit Account <User className='ms-2' />
                        </div>
                    </Link>
                    <Link href='/dashboard/messages/'>
                        <div className='bg-white border-2 border-green-500 rounded-lg flex justify-center items-center w-52 py-5 text-green-500 font-medium text-sm lg:text-lg text-center hover:text-green-600 transition-all'>
                            Messages <MessageSquare className='ms-2' />
                        </div>
                    </Link>
                    <Link href='/dashboard/change-password/'>
                        <div className='bg-white border-2 border-red-400 rounded-lg flex justify-center items-center w-52 py-5 text-red-400 font-medium text-sm lg:text-lg text-center hover:text-red-500 transition-all'>
                            Change Password <Lock className='ms-2' />
                        </div>
                    </Link>

                </div>
            </div>
            <div className='space-y-5'>
                <h3 className='flex items-center gap-2 text-sm lg:text-lg'>
                    <span className='w-3 h-3 bg-sky-500 rounded-full'></span>
                    Orders
                </h3>
                <div className='flex justify-between items-center'>
                    <Link href='/dashboard/orders?status=out-for-delivery/'>
                        <div className='bg-white border-2 border-sky-400 rounded-lg flex justify-center items-center w-52 py-5 text-sky-400 font-medium text-sm lg:text-lg text-center hover:text-sky-500 transition-all'>
                            Out For Delivery<Truck className='ms-2' />
                        </div>
                    </Link>
                    <Link href='/dashboard/orders?status=delivered/'>
                        <div className='bg-white border-2 border-green-500 rounded-lg flex justify-center items-center w-52 py-5 text-green-500 font-medium text-sm lg:text-lg text-center hover:text-green-600 transition-all'>
                            Delivered<PackageCheck className='ms-2' />
                        </div>
                    </Link>
                    <Link href='/dashboard/orders?status=pending-payment/'>
                        <div className='bg-white border-2 border-red-400 rounded-lg flex justify-center items-center w-52 py-5 text-red-400 font-medium text-sm lg:text-lg text-center hover:text-red-500 transition-all'>
                            Pending Payment<Clock3 className='ms-2' />
                        </div>
                    </Link>

                </div>
            </div>
            <div className='space-y-5'>
                <h3 className='flex items-center gap-2 text-sm lg:text-lg'>
                    <span className='w-3 h-3 bg-sky-500 rounded-full'></span>
                    Account Status
                </h3>
                <div className='flex justify-between items-center text'>
                    <p className='flex justify-center items-center gap-2'>
                        <IdCard />
                        Account Type  : {user.is_staff ? 'Staff' : 'Customer'}
                    </p>
                    <p className='flex justify-center items-center gap-2'>
                        <ShieldCheck />
                        Account Status : {user.is_active ? 'Active' : 'Inactive'}
                    </p>
                    <p className='flex justify-center items-center gap-2'>
                        <CalendarDays />
                        Date Joined : {user.date_joined}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard