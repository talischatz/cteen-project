"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromLocalStorage } from "@/redux/slices/userSlice";
import ReactPlayer from "react-player/youtube";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Contents } from "@/components/content/Contents";
import { AddPointsInContent } from "@/components/addPointsInContent/AddPointsInContent";
import { selectIsSuccessModalVisible } from "@/redux/slices/bannerContentSlice";
import BannerContents from "@/components/bannerContents/BannerContents";

export default function ContentsPage() {
  const dispatch = useDispatch();
  const isSuccessModalVisible = useSelector(selectIsSuccessModalVisible);

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  return (
    <div className="relative">
      {isSuccessModalVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <BannerContents />
        </div>
      )}
  
      <div className="">
        <div className="text-center">
          <p className="text-4xl text-primary font-semibold">
            Contenidos
          </p>
        </div>
        <div className="flex justify-end m-12">
          <AddPointsInContent/>
        </div>
        <div>
          <Contents />
        </div>
      </div>
    </div>
  );
}