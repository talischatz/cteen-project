import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { auth, db } from '@/firebase';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import BannerContents from '../bannerContents/BannerContents';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSuccessModalVisible, setSuccessModalVisible } from '@/redux/slices/bannerContentSlice';


export const AddPointsInContent = () => {

    const isSuccessModalVisible = useSelector(selectIsSuccessModalVisible);
    const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
//   const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    const user = auth.currentUser;

    if (user) {
      const contentData = {
        description: description,
        email: user.email,
      };

      try {

        const docRef = await addDoc(collection(db, 'contents'), contentData);
        console.log('Document written with ID: ', docRef.id);


        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const currentPoints = userData.points;

          await updateDoc(userDocRef, {
            points: currentPoints + 500,
          });

        dispatch(setSuccessModalVisible(true));
          console.log('Descripción creada y puntos actualizados.');
        } else {
          console.error('El documento del usuario no existe en Firestore.');
        }
      } catch (error) {
        console.error('Error al guardar la descripción y actualizar puntos:', error);
      }
    }
    handleCloseModal();
  };

  return (
    <div className="relative">
      <button
        className="navbar-link-desktop relative py-1 px-2 border rounded transition-all ease-in-out duration-300"
        onClick={handleOpenModal}
      >
        Sumar Puntos
        <span className="absolute inset-x-0 bottom-0 h-1 bg-primary w-0 transition-all ease-in-out duration-300"></span>
      </button>

      {isModalOpen && (
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
            className="bg-white p-[23px] overflow-y-auto relative rounded flex flex-col h-fit max-w-[400px] w-full shadow-md"
          >
            <div className="p-2 flex flex-col">
              <div className="flex items-center w-full justify-between">
                <h2 className="text-primary text-2xl font-semibold">Sumar Puntos</h2>
                <XCircle
                  className="text-primary cursor-pointer"
                  size={30}
                  onClick={handleCloseModal}
                />
              </div>
              <div>
                <p className="text-base text-gray-400 font-medium mt-4">Ingrese una descripción contandonos sobre el podscats que escuchaste
                para sumar puntos ✅</p>
                <textarea
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border p-2 mt-2 w-full"
                />
                <Button
                  className="w-full mt-8 flex items-center gap-3"
                  onClick={handleConfirm}
                >
                  {isLoading && <Loader2 className="animate-spin" />}
                  Enviar Descripcion
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
       {/* {isSuccessModalVisible && <BannerContents onClose={() => setIsSuccessModalVisible(false)} />} */}
    </div>
  );
};
