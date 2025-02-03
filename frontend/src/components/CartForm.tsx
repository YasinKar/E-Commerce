'use client'

import React, { useState } from 'react'
import { Address } from '@/types/user.types';
import { LoaderCircle } from 'lucide-react';
import { selectAddress } from '@/utils/actions/cart.actions';
import Swal from 'sweetalert2';
import { Cart } from '@/types/cart.types';

type CartFormProps = {
    addresses: Address[]
    cart: Cart
}

const CartForm: React.FC<CartFormProps> = ({ addresses, cart }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const formData = new FormData(event.currentTarget)

            const addressID = formData.get('addressID') as string
            const intAddressID = parseInt(addressID)
            const res = await selectAddress(intAddressID)
            Swal.fire({
                title: 'Address Selected !',
                text: res.message,
                icon: 'success',
                confirmButtonText: 'Done'
            })
        } catch (error: any) {
            setError(error?.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Select an address</label>
            <select
                id="countries"
                name="addressID"
                className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 text-black"
                value={cart.address ? cart.address.id : undefined}
            >
                {addresses.map(address => (
                    <option key={address.id} value={address.id}>
                        {`${address.receiver_first_name} ${address.receiver_last_name}`} - {address.receiver_address}
                    </option>
                ))}
            </select>

            {error && <p className="error-message">*{error}</p>}
            <div className='flex justify-center items-center gap-2 mt-5'>
                <button type='submit' className="bg-sky-500 hover:bg-sky-600 px-5 py-2 text-sm text-white uppercase" disabled={isLoading}>
                    {
                        isLoading ? <LoaderCircle className='animate-spin' /> : 'Submit'
                    }
                </button>
                <button type='button' className="bg-sky-500 hover:bg-sky-600 px-5 py-2 text-sm text-white uppercase">
                    Add New Address
                </button>
            </div>
        </form>
    )
}

export default CartForm