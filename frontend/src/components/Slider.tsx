"use client"

import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Slider as SliderType } from '@/types/siteContext.types';

const Slider = ({ sliders }: { sliders: SliderType[] }) => {
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
      {sliders.map((slide) => (
        <SwiperSlide key={slide.id}>
          <Link href={slide.url}>
            <div className="relative w-full h-[50vh]">
              <Image
                src={slide.image}
                alt={slide.url}
                fill
                className="rounded-lg object-cover "
              />
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider