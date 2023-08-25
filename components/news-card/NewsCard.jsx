'use client'

import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';

function NewsCard({ id, image, title, content, onClick }) {
  return (
    <motion.div
      className="flex flex-col h-full w-[400px] shadow-md rounded border border-gray-100 cursor-pointer overflow-x-hidden group"
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
    >
      <Image src={image} alt="sample" className="w-full rounded-t" />
      <div className="flex flex-col p-5">
        <div className="text-gray-600 text-2xl font-bold line-clamp-1">
          {title}
        </div>
        <p className="mt-2 text-gray-400 text-base line-clamp-5">{content}</p>
        <div className="mt-5 w-full items-center justify-end flex gap-2 opacity-0 -translate-x-[40%] group-hover:opacity-100 group-hover:translate-x-0 group-hover:transition-all group-hover:ease-in-out group-hover:duration-500">
          <p className="text-sm font-semibold text-primary">Leer más</p>
          <MoveRight className="text-primary" />
        </div>
      </div>
    </motion.div>
  );
}

export default NewsCard;
