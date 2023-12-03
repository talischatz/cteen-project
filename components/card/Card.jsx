import Image from "next/image";
import React from "react";

export const Card = ({ media, index }) => {
  console.log("URL del medio:", media.url);

  return (
    <div key={index} className="m-2 bg-slate-500 p-5 rounded-md">
      {media.type && (
        <>
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
        </>
      )}
    </div>
  );
};
