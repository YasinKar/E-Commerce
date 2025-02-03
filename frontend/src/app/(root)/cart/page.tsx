import CartForm from '@/components/CartForm';
import CartItem from '@/components/CartItem';
import { Cart as CartType } from '@/types/cart.types';
import { getCart } from '@/utils/actions/cart.actions'
import { getUserAddresses } from '@/utils/actions/user.actions';
import Image from 'next/image';
import React from 'react'

const Cart = async () => {
  const cart = await getCart() as CartType

  const addresses = await getUserAddresses()

  return (
    <div className="bg-gray-100">
      <div className="mx-auto">
        <div className="md:flex">

          {/* Items  */}
          <div className="md:w-3/4 w-full bg-white md:px-5 px-2 py-5">
            <div className="flex justify-between border-b pb-5">
              <h1 className="title">Cart</h1>
              <h2 className="title">Orders {cart.orders.length}</h2>
            </div>
            <div className="flex mt-5 mb-5">
              <p className="font-semibold text-gray-600 text-xs selection: uppercase w-2/5">Details</p>
              <p className="font-semibold text-gray-600 text-xs selection:uppercase w-2/5 text-center">Count</p>
              <p className="font-semibold text-gray-600 text-xs selection:uppercase w-2/5 text-center">Price</p>
              <p className="font-semibold text-gray-600 text-xs selection:uppercase w-2/5 text-center">Total</p>
            </div>

            <div className="h-screen no-scrollbar overflow-y-scroll overflow-x-hidden w-full">
              {
                cart.orders.length > 0 ?
                  cart.orders.map(order => (
                    <CartItem key={order.id} order={order} />
                  )) :
                  <div className="flex flex-col justify-center items-center">
                    <Image className="object-cover" width={300} height={300} src={'/assets/images/empty-cart.webp'} alt='Empty Cart' />
                    <p className="text">Your Cart Is Empty</p>
                  </div>
              }
            </div>
          </div>

          {/* Right Box  */}
          <div className="md:w-1/4 px-5 py-5">
            <h3 className="text">Orders</h3>
            <CartForm addresses={addresses} cart={cart}/>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total Orders</span>
                <span>{cart.total_amount}</span>
              </div>
              <button className="bg-sky-600 font-semibold hover:bg-sky-700 py-3 text-sm text-white uppercase w-full">Payment and order registration</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Cart