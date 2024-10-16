import { Inter } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Suspense } from "react";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"]
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Visitor Reach - Digital Health Assessment Tool",
  description: "Created for Visitor Reach",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      {/*<script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/44122818.js"></script>*/}

      <body className={`${poppins.className} antialiased `} >
        <Suspense>
           {children}
        </Suspense>
       
        </body>
    </html>
  );
}
