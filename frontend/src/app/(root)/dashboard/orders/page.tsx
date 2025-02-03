import { getUserOrders } from '@/utils/actions/user.actions'
import React from 'react'

const Orders = async () => {
    const orders = await getUserOrders()

    console.log(orders);


    return (
        <div className='space-y-5'>
            <h3 className='flex items-center gap-2 text-sm lg:text-lg'>
                <span className='w-3 h-3 bg-sky-500 rounded-full'></span>
                Orders
            </h3>
            <ul className="mb-8 flex flex-wrap items-center justify-center gap-2 md:justify-start" role="tablist" >
                <li role="presentation">
                    <button
                        type="button"
                        role="tab"
                        className="rounded-lg px-6 py-2 text-sm border border-sky-500"
                    >
                        All
                    </button>
                </li>
                <li role="presentation">
                    <button
                        type="button"
                        role="tab"
                        className="rounded-lg px-6 py-2 text-sm border border-sky-500"
                    >
                        Processing
                    </button>

                </li>
                <li role="presentation">
                    <button
                        type="button"
                        role="tab"
                        className="rounded-lg px-6 py-2 text-sm border border-sky-500"
                    >
                        Out For Delivery
                    </button>

                </li>
                <li role="presentation">
                    <button
                        type="button"
                        role="tab"
                        className="rounded-lg px-6 py-2 text-sm border border-sky-500"
                    >
                        Delivered
                    </button>

                </li>
                <li role="presentation">
                    <button
                        type="button"
                        role="tab"
                        className="rounded-lg px-6 py-2 text-sm border border-sky-500"
                    >
                        Pending Payment
                    </button>

                </li>
            </ul>
        </div>
    )
}

export default Orders