"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserFromLocalStorage } from "@/redux/slices/userSlice";
import ReactPlayer from "react-player/youtube";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Contents } from "@/components/content/Contents";
import { AddPointsInContent } from "@/components/addPointsInContent/AddPointsInContent";

export default function ContentsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  return (
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
  );
}