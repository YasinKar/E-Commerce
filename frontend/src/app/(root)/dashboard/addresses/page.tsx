import { Address as AddressType } from '@/types/user.types'
import { getUserAddresses } from '@/utils/actions/user.actions'
import Image from 'next/image'
import React from 'react'

const Address = async () => {
    const userAddresses = await getUserAddresses() as AddressType[]
    console.log(userAddresses);

    return (
        <div className='space-y-5'>
            <h3 className='flex items-center gap-2 text-sm lg:text-lg'>
                <span className='w-3 h-3 bg-sky-500 rounded-full'></span>
                Addresses
            </h3>
            {
                userAddresses.length > 0 ?
                    <ul className='space-y-3 divide-y'>
                        {
                            userAddresses.map(address => (
                                <div></div>
                            ))
                        }
                    </ul>
                    :
                    <div className="flex flex-col justify-center items-center">
                        <Image className="object-cover" width={300} height={300} src={'/assets/images/address-not-found.webp'} alt='No address' />
                        <p className="text">No address found</p>
                    </div>
            }
        </div>
    )
}

export default Address