'use client'

import React from 'react'
import { Product } from '@/types/product.types'
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from './ProductCard'

type ProductSliderProps = {
    products: Product[]
    title: string
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products, title }) => {
    return (
        <section className='section'>
            <h2 className='title'>{title}</h2>
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation={true}
                loop={true}
                slidesPerView={1}
                spaceBetween={20}
                centeredSlides={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: true,
                }}
                breakpoints={{
                    '@0.00': {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    '@0.75': {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    '@1.00': {
                        slidesPerView: 4,
                    },
                    '@1.50': {
                        slidesPerView: 5,
                    },
                }}
                className="relative w-full rounded-lg"
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default ProductSlider