'use client'

import React from 'react'
import Image from 'next/image'
import { Order } from '@/types/cart.types'
import { changeOrderCount, removeOrder } from '@/utils/actions/cart.actions'
import Swal from 'sweetalert2'
import Link from 'next/link'

type CartItemProps = {
    order: Order
}

const CartItem: React.FC<CartItemProps> = ({ order }) => {
    const handleChangeOrderCount = async (id: number, state: 'decrease' | 'increase') => {
        try {
            const res = await changeOrderCount(id, state)

            Swal.fire({
                title: 'Order Count Changed',
                text: Object.values(res)[0] as string,
                icon: 'success',
                confirmButtonText: 'Done'
            })
        } catch (error: any) {
            Swal.fire({
                title: 'Unsuccessful',
                text: error?.message,
                icon: 'error',
                confirmButtonText: 'Done'
            })
        }
    }

    const handleRemoveOrder = async (id: number) => {
        try {
            const res = await removeOrder(id)
            Swal.fire({
                title: 'Order Removed',
                text: Object.values(res)[0] as string,
                icon: 'success',
                confirmButtonText: 'Done'
            })
        } catch (error: any) {
            Swal.fire({
                title: 'Unsuccessful',
                text: error?.message,
                icon: 'error',
                confirmButtonText: 'Done'
            })
        }
    }

    return (
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-10 py-5">
            <Link href={`product/${order.product.slug}`} className='flex w-2/5'>
                <div className="md:w-20 w-10">
                    <Image className="w-full object-cover" width={100} height={100} src={order.product.image} alt={order.product.name} />
                </div>
                <div className="flex flex-col justify-around ml-2 flex-grow">
                    <span className="font-bold md:text-sm text-xs md:w-32 w-14 overflow-hidden text-ellipsis">{order.product.name}</span>
                    <button className="font-semibold hover:text-red-500 text-gray-500 text-xs w-0" onClick={() => handleRemoveOrder(order.id)}>Remove</button>
                </div>
            </Link>
            <div className="flex justify-center w-2/5">
                <button onClick={() => handleChangeOrderCount(order.id, 'decrease')}>
                    <svg className="hidden md:block fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                </button>

                <input className="mx-2 border text-center md:w-8 w-5" type="text" value={order.count} readOnly />

                <button onClick={() => handleChangeOrderCount(order.id, 'increase')}>
                    <svg className="hidden md:block fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                </button>
            </div>
            <span className="text-center w-2/5 font-semibold text-xs">{order.product.discounted_price}</span>
            <span className="text-center w-2/5 font-semibold text-xs">{order.product.discounted_price * order.count}</span>
        </div>
    )
}

export default CartItem