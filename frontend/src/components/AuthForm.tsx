'use client'

import { AuthContext, AuthContextType } from '@/context/AuthContext'
import { register, requestOTP, signIn } from '@/utils/actions/user.actions'
import { setCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'
import { LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useContext, useState } from 'react'

const AuthForm = ({ type }: { type: 'login' | 'register' }) => {
    const router = useRouter()

    const { setAuthTokens, setUser } = useContext(AuthContext) as AuthContextType

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const handelSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const formData = new FormData(event.currentTarget)
            if (type === 'login') {
                const email = formData.get('email') as string
                const password = formData.get('password') as string

                const res = await signIn(email, password)
                setCookie("authTokens", JSON.stringify(res), { maxAge: 30 * 24 * 60 * 60 });
                setAuthTokens(res)
                setUser(jwtDecode(res.access))
                router.push('/')
            } else {
                const email = formData.get('email') as string
                const username = formData.get('username') as string
                const password = formData.get('password') as string
                const confirmPassword = formData.get('confirmPassword') as string

                await register(email, username, password, confirmPassword)
                await requestOTP(email)
                router.push(`/verify-email?email=${email}`)
            }
        } catch (error: any) {
            setError(error?.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handelSubmit} className='w-full space-y-5'>
            <h2 className='title'>{type === 'login' ? 'Login' : 'Register'}</h2>
            {/* Username  */}
            {
                type === 'register' && (
                    < div className="w-full">
                        <div className="relative">
                            <input
                                className="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border-1 placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-500 focus:border-sky-500"
                                placeholder=" " name='username' type="text" autoComplete="username" required /><label
                                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-sky-500 before:border-blue-gray-200 peer-focus:before:!border-sky-500 after:border-blue-gray-200 peer-focus:after:!border-sky-500">Username
                            </label>
                        </div>
                    </div>
                )
            }
            {/* Email  */}
            <div className="w-full">
                <div className="relative">
                    <input
                        className="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border-1 placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-500 focus:border-sky-500"
                        placeholder=" " name='email' type="email" autoComplete="email" required /><label
                            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-sky-500 before:border-blue-gray-200 peer-focus:before:!border-sky-500 after:border-blue-gray-200 peer-focus:after:!border-sky-500">Email
                    </label>
                </div>
            </div>
            {/* Password  */}
            <div className="w-full">
                <div className="relative">
                    <input
                        className="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border-1 placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-500 focus:border-sky-500"
                        placeholder=" " name='password' type="password" autoComplete='current-password' required /><label
                            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-sky-500 before:border-blue-gray-200 peer-focus:before:!border-sky-500 after:border-blue-gray-200 peer-focus:after:!border-sky-500">Password
                    </label>
                </div>
            </div>
            {/* Confirm Password  */}
            {
                type === 'register' && (
                    <div className="w-full">
                        <div className="relative">
                            <input
                                className="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border-1 placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-500 focus:border-sky-500"
                                placeholder=" " name='confirmPassword' type="password" autoComplete='current-password' required /><label
                                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-sky-500 before:border-blue-gray-200 peer-focus:before:!border-sky-500 after:border-blue-gray-200 peer-focus:after:!border-sky-500">Confirm Password
                            </label>
                        </div>
                    </div>
                )
            }

            {error && <p className="error-message">*{error}</p>}

            {/* Submit  */}
            <button type="submit" className="bg-sky-500 transition duration-300 hover:bg-sky-600 text-white py-2 w-full rounded-lg cursor-pointer flex justify-center" disabled={isLoading}>
                {
                    isLoading ? <LoaderCircle className='animate-spin' /> : 'Submit'
                }
            </button>

            {
                type === 'login' &&
                <Link href='/forgot-password' className="link text-center flex justify-center">Forgot password?</Link>
            }

            <div className="text-sm flex justify-center space-x-1">
                <p className="text-black">
                    {type === "login"
                        ? "Don't have an account?"
                        : "Already have an account?"}
                </p>
                <Link
                    href={type === "login" ? "/register" : "/login"}
                    className="link"
                >
                    {" "}
                    {type === "login" ? "Register" : "Login"}
                </Link>
            </div>
        </form >
    )
}

export default AuthForm