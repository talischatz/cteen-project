import Link from 'next/link';
import React from 'react';
import ImageCarousel from '../carousel/Carousel';

function AboutUs() {
  return (
    <div className="flex items-center gap-10 h-full flex-col md:flex-row">
      <div className="max-w-[500px] w-full h-full flex flex-col">
        <h2 className="text-4xl text-primary font-semibold">Sobre nosotros</h2>
        <p className="mt-10 text-xl">
          Jóvenes judíos uruguayos de{' '}
          <Link
            href="https://www.instagram.com/jabad.uruguay/"
            alt="jabad-uruguay"
            target="_blank"
            className="text-primary hover:underline"
          >
            @jabad.uruguay
          </Link>{' '}
          y una de las 700 sedes de
          <Link
            href="https://www.instagram.com/_cteen/"
            alt="cteen-mundial"
            target="_blank"
            className="text-primary hover:underline"
          >
            @_cteen
          </Link>{' '}
          Mundial 💪🏾
        </p>
      </div>
      <ImageCarousel />
    </div>
  );
}

export default AboutUs;
