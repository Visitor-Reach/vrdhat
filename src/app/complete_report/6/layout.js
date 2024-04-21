import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import Image from 'next/image'
import { Suspense } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"]
});

const inter = Inter({ subsets: ["latin"] });


export default function CompletePage6Layout({ children }) {
  return (
    <>
      <Suspense>
        {children}
      </Suspense>
          
    </>
  );
}
