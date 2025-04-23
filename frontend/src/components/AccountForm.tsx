'use client'

import { User } from '@/types/user.types'
import { updateUser } from '@/utils/actions/user.actions'
import { CalendarDays, IdCard, LoaderCircle, ShieldCheck } from 'lucide-react'
import React, { FormEvent, useState } from 'react'
import Swal from 'sweetalert2'

type AccountFormProps = {
    user: User
}

const AccountForm: React.FC<AccountFormProps> = ({ user }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const handelSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const formData = new FormData(event.currentTarget)
            const firstName = formData.get('firstName') as string
            const lastName = formData.get('lastName') as string
            const username = formData.get('username') as string
            const email = formData.get('email') as string

            const res = await updateUser(firstName, lastName, username, email)
            Swal.fire({
                title: 'successfully updated !',
                text: Object.values(res)[0] as string,
                icon: 'success',
                confirmButtonText: 'Done'
            })
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError('An unexpected error occurred')
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='space-y-10'>
            <form className='space-y-5' onSubmit={handelSubmit}>
                <div className="w-full">
                    <div className="relative">
                        <input
                            className="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border-1 placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-500 focus:border-sky-500"
                            placeholder=" " defaultValue={user.first_name} name='firstName' type="text" autoComplete='current-firstName' required /><label
                                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-sky-500 before:border-blue-gray-200 peer-focus:before:!border-sky-500 after:border-blue-gray-200 peer-focus:after:!border-sky-500">First Name
                        </label>
                    </div>
                </div>
                <div className="w-full">
                    <div className="relative">
                        <input
                            className="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border-1 placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-500 focus:border-sky-500"
                            placeholder=" " defaultValue={user.last_name} name='lastName' type="text" autoComplete='current-lastName' required /><label
                                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-sky-500 before:border-blue-gray-200 peer-focus:before:!border-sky-500 after:border-blue-gray-200 peer-focus:after:!border-sky-500">Last Name
                        </label>
                    </div>
                </div>
                <div className="w-full">
                    <div className="relative">
                        <input
                            className="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border-1 placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-500 focus:border-sky-500"
                            placeholder=" " defaultValue={user.username} name='username' type="text" autoComplete='current-username' required /><label
                                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-sky-500 before:border-blue-gray-200 peer-focus:before:!border-sky-500 after:border-blue-gray-200 peer-focus:after:!border-sky-500">Username
                        </label>
                    </div>
                </div>
                <div className="w-full">
                    <div className="relative">
                        <input
                            className="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border-1 placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-500 focus:border-sky-500"
                            placeholder=" " defaultValue={user.email} name='email' type="email" autoComplete='current-email' required /><label
                                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-sky-500 before:border-blue-gray-200 peer-focus:before:!border-sky-500 after:border-blue-gray-200 peer-focus:after:!border-sky-500">Email
                        </label>
                    </div>
                </div>

                {error && <p className="error-message">*{error}</p>}

                {/* Submit  */}
                <button type="submit" className="bg-sky-500 transition duration-300 hover:bg-sky-600 text-white py-2 w-full rounded-lg cursor-pointer flex justify-center" disabled={isLoading}>
                    {
                        isLoading ? <LoaderCircle className='animate-spin' /> : 'Save'
                    }
                </button>
            </form>
            <div className='flex justify-between items-center text'>
                <p className='flex justify-center items-center gap-2'>
                    <IdCard />
                    Account Type  : {user.is_staff ? 'Staff' : 'Customer'}
                </p>
                <p className='flex justify-center items-center gap-2'>
                    <ShieldCheck />
                    Account Status : {user.is_active ? 'Active' : 'Inactive'}
                </p>
                <p className='flex justify-center items-center gap-2'>
                    <CalendarDays />
                    Date Joined : {user.date_joined}
                </p>
            </div>
        </div>
    )
}

export default AccountForm