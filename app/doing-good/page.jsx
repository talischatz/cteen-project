"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadUserFromLocalStorage } from "@/redux/slices/userSlice";
import DoingGoodForm from "@/components/doing-good/DoingGoodForm";
import { Card } from "@/components/card/Card"; // Asegúrate de importar el componente Card correctamente
import BannerDoingGood from "@/components/bannerDoingGood/BannerDoingGood";

export default function DoingGoodPage() {
  const dispatch = useDispatch();
  const [uploadedMedia, setUploadedMedia] = useState([]);

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
    const storedMedia = localStorage.getItem("uploadedMedia");
    if (storedMedia) {
      setUploadedMedia(JSON.parse(storedMedia));
    }
  }, [dispatch]);

  const handleUploadSuccess = (media) => {
    if (media && media.type && media.url) {
      // Actualizar el estado y localStorage con el nuevo medio cargado
      const updatedMedia = [...uploadedMedia, media];
      setUploadedMedia(updatedMedia);
      localStorage.setItem("uploadedMedia", JSON.stringify(updatedMedia));
    } else {
      console.error("Error: media object is missing properties.");
    }
  };

  return (
    <div className="full-container flex flex-col">
      {/* <BannerDoingGood/> */}
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