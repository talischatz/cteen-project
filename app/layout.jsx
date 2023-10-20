import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Poppins } from "next/font/google";
import MobileNavbar from "@/components/navbar/MobileNavbar";
import ReduxProvider from "./provider";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <title>Cteen Uruguay</title>
      </head>
      <ReduxProvider>
        <body className={poppins.className}>
          <Navbar />
          <MobileNavbar />
          {children}
        </body>
      </ReduxProvider>
    </html>
  );
}
