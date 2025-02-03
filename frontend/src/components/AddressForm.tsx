'use client'

import React, { useState } from 'react'

const AddressForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const formData = new FormData(event.currentTarget)
            const email = formData.get('email') as string
            const password = formData.get('password') as string
        } catch (error: any) {
            setError(error?.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="py-10">
                <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Post Code</label>
                <input type="text" id="promo" placeholder="Enter yout post code" className="p-2 text-sm w-full" />
                <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Post Code</label>
                <input type="text" id="promo" placeholder="Enter yout post code" className="p-2 text-sm w-full" />
                <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Post Code</label>
                <input type="text" id="promo" placeholder="Enter yout post code" className="p-2 text-sm w-full" />
                <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Post Code</label>
                <input type="text" id="promo" placeholder="Enter yout post code" className="p-2 text-sm w-full" />
            </div>
            <button className="bg-sky-500 hover:bg-sky-600 px-5 py-2 text-sm text-white uppercase">Check</button>
        </form>
    )
}

export default AddressForm