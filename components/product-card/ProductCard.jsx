import Image from 'next/image';
import { Button } from '@/components/ui/button';

function ProductCard({ title, image, price, id, onClick }) {
  return (
    <div className="flex flex-col h-full w-[280px] shadow-md">
      <Image
        src={image}
        className="w-full object-cover object-center"
        alt={`${title}-${id}`}
      />
      <div className="flex flex-col p-4 justify-between">
        <div className="font-medium text-gray-500 text-base flex justify-between items-center">
          <div className="flex flex-col gap-6">
            <span className="text-lg">{title}</span>
            <div className='flex items-center gap-1'>
              <span className="text-sm font-thin">Precio: </span>
              <span className="text-sm font-medium text-primary">{price}</span>
            </div>
          </div>
          <p className="px-3 border-2 border-green-500 text-green-500 w-fit text-[10px] self-start rounded">
            Stock
          </p>
        </div>
        <div className="flex flex-col mt-14">
          <Button onClick={onClick}>Comprar</Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
