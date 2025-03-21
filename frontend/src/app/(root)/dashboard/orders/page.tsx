import { Cart } from '@/types/cart.types';
import { getUserOrders } from '@/utils/actions/user.actions'
import { ChevronRight, CircleCheck, CircleHelp, Clock3, Cpu, PackageCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

type OrdersProps = {
    searchParams: Record<string, string | string[] | undefined>;
}

const orderStatus = {
    'delivered': {
        color: 'green-600',
        progress: '100%',
        icon: <PackageCheck />
    },

    'out_for_delivery': {
        color: 'emerald-600',
        progress: '75%',
        icon: <PackageCheck />
    },
    'processing': {
        color: 'sky-600',
        progress: '50%',
        icon: <Cpu />
    },
    'pending_payment': {
        color: 'yellow-600',
        progress: '25%',
        icon: <Clock3 />
    }
}

const Orders = async ({ searchParams }: OrdersProps) => {
    searchParams = await searchParams
    const status = searchParams.status as string

    let orders
    if (status === 'delivered' || status === 'processing' || status === 'out_for_delivery' || status === 'pending_payment') {
        orders = await getUserOrders(status)
    } else if (!status) {
        orders = await getUserOrders()
    } else {
        notFound()
    }

    return (
        <div className='space-y-5'>
            <h3 className='flex items-center gap-2 text-sm lg:text-lg'>
                <span className='w-3 h-3 bg-sky-500 rounded-full'></span>
                Orders
            </h3>
            <ul className="mb-8 flex flex-wrap items-center justify-center gap-2 md:justify-start" role="tablist" >
                <li role="presentation">
                    <Link
                        href={'/dashboard/orders'}
                        className={`rounded-lg px-6 py-2 text-sm ${!searchParams.status ? 'bg-sky-500 text-white' : 'border border-sky-500 hover:bg-sky-100'}`}
                    >
                        All
                    </Link>
                </li>
                <li role="presentation">
                    <Link
                        href={'/dashboard/orders?status=processing'}
                        className={`rounded-lg px-6 py-2 text-sm ${status === 'processing' ? 'bg-sky-500 text-white' : 'border border-sky-500 hover:bg-sky-100'}`}
                    >
                        Processing
                    </Link>

                </li>
                <li role="presentation">
                    <Link
                        href={'/dashboard/orders?status=out_for_delivery'}
                        className={`rounded-lg px-6 py-2 text-sm ${status === 'out_for_delivery' ? 'bg-sky-500 text-white' : 'border border-sky-500 hover:bg-sky-100'}`}
                    >
                        Out For Delivery
                    </Link>
                </li>
                <li role="presentation">
                    <Link
                        href={'/dashboard/orders?status=delivered'}
                        className={`rounded-lg px-6 py-2 text-sm ${status === 'delivered' ? 'bg-sky-500 text-white' : 'border border-sky-500 hover:bg-sky-100'}`}
                    >
                        Delivered
                    </Link>

                </li>
                <li role="presentation">
                    <Link
                        href={'/dashboard/orders?status=pending_payment'}
                        className={`rounded-lg px-6 py-2 text-sm ${status === 'pending_payment' ? 'bg-sky-500 text-white' : 'border border-sky-500 hover:bg-sky-100'}`}
                    >
                        Pending Payment
                    </Link>

                </li>
            </ul>
            {
                orders.results.length > 0 ?
                    <ul className='space-y-5'>
                        {
                            orders.results.map((order: Cart) => (
                                <li key={order.id} className='space-y-5 p-5 border border-sky-500 rounded-lg'>
                                    <div className='flex justify-between items-center'>
                                        {
                                            order.is_paid ?
                                                <h4 className='text-green-500 font-medium text-lg lg:text-2xl flex items-center gap-2'><CircleCheck />Paid</h4>
                                                :
                                                <h4 className='text-yellow-500 font-medium text-lg lg:text-2xl flex items-center gap-2'><CircleHelp />Pending Payment</h4>
                                        }
                                        <Link className='link flex items-center' href={`/dashboard/orders/${order.id}`}>See Order Detail<ChevronRight /></Link>
                                    </div>
                                    <div className='flex items-center gap-10 text-black font-medium'>
                                        <p>Order ID : {order.id}</p>
                                        <p>Paid : {order.paid}</p>
                                        <p>Paid Date : {order.paid_date}</p>
                                        <p>Items : {order.orders.length}</p>
                                    </div>
                                    <div className={`mb-1 text-base font-medium text-${orderStatus[order.status].color}`}>{order.status}</div>
                                    <div className="w-full bg-gray-300 rounded-full h-2.5 mb-2">
                                        <div className={`bg-${orderStatus[order.status].color} h-2.5 rounded-full`} style={{ width: orderStatus[order.status].progress }}></div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    :
                    <div className="flex flex-col justify-center items-center">
                        <Image className="object-cover" width={300} height={300} src={'/assets/images/Product-Not-Found.webp'} alt='Empty Cart' />
                        <p className="text">No order found</p>
                    </div>
            }
        </div>
    )
}

export default Orders