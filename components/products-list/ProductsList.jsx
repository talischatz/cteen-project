'use client';

import { useState } from 'react';
import ProductCard from '../product-card/ProductCard';
import { ProductsData } from '@/constants/ProductsList';
import ProductModal from '../product-modal/ProductModal';

const ProductsList = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="relative">
      <div className="flex gap-10 flex-wrap pt-10 pb-20 items-center justify-center">
        {ProductsData.map(({ title, price, image, id }) => (
          <ProductCard key={id} title={title} price={price} image={image} onClick={() => setSelectedProduct({title, price, image, id})}/>
        ))}
      </div>
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)}/>
    </div>
  );
};

export default ProductsList;
