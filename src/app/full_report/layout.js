import { Inter } from "next/font/google";
import "../globals.css";
import { Poppins } from "next/font/google";
import Image from 'next/image'

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"]
});

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <div>
          {children}
    </div>
    
  );
}
