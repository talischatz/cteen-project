'use client'

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

export default function ImageCarousel() {
  return (
    <div className="relative shadow-2xl w-full md:w-[90%] mx-auto">
        <Carousel
          autoPlay
          infiniteLoop
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          interval={8000}
          stopOnHover={true}
        >
          <div>
            <Image
              src={require('@/public/cteen-1.jpeg')}
              alt="slider-1-carousel"
              className='rounded'
            />
          </div>
          <div>
            <Image
              src={require('@/public/cteen-2.jpeg')}
              alt="slider-1-carousel"
              className='rounded'
            />
          </div>
          <div>
            <Image
              src={require('@/public/cteen-3.jpeg')}
              alt="slider-1-carousel"
              className='rounded'
            />
          </div>
        </Carousel>
      </div>
  )
}
