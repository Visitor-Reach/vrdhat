import '../globals.css'

import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'

import { Inter } from 'next/font/google'
import NavBar from '../components/NavBar'
import { Poppins } from 'next/font/google'
import { Suspense } from 'react'
import { UserProvider } from '@auth0/nextjs-auth0/client'

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

export default withPageAuthRequired(
  async function DataLayout({ children }) {
    const { user } = await getSession()
    if (user['https://login.visitorreach.com/roles']?.includes('Super Admin') === false) {
      return (
        <main className="flex min-h-screen text-center flex-col p-24">
          <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">Unauthorized</div>
        </main>
      )
    }
    return (
      <UserProvider>
        <NavBar />
        <div className={`${poppins.className} antialiased bg-gray-100 flex h-full`}>
          <Suspense>{children}</Suspense>
        </div>
      </UserProvider>
    )
  },
  {
    returnTo: '/data'
  }
)
