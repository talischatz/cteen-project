"use client";


import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUserFromLocalStorage } from '@/redux/slices/userSlice'; 
import ReactPlayer from "react-player/youtube";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Contents } from '@/components/content/Contents';

export default function ContentsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  return (
    <div>
      <div>
        <p className="text-4xl text-primary font-semibold mt-8 text-center">
          Contenidossss
        </p>
        <Contents/>
      </div>
    </div>
  );
}
