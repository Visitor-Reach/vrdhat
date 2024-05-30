import '../../globals.css'

import { Inter } from 'next/font/google'
import { Poppins } from 'next/font/google'
import { Suspense } from 'react'

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

export default function DataLayout({ children }) {
  return (
      <div className={`${poppins.className} antialiased bg-gray-100 flex h-[100vh]`}>
        <Suspense>{children}</Suspense>
      </div>
  )
}
