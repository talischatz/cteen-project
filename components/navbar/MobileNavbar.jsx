'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import { BiLogOutCircle } from 'react-icons/bi';
import Link from 'next/link';
import { NavbarLinks } from '@/constants/NavbarLinks';
import { useSelector } from 'react-redux';
import { selectUserData } from '@/redux/slices/userSlice';
import ShoppingCartModal from '../shopping-cart-modal/ShoppingCartModal';
import ShoppingCartComponent from '../shoppingCart/ShoppingCart';
import { auth } from '@/firebase';

function MobileNavbar() {
  const userData = useSelector(selectUserData);
  const router = useRouter();

  const handleLogout = async () => {
    try {
        await auth.signOut();
        localStorage.removeItem('userData');
        console.log('Sesión cerrada');
        window.location.href = '/'; 
    } catch (error) {
        console.log('Error al cerrar sesión:', error);
    }
}

  const [showCartModal, setShowCartModal] = useState(false);

  const pathname = useRouter().pathname;

  if (!userData.isAuthenticated) {
    return null;
  }

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
        <Link href="https:www.facebook.com/jabad.uruguay" target="_blank">
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
        <ShoppingCartComponent />
        <BiLogOutCircle
          size={25}
          className="cursor-pointer hover:text-primary transition-all ease-in-out duration-300"
          onClick={handleLogout}
        />
      </div>
      <ShoppingCartModal />
    </>
  );
}

export default MobileNavbar;