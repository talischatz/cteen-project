'use client';

import {
  selectedGroupedProducts,
  triggerShoppingCartModal,
} from '@/redux/slices/shoppingCartSlice';
import { ShoppingCart } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';

function ShoppingCartComponent() {
  const cartProductsQty = useSelector(selectedGroupedProducts).length;
  const dispatch = useDispatch();

  const onShoppinCartClick = () => {
    dispatch(triggerShoppingCartModal(true));
  };

  return (
    <div className="relative" onClick={onShoppinCartClick}>
      <div className="h-[14px] w-[14px] rounded-full bg-primary absolute -top-1 -right-1 flex items-center justify-center">
        <span className="text-[8px] text-gray-600 font-bold">
          {cartProductsQty}
        </span>
      </div>
      <ShoppingCart
        size={20}
        className="cursor-pointer hover:text-primary transition-all ease-in-out duration-300"
      />
    </div>
  );
}

export default dynamic(() => Promise.resolve(ShoppingCartComponent), {
  ssr: false,
  loading: () => <ShoppingCart size={20} />,
});
