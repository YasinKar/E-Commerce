'use client'

import { Product } from '@/types/product.types'
import { addOrder } from '@/utils/actions/cart.actions'
import { ShoppingCart, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

type ProductDetailProps = {
    product: Product
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
    const [currentImage, setCurrentImage] = useState<string>(product.image)

    const [quantity, setQuantity] = useState<number>(1)

    const handleAddOrder = async (id: number, count: number) => {
        try {
            const res = await addOrder(id, count)
            Swal.fire({
                title: 'Added Order',
                text: Object.values(res)[0] as string,
                icon: 'success',
                confirmButtonText: 'Done'
            })
        } catch (error: any) {
            Swal.fire({
                title: 'Unsuccessful',
                text: error?.message,
                icon: 'error',
                confirmButtonText: 'Done'
            })
        }
    }

    return (
        <div>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap -mx-4">
                    {/* <!-- Product Images --> */}
                    <div className="w-full md:w-1/2 px-4 mb-8">
                        <Image src={currentImage} alt={product.name} width={1000} height={1000} className="w-full h-auto rounded-lg shadow-md mb-4" id="mainImage" />
                        <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                            {
                                product.images.map(image => (
                                    <Image
                                        key={image.id}
                                        src={image.image}
                                        alt={`${product.name}_${image.id}`}
                                        width={1000}
                                        height={1000}
                                        className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                        onClick={() => setCurrentImage(image.image)}
                                    />
                                ))
                            }
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={1000}
                                height={1000}
                                className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                onClick={() => setCurrentImage(product.image)}
                            />
                        </div>
                    </div>

                    {/* <!-- Product Details --> */}
                    <div className="w-full md:w-1/2 px-4">
                        <h2 className="text-3xl text-black font-bold mb-2">{product.name}</h2>
                        <div className="mb-4">
                            <span className="text-2xl font-bold mr-2 text-black">${product.price}</span>
                            <span className="text-gray-500 line-through">${product.discounted_price}</span>
                        </div>
                        <div className="flex items-center mb-4">
                            {
                                Array.from({ length: product.stars }).map((star, index) => (
                                    <svg className="w-6 h-6 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20" key={index}>
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                ))
                            }
                            {
                                Array.from({ length: (5 - product.stars) }).map((star, index) => (
                                    <svg className="w-6 h-6 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20" key={index}>
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                ))
                            }
                            <span className="ml-2 text-gray-600">({product.comments.length} reviews)</span>
                        </div>
                        <p className="text-gray-700 mb-6">{product.description}</p>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2 text-black">Color:</h3>
                            <div className="flex space-x-2">
                                {
                                    product.colors?.map(color => (
                                        <button key={color.id} style={{ backgroundColor: color.color_code }} className="w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"></button>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity:</label>
                            <input type="number" id="quantity" name="quantity" min="1" value={quantity} onChange={e => setQuantity(parseInt(e.target.value, 10))}
                                className="w-12 text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        </div>

                        <div className="flex space-x-4 mb-6">
                            <button
                                onClick={() => handleAddOrder(product.id, quantity)}
                                className="bg-sky-500 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all">
                                <ShoppingCart />
                                Add to Cart
                            </button>
                            <button
                                className="border-2 border-sky-500 flex gap-2 items-center  text-sky-500 px-6 py-2 rounded-md hover:bg-sky-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                                <Heart />
                                Wishlist
                            </button>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2 text-black">Product Tags:</h3>
                            <ul className="list-disc list-inside text-gray-700">
                                {
                                    product.tags?.map(tag => (
                                        <li key={tag.id}><Link className='link' href={`/search?value=${tag.tag}`}>{tag.tag}</Link></li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <h3 className="text-lg font-bold text-black">Product Information</h3>
                    <ul className="mt-4 divide-y">
                        {
                            product.information.map(info => (
                                <li className="font-medium flex justify-between items-center p-2" key={info.id}>
                                    <span>{info.key}</span>
                                    <span>{info.value}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail