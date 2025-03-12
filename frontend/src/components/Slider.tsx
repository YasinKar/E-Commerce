"use client"

import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Banner } from '@/types/siteContent.types';

type SliderProps = {
  banners: Banner[]
}

const Slider: React.FC<SliderProps> = ({ banners }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation={true}
      pagination={{ clickable: true }}
      loop={true}
      slidesPerView={1}
      centeredSlides={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      className="w-full rounded-lg"
    >
      {banners.map((slide) => (
        <SwiperSlide key={slide.id}>
          <Link href={slide.url}>
            <div className="relative w-full h-[50vh]">
              {
                slide.image &&
                <Image
                  src={slide.image}
                  alt={slide.url}
                  fill
                  className="rounded-lg object-cover "
                />
              }
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider