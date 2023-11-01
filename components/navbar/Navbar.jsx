'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NavbarLinks } from '../../constants/NavbarLinks';
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import ShoppingCartModal from '../shopping-cart-modal/ShoppingCartModal';
import { selectUserData } from '@/redux/slices/userSlice';
import ShoppingCartComponent from '../shoppingCart/ShoppingCart';
import { ButtonLogout } from '../buttonLogout/ButtonLogout';
import { useEffect } from 'react';

function Navbar() {
  const pathname = usePathname();
  const user = useSelector(selectUserData);
  // console.log(user);

  // useEffect(() => {
  //   console.log('Puntos del usuario actualizados:', user.points);
  //   // Aquí puedes realizar cualquier acción que necesites con los nuevos puntos del usuario
  // }, [user.points]);


  return (
    <div
      className={cn(
        'full-container h-[70px] min-h-full',
        (pathname === '/' || pathname === '/password-recovery') &&
          'hidden'
      )}
    >
      <div className="w-full h-full flex items-center justify-between">
        <div className="flex gap-4 items-center">
          {/* <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar> */}
          <div className="flex flex-col">
            <span className="text-gray-500 font-medium">
              {`Bienvenido, ${user.name}`}
            </span>
            <span className="text-primary text-sm font-medium">
              {`Puntos: ${user.points}`}
            </span>
          </div>
        </div>
        <nav className="lg:flex items-center gap-10 hidden">
          <ul className="flex gap-6">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.href}>
                  <div
                    className={
                      pathname === link.href
                        ? 'navbar-link-desktop-active relative'
                        : 'navbar-link-desktop relative'
                    }
                  >
                    {link.label}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-4 items-center text-[#666]">
            <Link href="https://www.facebook.com/jabad.uruguay" target="_blank">
              <FaFacebookSquare
                size={20}
                className="cursor-pointer hover:text-primary transition-all ease-in-out duration-300"
              />
            </Link>
            <Link
              href="https://www.instagram.com/cteenuruguay/"
              target="_blank"
            >
              <FaInstagram
                size={20}
                className="cursor-pointer hover:text-primary transition-all ease-in-out duration-300"
              />
            </Link>
            <ShoppingCartComponent />
          </div>
          <ButtonLogout/>
          <ShoppingCartModal />
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
