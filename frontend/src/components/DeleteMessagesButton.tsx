'use client'

import { deleteUserMessages } from '@/utils/actions/user.actions'
import { Trash2 } from 'lucide-react';

const DeleteMessagesButton = () => {
    const handledeleteUserMessages = async () => {
        await deleteUserMessages()
    }

    return (
        <button onClick={handledeleteUserMessages} className='p-2 bg-red-500 flex justify-center items-center rounded-lg text-white gap-1 w-36'>
            Delete All
            <Trash2 />
        </button>
    )
}

export default DeleteMessagesButton