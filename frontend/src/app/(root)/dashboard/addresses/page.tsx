import { getUserAddresses } from '@/utils/actions/user.actions'
import React from 'react'

const Address = async () => {
    const userAddresses = await getUserAddresses()

    return (
        <div></div>
    )
}

export default Address

// <div className='space-y-5'>
//     <h3 className='flex items-center gap-2 text-sm lg:text-lg'>
//         <span className='w-3 h-3 bg-sky-500 rounded-full'></span>
//         Addresses
//     </h3>
//     {
//         userAddresses.length > 0 ?
//             <ul className='space-y-3 divide-y'>
//                 {
//                     userAddresses.map(message => (
//                         <li key={message.id} className='p-5'>
//                             <h4 className='text-black font-medium text-sm lg:text-lg flex items-center gap-2'><MessageSquare />{message.title}</h4>
//                             <p>{message.message}</p>
//                         </li>
//                     ))
//                 }
//             </ul>
//             :
//             <div className="flex flex-col justify-center items-center">
//                 <Image className="object-cover" width={300} height={300} src={'/assets/images/no-message.webp'} alt='Empty Cart' />
//                 <p className="text">No message found</p>
//             </div>
//     }
// </div>