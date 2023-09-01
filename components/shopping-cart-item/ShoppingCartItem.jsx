import Image from 'next/image'
import React from 'react'

function ShoppingCartItem({product}) {
  return (
    <div className="flex py-1 px-3 border-l-2 border-l-primary gap-4 items-center">
      <div className="flex gap-2 items-center">
        <p className="text-primary text-sm">{product.quantity}</p>
        <span className="text-[10px] text-gray-300 font-semibold">X</span>
        <span className="text-[10px] text-gray-300 font-semibold">
          {product.price}
        </span>
      </div>
      <Image
        src={product.image}
        alt="product-item"
        className="w-8 h-8 rounded-full"
      />
      <p className='text-sm'>{product.title}</p>
    </div>
  );
}

export default ShoppingCartItem
