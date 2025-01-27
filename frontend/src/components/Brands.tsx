'use client'

import React from 'react'
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Brand } from '@/types/brand.types'
import Link from 'next/link';
import Image from 'next/image';

type BrandsProps = {
  brands: Brand[]
}

const Brands: React.FC<BrandsProps> = ({ brands }) => {
  return (
    <section className='section'>
      <h2 className='title'>Popular Brands</h2>
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
        {brands.map((brand) => (
          <SwiperSlide key={brand.id}>
            <Link href={`products/?brand=${brand.slug}`}>
              <div className='w-full p-2 sm:p-4 border border-gray-300 rounded-lg shadow-lg space-y-2'>
                <Image
                  alt={brand.name}
                  src={brand.logo}
                  width={1000}
                  height={1000}
                  className='w-full h-[150px] sm:h-[180px] object-cover rounded-lg'
                />
                <p className='text'>{brand.name}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Brands