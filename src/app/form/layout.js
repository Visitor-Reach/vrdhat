import { Inter } from "next/font/google";
import "../globals.css";
import { Poppins } from "next/font/google";
import Image from 'next/image'
import './layout.css';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"]
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function FormLayout({ children }) {
  return (
    <div className='layout-container'>
        <Image
          src={"VR Logo Small.svg"}
          className="mt-100 h-5"
          alt="VR Logo"
          width={500}
          height={500}
          /> 
          
          {children}
    </div>
    
  );
}
