'use client';

import { useState } from 'react';
import ProductCard from '../product-card/ProductCard';
import { ProductsData } from '@/constants/ProductsList';
import ProductModal from '../product-modal/ProductModal';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectedGroupedProducts,
  triggerShoppingCartModal,
} from '@/redux/slices/shoppingCartSlice';

const ProductsList = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const groupedProducts = useSelector(selectedGroupedProducts);
  const dispatch = useDispatch();

  const onGoToShoppingCartClick = () => {
    dispatch(triggerShoppingCartModal(true));
  };

  return (
    <div className="relative">
      <div className="flex gap-10 flex-wrap pt-10 pb-20 items-center justify-center">
        {ProductsData.map(({ title, price, image, id }) => (
          <ProductCard
            key={id}
            title={title}
            price={price}
            image={image}
            onClick={() => setSelectedProduct({ title, price, image, id })}
          />
        ))}
      </div>
      <div
        className={cn(
          'sticky bottom-[64px] left-0 flex items-center justify-center w-full bg-white py-3 md:hidden',
          !groupedProducts.length && 'hidden'
        )}
      >
        <Button
          className="w-4/5 flex gap-2"
          onClick={onGoToShoppingCartClick}
        >
          <span>Ir al carrito</span>
          <ShoppingCart size={16} />
        </Button>
      </div>
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default ProductsList;
