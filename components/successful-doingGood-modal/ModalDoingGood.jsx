import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';

const ModalDoingGood = ({ onClose }) => {
  const router = useRouter();

  // const handleGoToHome = () => {
  //   router.push('/home');
  //   onClose(); 
  // };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.7 }}
        className="bg-white p-8 rounded shadow-lg flex flex-col items-center "
      >
        <div className="flex items-center justify-between mb-4 w-full">
          <h2 className="text-primary text-2xl font-semibold">¡Imagen subida con exito!</h2>
          <XCircle className="text-primary cursor-pointer" size={30} onClick={onClose} />
        </div>
        <p>Gracias por hacer el bien 🤗</p>
        {/* <button className="bg-primary text-white px-4 py-2 rounded mt-4" onClick={handleGoToHome}>
          volver al inicio
        </button> */}
      </motion.div>
    </motion.div>
  );
};

export default ModalDoingGood;
