'use client';

import {
  isModalOpen,
  selectedGroupedProducts,
  triggerModal,
} from '@/redux/slices/shoppingCartSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { PackagePlus, XCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartItem from '../shopping-cart-item/ShoppingCartItem';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { selectUserData } from '@/redux/slices/userSlice';

function ShoppingCartModal() {
  const groupedProducts = useSelector(selectedGroupedProducts);
  const isModalShowing = useSelector(isModalOpen);
  const [showInsuficientPointsBanner, setShowInsuficientBanner] = useState(false)
  const totalProducts = groupedProducts.reduce(
    (acc, product) => (acc += product.quantity),
    0
  );
  const totalCost = groupedProducts.reduce(
    (acc, product) => (acc += product.quantity * product.price),
    0
  );
  const dispatch = useDispatch();
  const user = useSelector(selectUserData)

  const onModalClose = () => {
    dispatch(triggerModal(false));
  };

  const onBuyConfirmation = () => {
    if(totalCost <= user.points) dispatch(triggerModal(false));
    else setShowInsuficientBanner(true)
    console.log(groupedProducts);
  };

  return (
    <AnimatePresence>
      {groupedProducts && isModalShowing && (
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
            className="bg-white p-4 overflow-y-auto relative rounded flex flex-col h-fit w-[350px] shadow-md"
          >
            <div className="p-2 flex flex-col">
              <div className="flex items-center w-full justify-between">
                <h2 className="text-primary text-2xl font-semibold">
                  Mi carrito
                </h2>
                <XCircle
                  className="text-primary cursor-pointer"
                  size={30}
                  onClick={onModalClose}
                />
              </div>
              <div className={cn(groupedProducts.length <= 0 && 'hidden')}>
                <p className="text-base text-gray-400 font-medium mt-4">{`Total de productos: ${totalProducts}`}</p>
                <div className="flex flex-col space-y-2 mt-6 gap-4">
                  {groupedProducts.map((product) => (
                    <ShoppingCartItem key={product.id} product={product} />
                  ))}
                </div>
                <div className="mt-8 h-0.5 w-[90%] bg-primary mx-auto"></div>
                <div className="text-sm font-medium text-gray-400 flex gap-1 mt-6">
                  <span>Total:</span>
                  <span className="text-primary font-semibold">
                    {totalCost}
                  </span>
                </div>
                {showInsuficientPointsBanner && (
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="w-full px-4 py-4 border border-red-400 bg-red-200 rounded text-sm text-gray-600 relative mt-6"
                  >
                    Ups! 😅 No tienes los puntos necesarios para comprar estos
                    productos, intenta quitando algunos.
                    <button
                      onClick={() => setShowInsuficientBanner(false)}
                      className="absolute top-2 right-2 text-red-600 hover:text-red-700"
                    >
                      <XCircle size={16} />
                    </button>
                  </motion.div>
                )}
                <Button className={cn("w-full mt-8", showInsuficientPointsBanner && 'bg-gray-400 cursor-not-allowed pointer-events-none')} disabled={showInsuficientPointsBanner} onClick={onBuyConfirmation}>
                  Comprar
                </Button>
              </div>
              <div
                className={cn(
                  'w-full h-80 flex justify-center items-center flex-col gap-6',
                  groupedProducts.length > 0 && 'hidden'
                )}
              >
                <PackagePlus size={35} />
                <span>No hay productos en el carrito</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ShoppingCartModal;
