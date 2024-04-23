import '../globals.css'

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
  title: 'Visitor Reach - Digital Health Assessment Tool',
  description: 'Created for Visitor Reach',
}

export default function UserLayout({ children }) {
  return (
    <div>
      <Image
        src={'VR Logo Small.svg'}
        className="absolute top-10 -left-20 h-5 phone:h-5 phone:top-5 phone:left-0"
        alt="VR Logo"
        width={500}
        height={500}
      />

      {children}
    </div>
  )
}
