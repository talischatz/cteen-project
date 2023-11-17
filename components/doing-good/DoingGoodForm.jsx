"use client";

import Image from 'next/image'
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Lottie from "lottie-react";
import animationData from "@/public/animations/doing-good-animation.json";
import { useRef, useState } from "react";
import ModalDoingGood from "../successful-doingGood-modal/ModalDoingGood";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "@/firebase";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import BannerDoingGood from '../bannerDoingGood/BannerDoingGood';
import { setUser } from '@/redux/slices/userSlice';
import { useDispatch } from 'react-redux';



export default function DoingGoodForm({ onUploadSuccess }) {
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null); 
  const [isErrorPopupVisible, setIsErrorPopupVisible] = useState(false);
  const dispatch = useDispatch();

  const lottieRef = useRef(null);
  const form = useForm({
    defaultValues: {
      upload_file: null,
    },
    shouldFocusError: false,
  });

  async function uploadFile(file) {
    const storageRef = ref(storage, `Posts DoingGood/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    try {
      await uploadTask;
      const url = await getDownloadURL(storageRef);
      console.log("Archivo subido con éxito. URL de descarga:", url);
      const media = {
        type: file.type, 
        url: url,
      };
      onUploadSuccess(media); 
      return media; 
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      setIsErrorPopupVisible(true); 
      return null;
    }
  }

  async function updateUserPoints() {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const currentPoints = userData.points;
  
        await updateDoc(userDocRef, {
          points: currentPoints + 500,
        });

        dispatch(setUser({ ...userData, points: currentPoints + 500 }));
  
        localStorage.setItem('userData', JSON.stringify({ ...userData, points: currentPoints + 500 }));
  
        console.log('Puntos del usuario actualizados con éxito.');
      } else {
        console.error("El documento del usuario no existe en Firestore.");
      }
    } else {
      console.error("Usuario no autenticado");
    }
  }
  

  async function onSubmit(values) {
    if (values.upload_file && values.upload_file[0]) {
      const media = await uploadFile(values.upload_file[0]);
      if (media) {
        updateUserPoints();
        setIsSuccessModalVisible(true);
      } else {
        console.error("Error al subir el archivo.");
      }
    } else {
      setIsErrorPopupVisible(true); 
    }
  }

  return (
    <div className="flex h-full justify-center items-center mt-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-4 max-w-[464px] p-[23px] w-full  relative h-full border border-gray-100 shadow-lg"
        >
          <div className="flex flex-col items-center justify-center">
            <Lottie
              animationData={animationData}
              loop={false}
              className="w-60 h-60 mx-auto"
              lottieRef={lottieRef}
              onComplete={() => lottieRef.current.goToAndStop(19, true)}
            />
            <p className="text-primary font-semibold text-2xl">
              Continue doing good
            </p>
          </div>
          <FormField
            control={form.control}
            name="upload_file"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Subir archivo</FormLabel>
                <FormControl className="cursor-pointer">
                  <Input
                    placeholder="Cargar archivo"
                    type="file"
                    onChange={(e) => {
      
                      form.setValue("upload_file", e.target.files);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full">
            <Button type="submit" className="w-full">
              Subir archivo
            </Button>
          </div>

          {/* Muestra la URL de descarga si está disponible */}
          {downloadURL && (
            <div className="mt-4 text-center">
              <p className="font-semibold text-primary">
                URL de descarga del archivo subido:
              </p>
              <a href={downloadURL} target="_blank" rel="noopener noreferrer">
                {downloadURL}
              </a>
            </div>
          )}
        </form>
      </Form>
      {isSuccessModalVisible && (
        <BannerDoingGood onClose={() => setIsSuccessModalVisible(false)} />
      )}
            {isErrorPopupVisible && (
        <ModalDoingGood onClose={() => setIsErrorPopupVisible(false)} />
      )}
    </div>
  );
}
