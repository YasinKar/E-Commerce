import { Address as AddressType } from '@/types/user.types'
import { getUserAddresses } from '@/utils/actions/user.actions'
import { MapPin, Pencil, Trash2 } from 'lucide-react'
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
                                <li key={address.id} className='border border-sky-500 p-2 rounded-lg'>
                                    <div className='flex justify-between'>
                                        <p className='flex items-center gap-2 text'><MapPin className='text-red-500 size-7' /> {address.receiver_first_name} {address.receiver_last_name}</p>
                                        <div className='flex justify-center gap-3'>
                                            <button className='flex items-cente  gap-1 bg-green-500 rounded-lg p-2 text-white hover:bg-green-600'>
                                                Edit
                                                <Pencil className='size-5' />
                                            </button>
                                            <button className='flex items-center gap-1 bg-red-500 rounded-lg p-2 text-white hover:bg-red-600'>
                                                Delete
                                                <Trash2 className='size-5' />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='m-2 text-black text-sm;'>
                                        <p><span className='font-medium'>address</span> - {address.receiver_address}</p>
                                        <p><span className='font-medium'>receiver national-code</span> - {address.receiver_national_code}</p>
                                        <p><span className='font-medium'>receiver phone</span> - {address.receiver_phone}</p>
                                        <p><span className='font-medium'>post code</span> - {address.receiver_post_code}</p>
                                    </div>
                                </li>
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