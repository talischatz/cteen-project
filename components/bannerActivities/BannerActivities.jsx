"use client";

import { AnimatePresence, motion } from "framer-motion";
import { XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "@/redux/slices/userSlice";

function BannerActivities() {
  const [showPointsBanner, setShowPointsBanner] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPointsBanner(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const user = useSelector(selectUserData);

  return (
    <AnimatePresence>
      {showPointsBanner && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="max-w-full md:max-w-[1268px] w-full px-4 py-6 border border-green-400 bg-green-200 rounded absolute top-0 left-0 md:left-auto mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-2 text-sm font-semibold justify-center items-center">
            <span>
              ¡Felicitaciones <span className="text-primary">{user.name}</span>!
            </span>
            <span>
              Has ganado <span className="text-primary">500</span> puntos
            </span>
            <span>Por subir una actividad 😊 🚀.</span>
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

export default BannerActivities;
