import '../globals.css'
import './layout.css'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
})

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Digital Health Assessment Tool - Visitor Reach',
  description: 'Created by Visitor Reach',
}

export default function FormLayout({ children }) {
  return (
    <div className="p-5 sm:p-5 md:p-6 lg:p-14">
      <Image
        src={'VR Logo Small.svg'}
        className="mt-5 sm:mt-10 relative left-0 w-[100px] sm:w-[150px] md:w-[200px]"
        alt="VR Logo"
        width={200}
        height={100}
      />
      {children}
    </div>
  )
}
