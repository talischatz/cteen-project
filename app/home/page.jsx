"use client";

import VideoPlayer from '@/components/video-player/VideoPlayer';
import NewsList from '@/components/news-list/NewsList';
import AboutUs from '@/components/about-us/AboutUs';
import HomeBanner from '@/components/home-banner/HomeBanner';
import PointsBanner from '@/components/points-banner/PointsBanner';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUserFromLocalStorage } from '@/redux/slices/userSlice'; 

export default function Home() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  return (
    <main className="full-container">
      <PointsBanner />
      <HomeBanner />
      <div className="mt-20 flex h-full flex-col">
        <AboutUs />
        <NewsList />
        <VideoPlayer videoUrl="https://www.youtube.com/embed/Qmb_EY9ZQmE" />
      </div>
    </main>
  );
}
