import React from 'react'

const ProductCard = () => {
    return (
        <div className="card text-center p-2 border border-gray-300 m-1 rounded-lg shadow-lg relative overflow-hidden">
            <div className="w-full flex justify-center items-center">
                <img src={props.product.image} alt={props.product.name} className="rounded-lg object-cover h-[170px]  w-[170px]" />
            </div>

            <div className="flex items-center mt-2 justify-center">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    {
                        Array.from({ length: props.product.stars }).map((star, index) => (
                            <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20" key={index}>
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        ))
                    }
                    {
                        Array.from({ length: (5 - props.product.stars) }).map((star, index) => (
                            <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20" key={index}>
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        ))
                    }
                </div>
            </div>

            <h2 className="text-neutral-800 text-lg font-bold mt-2">{props.product.name}</h2>
            <p className="text-neutral-700">{props.product.price}</p>

            <div className="card-detail h-0 absolute bottom-0 left-0 right-0 ">
                <div className='flex flex-col items-center h-full'>

                    <div className="mt-24 flex flex-col text-center items-center">
                        <button onClick={() => handleAddToCart(props.product.id, 1)} className='bg-sky-500 px-8 py-2 rounded-lg text-white inline-flex items-center ms-2'>
                            افزودن به سبد<FaShoppingCart className='ms-1' />
                        </button>

                        <Link to={`product/${props.product.slug}`} className='link text-sky-600 font-bold hover:underline mt-5 flex items-center'>مشاهده محصول<FaLongArrowAltRight className='arrow ms-1' /></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard