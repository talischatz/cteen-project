"use client";

import Image from "next/image";
import React from "react";

export const Card = ({ media, index }) => {
  return (
    <div key={index} className="m-2 bg-slate-200 p-5 rounded-md">
      {media.type.startsWith("image/") ? (
        <Image
          src={media.url}
          alt={`Imagen ${index + 1}`}
          className="rounded-xl"
          width={200}
          height={150}
        />
      ) : media.type.startsWith("video/") ? (
        <video width={200} height={150} controls>
          <source src={media.url} type={media.type} />
          Tu navegador no soporta el elemento de video.
        </video>
      ) : (
        <p>Tipo de archivo no soportado</p>
      )}
    </div>
  );
};
