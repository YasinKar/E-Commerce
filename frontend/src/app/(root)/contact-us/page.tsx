'use client'

import React, { useState } from 'react'
import { Conatct as ConatctType } from '@/types/contact.type'
import request from '@/services/index'
import { Status } from '@/types/status.type'
import { useSiteContext } from '@/context/SiteContext'
import { Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link'
import { Alert } from "@nextui-org/react";

const ContactUs = () => {
  const { site_settings } = useSiteContext();

  const [contactForm, setContactForm] = useState<ConatctType>(
    {
      email: '',
      title: '',
      message: ''
    }
  )
  const [status, setStatus] = useState<Status>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('Loading')
    if (contactForm.email, contactForm.message, contactForm.title) {
      const response = await request.post('/site/contact-us/', contactForm)
      setContactForm(
        {
          email: '',
          title: '',
          message: ''
        }
      )

      if (response.status === 'Success') {
        setStatus({
          status: 'Success',
          message: 'Your message recived successfuly.'
        });
      } else {
        setStatus({
          status: 'Error',
          message: response.message
        });
      }
      setStatus('Loading')
    } else {
      setStatus({ status: 'Error', message: 'Please fill out the form.' })
      setStatus('Loading')
    }
  }

  return (
    <div>
      <div className="container my-10 mx-auto px-2 md:px-4">

        <section className="mb-32">

          <div className="flex justify-center">
            <div className="text-center md:max-w-xl lg:max-w-3xl">
              <h2 className="mb-12 px-6 text-3xl font-bold text-gray-700">
                Contact Us
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center">

            <form className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6" onSubmit={handleSubmit}>

              <div className="mb-3 w-full">
                <label className="block font-medium mb-[2px] text-sky-500" htmlFor="exampleInput90">
                  Title
                </label>
                <input type="text" name='title' className="px-2 py-2 border w-full outline-none rounded-md" placeholder="Title" onChange={handleChange} value={contactForm.title} />
              </div>

              <div className="mb-3 w-full">
                <label className="block font-medium mb-[2px] text-sky-500" htmlFor="exampleInput90">
                  Email
                </label>
                <input type="email" className="px-2 py-2 border w-full outline-none rounded-md"
                  placeholder="Email" name='email' onChange={handleChange} value={contactForm.email} />
              </div>

              <div className="mb-3 w-full">
                <label className="block font-medium mb-[2px] text-sky-500" htmlFor="exampleInput90">
                  Message
                </label>
                <textarea className="px-2 py-2 border rounded-[5px] w-full outline-none" name="message" onChange={handleChange} value={contactForm.message}></textarea>
              </div>

              <button type="submit" disabled={status === 'Loading'}
                className="cursor-pointer inline-block w-full rounded bg-sky-500 px-6 py-2.5 font-medium uppercase leading-normal text-white hover:shadow-md hover:bg-sky-600">
                Send
              </button>

            </form>

            <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
              <div className="flex flex-wrap">
                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                  <div className="flex items-start">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-sky-400-100 p-4 text-sky-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                          strokeWidth="2" stroke="currentColor" className="h-6 w-6">
                          <path strokeLinecap="round" strokeLinejoin="round"
                            d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="mb-2 font-bold">
                        Contact
                      </p>
                      <p className="text-neutral-500 ">
                        {site_settings.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                  <div className="align-start flex">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-sky-400-100 p-4 text-sky-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                          strokeWidth="2" stroke="currentColor" className="h-6 w-6">
                          <path strokeLinecap="round" strokeLinejoin="round"
                            d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146M8.683 5a6.032 6.032 0 01-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0115.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 00-.575-1.752M4.921 6a24.048 24.048 0 00-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 01-5.223 1.082" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="mb-2 font-bold">
                        Report Bug
                      </p>
                      <p className="text-neutral-500 ">
                        yasinkardev@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-20">
                <Link href={site_settings.twitter ? site_settings.twitter : ''} target="_blank" rel="noopener noreferrer" className='cursor-pointer'>
                  <Twitter className="size-10 text-sky-700" />
                </Link>
                <Link href={site_settings.instagram ? site_settings.instagram : ''} target="_blank" rel="noopener noreferrer" className='cursor-pointer'>
                  <Instagram className="size-10 text-red-500" />
                </Link>
                <Link href={site_settings.linkedin ? site_settings.linkedin : ''} target="_blank" rel="noopener noreferrer" className='cursor-pointer'>
                  <Linkedin className="size-10 text-sky-900" />
                </Link>
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ContactUs