'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XCircle } from 'lucide-react';
import Image from 'next/image';

function NewsModal({ news, onClose }) {
  return (
    <AnimatePresence>
      {news && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4 md:px-0"
        >
          <motion.div
            initial={{ scale: 0.7, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.7, y: 50 }}
            className="max-w-2xl bg-white p-4 overflow-y-auto relative rounded"
          >
            <div className="w-full flex items-center justify-end -translate-y-2">
              <XCircle className="text-gray-600 cursor-pointer" size={30} onClick={onClose} />
            </div>
            <Image src={news.image} alt="sample" className="w-full" />
            <h2 className="text-gray-600 text-2xl font-bold line-clamp-1 mt-4">
              {news.title}
            </h2>
            <p className="mt-2 text-gray-400 text-base">
              {news.content}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NewsModal;
