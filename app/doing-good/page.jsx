"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadUserFromLocalStorage } from "@/redux/slices/userSlice";
import DoingGoodForm from "@/components/doing-good/DoingGoodForm";
import { Card } from "@/components/card/Card";
import BannerDoingGood from "@/components/bannerDoingGood/BannerDoingGood";
import { getDownloadURL, ref, listAll } from "firebase/storage";
import { storage } from "@/firebase";

export default function DoingGoodPage() {
  const dispatch = useDispatch();
  const [uploadedMedia, setUploadedMedia] = useState([]);

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
    fetchMediaFromFirebaseStorage();
  }, [dispatch]);

  const fetchMediaFromFirebaseStorage = async () => {
    const storageRef = ref(storage, "Posts DoingGood");
    const mediaList = await listAll(storageRef);
  
    const mediaData = await Promise.all(
      mediaList.items.map(async (item) => {
        const url = await getDownloadURL(item);
        const type = item.name.endsWith(".mp4") ? "video/mp4" : "image/jpeg"; 
        return { url, type };
      })
    );
  
    setUploadedMedia(mediaData);
  };

  const handleUploadSuccess = () => {

    fetchMediaFromFirebaseStorage();
  };

  return (
    <div className="full-container flex flex-col mb-52">
      <div className="text-4xl text-primary font-semibold mt-8 text-center">
        Doing Good
      </div>
      <DoingGoodForm onUploadSuccess={handleUploadSuccess} />
      <div className="flex flex-wrap justify-center mt-4 rounded-xl bg-slate-400 p-4">
        {uploadedMedia.map((media, index) => (
          <Card key={index} media={media} index={index} />
        ))}
      </div>
    </div>
  );
}
