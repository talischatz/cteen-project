import React from "react";
import Image from "next/image";
import acercadedar from '../../public/content/acercadedar.png';
import alturismo from '../../public/content/alturismo.png';
import cambiar from '../../public/content/cambiar.png';
// import cansado from '../../public/content/cansado.png';
import costoso from '../../public/content/costoso.png';
import creciendo from '../../public/content/creciendo.png';
import decisiones from '../../public/content/decisiones.png';
import desafiante from '../../public/content/desafiante.png';
import destino from '../../public/content/destino.png';
import disciplinado from '../../public/content/disciplinado.png';
import escuela from '../../public/content/escuela.png';
// import grandesplanes from '../../public/content/grandesplanes.png';
import hambrientas from '../../public/content/hambrientas.png';
import labordeamor from '../../public/content/cambiar.png';
import maestros from '../../public/content/maestros.png';
import manzal from '../../public/content/manzal.png';
import nobel from '../../public/content/Nobel.png';
import pleno from '../../public/content/pleno.png';
import poderoso from '../../public/content/poderoso.png';
import prefacio from '../../public/content/prefacio.png';
// import principalobjetivo from '../../public/content/principalobjetivo.png';
import rebe from '../../public/content/rebe.png';
import regalo from '../../public/content/regalo.png';
import saludable from '../../public/content/saludable.png';
import semillasdesabiduria from '../../public/content/semillasdesabiduria.png';
import senderos from '../../public/content/senderos.png';
import sobreviviente from '../../public/content/sobreviviente.png';
import vela from '../../public/content/vela.png';

const images = [
  { src: acercadedar, alt: 'acercadedar', link: 'https://open.spotify.com/episode/23qDK7KpRGjk4AsR5lwpv2?si=2bebe8b2b45a41f4' },
  { src: alturismo, alt: 'alturismo', link: 'https://open.spotify.com/episode/4rTE4KyhKdLu43x4loNT9O?si=009a6b108d2e4574' },
  { src: cambiar, alt: 'cambiar', link: 'https://open.spotify.com/episode/7ifnyvo5fSgjbBCBvIXgd7?si=1e76d2fb847d460a' },
  // { src: cansado, alt: 'cansado' },
  { src: costoso, alt: 'costoso', link: 'https://open.spotify.com/episode/6oJefGJKcwtc3pU7wC72Ta?si=c30a084a24e54233' },
  { src: creciendo, alt: 'creciendo', link: 'https://open.spotify.com/episode/2uxtmSFHaYXdxVM7Thd70H?si=f7abf9f7e4684210' },
  { src: decisiones, alt: 'decisiones', link: 'https://open.spotify.com/episode/4r5NjqgYbuFeVDNvxBQ07h?si=4fe8f5deea6541c5' },
  { src: desafiante, alt: 'desafiante', link: 'https://open.spotify.com/episode/4KliNmi65lCcdtY6Qw3l1M?si=c9118ae19edb4ba3' },
  { src: destino, alt: 'destino', link: 'https://open.spotify.com/episode/5jxpEDuyVRhxncIvxtQuCJ?si=c40137d3718344f0' },
  { src: disciplinado, alt: 'disciplinado', link: 'https://open.spotify.com/episode/7lg8IMCygl1IhrBq9cQHL1?si=2cea1b3fa9c44321' },
  { src: escuela, alt: 'escuela', link: 'https://open.spotify.com/episode/5hWFUqbuqxwOfMfRXIIrBD?si=2b40751aadeb4f59' },
  // { src: grandesplanes, alt: 'grandesplanes' },
  { src: hambrientas, alt: 'hambrientas', link: 'https://open.spotify.com/episode/1zzIMbnCsuLmkzAEouPSWQ?si=5f187ae77e8f41df' },
  { src: labordeamor, alt: 'labordeamor', link: 'https://open.spotify.com/episode/7qhdROd7FGQo8FURai0lTf?si=cdc3a44b66444c80' },
  { src: maestros, alt: 'maestros', link: 'https://open.spotify.com/episode/2wYlshviJdRNt3BJh7hv5F?si=9a35a5fd9c4e4255' },
  { src: manzal, alt: 'manzal', link: 'https://open.spotify.com/episode/5pCOljTQulenhYBt8In9PI?si=6d306543b3cc4e71' },
  { src: nobel, alt: 'nobel', link: 'https://open.spotify.com/episode/5JpRT6fci0FyPM0SpCIpyu?si=43dab61def3d4fc2' },
  { src: pleno, alt: 'pleno', link: 'https://open.spotify.com/episode/0Xm122sga2tbcVKVqDZSC9?si=b8b2238ed0354ec4' },
  { src: poderoso, alt: 'poderoso', link: 'https://open.spotify.com/episode/6xDDXgxojWiCbRuKzOD8h1?si=85194af3fd764f2a' },
  { src: prefacio, alt: 'prefacio', link: 'https://open.spotify.com/episode/7srHdMeTxR84YsSCbtVhSq?si=77e843163ae149f4' },
  // { src: principalobjetivo, alt: 'principalobjetivo' },
  { src: rebe, alt: 'rebe', link: 'https://open.spotify.com/episode/0zvXYqwoG5ivJu5tRapE0I?si=b8b4997975914d9b' },
  { src: regalo, alt: 'regalo', link: 'https://open.spotify.com/episode/6cDnGL3pjSt2Ty58UqkOVO?si=057d4b9ec73441ca' },
  { src: saludable, alt: 'saludable', link: 'https://open.spotify.com/episode/3LlQaRCvV953IKNKWJzW1r?si=bdc4f122d764439a' },
  { src: semillasdesabiduria, alt: 'semillasdesabiduria', link: 'https://open.spotify.com/episode/0Wf51AWUNThids1SUpipZd?si=747099d4f9d64e42' },
  { src: senderos, alt: 'senderos', link: 'https://open.spotify.com/episode/5D9jdJHIBajsbkoK9xMLeQ?si=cc1a646ff3ef4137' },
  { src: sobreviviente, alt: 'sobreviviente', link: 'https://open.spotify.com/episode/4J9d67XjEOUkZGpnu8vxa5?si=aa912f6c71a74b77' },
  { src: vela, alt: 'vela', link: 'https://open.spotify.com/episode/2B6mDZ78AVvFbpDJuYybbF?si=5541f6ecf9774d46' },
];

export const Contents = () => {
  return (
    <div className="p-4 mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {images.map((image, index) => (
        <a
          key={index}
          href={image.link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group overflow-hidden"
        >
          <Image
            src={image.src}
            alt={image.alt}
            className="transform scale-100 group-hover:scale-110 transition-transform duration-300 ease-in-out"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 ease-in-out"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            <p className="text-white text-center"><b>Escuchar podcasts y sumar puntos</b></p>
          </div>
        </a>
      ))}
    </div>
  );
};


