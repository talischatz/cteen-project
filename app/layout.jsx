import Navbar from '@/components/navbar/Navbar';
import './globals.css';
import { Poppins } from 'next/font/google';
import MobileNavbar from '@/components/navbar/MobileNavbar';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        <MobileNavbar />
        {children}
        </body>
    </html>
  );
}
