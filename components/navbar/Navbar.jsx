'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { NavbarLinks } from '../../constants/NavbarLinks';
import { FaFacebookSquare, FaInstagram, FaTiktok } from 'react-icons/fa';

function Navbar() {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        'full-container h-[70px] min-h-full',
        (pathname === '/session' || pathname === '/password-recovery') && 'hidden'
      )}
    >
      <div className="w-full h-full flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-gray-500 font-medium">
              Bienvenido, Joaquin
            </span>
            <span className="text-primary text-sm font-medium">
              Points: 3000
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
            <Link href="https://www.facebook.com/jabad.uruguay" target='_blank'>
              <FaFacebookSquare
                size={20}
                className="cursor-pointer hover:text-primary transition-all ease-in-out duration-300"
              />
            </Link>
            <Link href="https://www.instagram.com/cteenuruguay/" target='_blank'>
              <FaInstagram
                size={20}
                className="cursor-pointer hover:text-primary transition-all ease-in-out duration-300"
              />
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
