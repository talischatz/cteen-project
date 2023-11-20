import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import animationData from '@/public/animations/success-animation.json';
import { useRef } from 'react';
import ShoppingCartItem from '../shopping-cart-item/ShoppingCartItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  emptyCart,
  selectedGroupedProducts,
  triggerCompletedPurchaseModal,
} from '@/redux/slices/shoppingCartSlice';
import { selectUserData } from '@/redux/slices/userSlice';
import { Button } from '@/components/ui/button';

function CompletedPurchaseModal({ totalCost }) {
  const animationRef = useRef(null);
  const groupedProducts = useSelector(selectedGroupedProducts);
  const user = useSelector(selectUserData);
  const dispatch = useDispatch();

  const userPointsLeft = user.points;

  const onCloseModalClick = () => {
    dispatch(triggerCompletedPurchaseModal(false));
    dispatch(emptyCart())
  };

  return (
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
        <div className="flex w-full items-center justify-between">
          <p className="text-xl">¡Compra realizada!</p>
          <Lottie
            animationData={animationData}
            lottieRef={animationRef}
            loop={false}
            className="w-24 h-24"
          />
        </div>
        <div className="mt-6">Adquiriste los siguientes productos:</div>
        <div className="flex flex-col space-y-2 mt-10 gap-4">
          {groupedProducts.map((product) => (
            <ShoppingCartItem
              key={product.id}
              product={product}
              simplifiedVariant
            />
          ))}
        </div>
        <div className="mt-10 text-primary text-base flex gap-1 items-center">
          <span className="text-black">Usaste un total de </span>
          <div className="flex gap-1">
            <span>{totalCost}</span>
            <span className="text-black">puntos</span>
          </div>
        </div>
        <div className="text-primary text-xs flex gap-1 items-center">
          <span className="text-gray-400">{`(Te quedan un total de `}</span>
          <div className="flex gap-1">
            <span>{userPointsLeft}</span>
            <span className="text-gray-400">{`puntos)`}</span>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="w-full px-4 py-4 border border-gray-400 bg-gray-200 rounded text-sm text-gray-600 relative mt-6 flex flex-col"
        >
          <span>
            Recibirás un mail 📧 con la descripción de tu compra y las
            indicaciones de envío/retiro.
          </span>
        </motion.div>
        <Button className="mt-10" onClick={onCloseModalClick}>
          Cerrar
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default CompletedPurchaseModal;
