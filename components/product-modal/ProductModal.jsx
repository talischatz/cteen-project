'use client';

'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { MinusCircle, PlusCircle, XCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectedGroupedProducts,
  setGroupedProducts,
} from '@/redux/slices/shoppingCartSlice';
import { cn } from '@/lib/utils';

function ProductModal({ product, onClose }) {
  const [productQty, setProductQty] = useState(0);
  const groupedProducts = useSelector(selectedGroupedProducts);
  const dispatch = useDispatch();

  const incrementProductQty = () => {
    setProductQty(productQty + 1);
  };

  const decrementProductQty = () => {
    if (productQty <= 0) return;
    setProductQty(productQty - 1);
  };

  useEffect(() => {
    console.log(groupedProducts);
  }, [groupedProducts]);

  const addToCart = () => {
    dispatch(setGroupedProducts({ quantity: productQty, ...product }));
    setProductQty(0);
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
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
            className="bg-white p-[23px] overflow-y-auto relative rounded flex flex-col h-fit w-[350px] shadow-md"
          >
            <div className="w-full flex absolute top-6 justify-end right-6 z-100">
              <XCircle
                className="text-primary cursor-pointer"
                size={30}
                onClick={onClose}
              />
            </div>
            <Image
              src={product.image}
              className="w-full object-cover object-center"
              alt={`${product.title}-${product.id}`}
            />
            <div className="flex flex-col pt-4 justify-between">
              <div className="font-medium text-gray-500 text-base flex justify-between items-center">
                <div className="flex flex-col gap-6">
                  <span className="text-lg">{product.title}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-thin">Precio: </span>
                    <span className="text-sm font-medium text-primary">
                      {product.price}
                    </span>
                  </div>
                </div>
                <p className="px-3 border-2 border-green-500 text-green-500 w-fit text-[10px] self-start rounded">
                  Stock
                </p>
              </div>
              <div className="mt-8 flex items-center justify-center gap-6">
                <MinusCircle
                  className={cn(
                    'text-primary cursor-pointer active:scale-[0.97]',
                    productQty <= 0 &&
                      'text-gray-400 cursor-not-allowed pointer-events-none'
                  )}
                  size={30}
                  onClick={decrementProductQty}
                />
                <span>{productQty}</span>
                <PlusCircle
                  className="text-primary cursor-pointer active:scale-[0.97]"
                  size={30}
                  onClick={incrementProductQty}
                />
              </div>
              <div className="flex flex-col mt-10">
                <Button onClick={addToCart}>Añadir al carrito</Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProductModal;
