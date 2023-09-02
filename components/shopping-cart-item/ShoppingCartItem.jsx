'use client';

import { cn } from '@/lib/utils';
import { removeOrDecreaseProduct } from '@/redux/slices/shoppingCartSlice';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';

function ShoppingCartItem({ product, simplifiedVariant = false }) {
  const dispatch = useDispatch();

  return (
    <div className={cn("flex py-1 px-3 border-l-2 border-l-primary items-center justify-between")}>
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <p
            className={cn(
              'text-primary text-sm',
              simplifiedVariant && 'text-base'
            )}
          >
            {product.quantity}
          </p>
          <span
            className={cn(
              'text-[10px] text-gray-300 font-semibold',
              simplifiedVariant && 'hidden'
            )}
          >
            X
          </span>
          <span
            className={cn(
              'text-[10px] text-gray-300 font-semibold',
              simplifiedVariant && 'hidden'
            )}
          >
            {product.price}
          </span>
        </div>
        <Image
          src={product.image}
          alt="product-item"
          className="w-8 h-8 rounded-full"
        />
        <p className="text-sm">{product.title}</p>
      </div>
      <div
        className={cn('p-1 cursor-pointer', simplifiedVariant && 'hidden')}
        onClick={() => dispatch(removeOrDecreaseProduct(product))}
      >
        <Trash2 size={20} className="text-primary active:scale-[0.97]" />
      </div>
    </div>
  );
}

export default ShoppingCartItem;
