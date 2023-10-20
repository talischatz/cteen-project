import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';

const ModalRegistration = ({ onClose }) => {
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
        className="bg-white p-4 rounded shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-primary text-2xl font-semibold">Registro Exitoso</h2>
          <XCircle className="text-primary cursor-pointer" size={30} onClick={onClose} />
        </div>
        <p>Tu usuario se ha creado exitosamente. ¡Bienvenido!</p>
      </motion.div>
    </motion.div>
  );
};

export default ModalRegistration;
