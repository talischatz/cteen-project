'use client';

import { NavbarLinks } from '@/constants/NavbarLinks';
import {
  selectedGroupedProducts,
  triggerModal,
} from '@/redux/slices/shoppingCartSlice';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartModal from '../shopping-cart-modal/ShoppingCartModal';

function MobileNavbar() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const cartProductsQty = useSelector(selectedGroupedProducts).length;

  const onShoppinCartClick = () => {
    dispatch(triggerModal(true));
  };

  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 z-50 flex h-[55px] w-full py-8 items-center justify-around border-t border-gray-300 bg-white transition-transform duration-[400ms] ease-in-out dark:border-none dark:bg-[#191919]">
        {NavbarLinks.map(({ href, Icon, label }, index) => (
          <Link href={href} key={index}>
            <div className="navbar-link flex flex-col items-center gap-1">
              <Icon
                className={`h-5 w-5 ${
                  pathname === href ? 'text-primary' : 'text-gray-400'
                }`}
              />
              <span
                className={`text-[10px] ${
                  pathname === href ? 'font-bold text-primary' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex gap-4 items-center text-[#666] absolute top-4 right-4 lg:hidden">
        <Link href="https://www.facebook.com/jabad.uruguay" target="_blank">
          <FaFacebookSquare
            size={24}
            className="cursor-pointer hover:text-primary transition-all ease-in-out duration-300"
          />
        </Link>
        <Link href="https://www.instagram.com/cteenuruguay/" target="_blank">
          <FaInstagram
            size={24}
            className="cursor-pointer hover:text-primary transition-all ease-in-out duration-300"
          />
        </Link>
        <div className="relative">
          <div className="h-[14px] w-[14px] rounded-full bg-primary absolute -top-1 -right-1 flex items-center justify-center">
            <span className="text-[8px] text-gray-600 font-bold">
              {cartProductsQty}
            </span>
          </div>
          <ShoppingCart
            size={20}
            className="cursor-pointer hover:text-primary transition-all ease-in-out duration-300"
            onClick={onShoppinCartClick}
          />
        </div>
      </div>
      <ShoppingCartModal />
    </>
  );
}

export default MobileNavbar;
