import { electronicSymbol, siteSettings } from '@/types/siteContent.types'
import { Instagram, Linkedin, Send, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type FooterProps = {
    electronicSymbols: electronicSymbol[]
    settings: siteSettings
}

const Footer: React.FC<FooterProps> = ({ electronicSymbols, settings }) => {
    return (
        <footer className="bg-white border-t border-gray-300">
            <div className="mx-auto w-full max-w-screen-xl">
                <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-black uppercase">Help center</h2>
                        <ul className="text-gray-500 font-medium">
                            <li className="mb-4">
                                <Link href="/FAQ" className="hover:underline">FAQ & Help</Link>
                            </li>
                            <li className="mb-4">
                                <Link href="/contact-us" className="hover:underline">Contact Us</Link>
                            </li>
                            <li className="mb-4">
                                <Link href={settings.instagram || '/'} className="hover:underline">Instagram</Link>
                            </li>
                            <li className="mb-4">
                                <Link href={settings.telegram || '/'} className="hover:underline">Telegram</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-black uppercase">Shop</h2>
                        <ul className="text-gray-500 font-medium">
                            <li className="mb-4">
                                <Link href="/" className="hover:underline">Home</Link>
                            </li>
                            <li className="mb-4">
                                <Link href="/products" className="hover:underline">Products</Link>
                            </li>
                            <li className="mb-4">
                                <Link href="/cart" className="hover:underline">Cart</Link>
                            </li>
                            <li className="mb-4">
                                <Link href="/products?on_sale=true" className="hover:underline">Special Sale</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-black uppercase">Account</h2>
                        <ul className="text-gray-500 font-medium">
                            <li className="mb-4">
                                <Link href="/dashboard" className="hover:underline">Dashboard</Link>
                            </li>
                            <li className="mb-4">
                                <Link href="/dashboard/orders" className="hover:underline">Orders</Link>
                            </li>
                            <li className="mb-4">
                                <Link href="/login" className="hover:underline">Sign in</Link>
                            </li>
                            <li className="mb-4">
                                <Link href="/log-out" className="hover:underline">Sign out</Link>
                            </li>
                        </ul>
                    </div>
                    <div >
                        <ul className='flex flex-wrap justify-around items-center'>
                            {
                                electronicSymbols &&
                                electronicSymbols.map(electronicSymbol => (
                                    <li className="mb-4" key={electronicSymbol.id}>
                                        <Link href={electronicSymbol.url} className="hover:underline">
                                            <Image alt='electronicSymbol' src={electronicSymbol.image} height={200} width={200} />
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="px-4 py-6 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center">{settings.copyright}
                    </span>
                    <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
                        <Link href={settings.telegram || '/'} className="text-gray-400 hover:text-gray-900">
                            <Send className='size-6' />
                            <span className="sr-only">Telegram</span>
                        </Link>
                        <Link href={settings.twitter || '/'} className="text-gray-400 hover:text-gray-900">
                            <Twitter className='size-6' />
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link href={settings.linkedin || '/'} className="text-gray-400 hover:text-gray-900">
                            <Linkedin className='size-6' />
                            <span className="sr-only">Linkedin</span>
                        </Link>
                        <Link href={settings.instagram || '/'} className="text-gray-400 hover:text-gray-900">
                            <Instagram className='size-6' />
                            <span className="sr-only">Instagram</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer