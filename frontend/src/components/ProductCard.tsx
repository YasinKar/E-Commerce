import React from 'react'
import { Product as ProductType } from '../types/product.types'
import Link from 'next/link'
import { Eye, Heart, ShoppingCart } from 'lucide-react'
import './css/ProductCard.css'
import Image from 'next/image'

type ProductCardProps = {
    product: ProductType
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="card text-center p-2 sm:p-4 border border-gray-300 rounded-lg shadow-sm relative space-y-1">
            <div className="flex justify-center items-center">
                <Image width={1000} height={1000} src={product.image} alt={product.name} className="rounded-lg object-cover h-[170px] sm:h-[200px] w-full" />
            </div>

            <div className="flex items-center justify-center">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    {
                        Array.from({ length: product.stars }).map((star, index) => (
                            <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20" key={index}>
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        ))
                    }
                    {
                        Array.from({ length: (5 - product.stars) }).map((star, index) => (
                            <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20" key={index}>
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        ))
                    }
                </div>
            </div>

            <h3 className="text-black text-lg font-bold">{product.name}</h3>
            <p className="text-black">{product.price}</p>

            <div className="card-detail h-0 absolute bottom-0 left-0 right-0 overflow-hidden">
                <div className="flex flex-col items-center justify-center h-full space-y-5 font-medium text-xs sm:text-base">
                    <button className='flex justify-center items-center w-[90%] transition-colors text-white bg-sky-500 hover:bg-sky-600 py-2 rounded-lg'>
                        Add To Cart<ShoppingCart className='ms-1' />
                    </button>
                    <button className='flex justify-center items-center w-[90%] transition-colors text-sky-500 border border-sky-500 hover:bg-sky-500 hover:text-white py-2 rounded-lg'>
                        Wishlist<Heart className='ms-1' />
                    </button>
                    <Link href={`product/${product.slug}`} className='flex justify-center items-center w-[90%] transition-colors text-sky-500 border border-sky-500 hover:bg-sky-500 hover:text-white py-2 rounded-lg'>
                        See Details<Eye className='ms-1' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProductCard