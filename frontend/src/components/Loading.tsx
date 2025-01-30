import { LoaderCircle } from 'lucide-react'
import React from 'react'

const Loading = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <LoaderCircle className='animate-spin size-14 text-sky-500' />
        </div>
    )
}

export default Loading