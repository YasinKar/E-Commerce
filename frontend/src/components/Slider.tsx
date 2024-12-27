"use client"
import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Slider as SliderType } from "@/types/slider.type";

const sliders: SliderType[] = [
  {
    id: 1,
    url: 'https://google.com',
    image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
  },
  {
    id: 2,
    url: 'http://localhost:3000',
    image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
  },
  {
    id: 3,
    url: 'http://localhost:3000',
    image: 'https://random-image-pepebigotes.vercel.app/api/random-image',
  },
]

const Slider = () => {
  return (
    <div className="container mt-10">
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
        className="relative w-full rounded-lg"
      >
        {sliders.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link href={slide.url}>
              <div className="relative w-full h-[50vh]">
                <Image
                  src={slide.image}
                  alt={slide.url}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  priority
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Slider