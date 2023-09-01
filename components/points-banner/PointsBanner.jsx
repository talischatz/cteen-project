'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function PointsBanner() {
  const [showPointsBanner, setShowPointsBanner] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowPointsBanner(false);
    }, 10000);
  }, []);

  return (
    <AnimatePresence>
      {showPointsBanner && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="max-w-full md:max-w-[1268px] w-full px-4 py-6 border border-green-400 bg-green-200 rounded absolute top-0 left-0 md:left-auto mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-1 md:gap-2 text-sm font-semibold">
            <span>
              ¡Felicitaciones <span className="text-primary">Joaquin!</span>
            </span>
            <span>
              Has ganado <span className="text-primary">3000</span> puntos 🚀.
            </span>
            <span>
              Puedes utilizarlos para obtener cosas en el store de Cteen
            </span>
          </div>
          <button
            onClick={() => setShowPointsBanner(false)}
            className="absolute top-2 right-2 text-green-600 hover:text-green-700"
          >
            <XCircle size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PointsBanner;
