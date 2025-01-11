'use client'

import { Instagram, Linkedin, LoaderCircle, Mail, Phone, Send, Twitter } from 'lucide-react'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handelSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData(event.currentTarget)
      fetch('hyzdf')

    } catch {
      setError('Failed to create account. Please try again.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <section className='section'>
      <h2 className='title'>Contact Us</h2>

      <div className='flex flex-col sm:flex-row items-center justify-center space-y-10'>
        <form onSubmit={handelSubmit} className='w-full space-y-5 flex-1'>
          {/* Fullname  */}
          <div className="w-full">
            <div className="relative">
              <input
                className="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border-1 placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-500 focus:border-sky-500"
                placeholder=" " name='full_name' type="text" autoComplete="full_name" required /><label
                  className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-sky-500 before:border-blue-gray-200 peer-focus:before:!border-sky-500 after:border-blue-gray-200 peer-focus:after:!border-sky-500">Full name
              </label>
            </div>
          </div>
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
          {/* Title  */}
          <div className="w-full">
            <div className="relative">
              <input
                className="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border-1 placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-500 focus:border-sky-500"
                placeholder=" " name='title' type="text" autoComplete="title" required /><label
                  className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-sky-500 before:border-blue-gray-200 peer-focus:before:!border-sky-500 after:border-blue-gray-200 peer-focus:after:!border-sky-500">Title
              </label>
            </div>
          </div>
          {/* Message  */}
          <div className="w-full">
            <div className="relative">
              <textarea
                rows={5}
                className="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border-1 placeholder-shown:border-gray-400 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-500 focus:border-sky-500"
                placeholder=" " name='message' required /><label
                  className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-sky-500 before:border-blue-gray-200 peer-focus:before:!border-sky-500 after:border-blue-gray-200 peer-focus:after:!border-sky-500">Message
              </label>
            </div>
          </div>

          {error && <p className="error-message">*{error}</p>}

          {/* Submit  */}
          <button type="submit" className="bg-sky-500 transition duration-300 hover:bg-sky-600 text-white py-2 w-full rounded-lg cursor-pointer flex justify-center" disabled={isLoading}>
            {
              isLoading ? <LoaderCircle className='animate-spin' /> : 'Submit'
            }
          </button>
        </form >
        <div className='flex-1 flex flex-col justify-center items-center space-y-10'>
          <p className='flex text items-center'>
            <Mail className='mr-1' />Email@gmail.com
          </p>
          <p className='flex text items-center'>
            <Phone className='mr-1' />944545454566
          </p>
          <div className="flex justify-center gap-10 sm:gap-15 md:gap-20">
            <Link href='' target="_blank" rel="noopener noreferrer" className='cursor-pointer'>
              <Twitter className="size-8 sm:size-10 text-sky-500 hover:text-sky-600 transition" />
            </Link>
            <Link href='' target="_blank" rel="noopener noreferrer" className='cursor-pointer'>
              <Instagram className="size-8 sm:size-10 text-sky-500 hover:text-sky-600 transition" />
            </Link>
            <Link href='' target="_blank" rel="noopener noreferrer" className='cursor-pointer'>
              <Linkedin className="size-8 sm:size-10 text-sky-500 hover:text-sky-600 transition" />
            </Link>
            <Link href='' target="_blank" rel="noopener noreferrer" className='cursor-pointer'>
              <Send className="size-8 sm:size-10 text-sky-500 hover:text-sky-600 transition" />
            </Link>
          </div>
        </div>
      </div>
    </section>

  )
}

export default ContactForm