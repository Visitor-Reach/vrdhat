'use client'

import './globals.css'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSearchParams } from 'next/navigation'

export default function Home() {
  const searchParams = useSearchParams().toString()

  return (
    <div className="relative h-[100vh] max-w-[100vw] sm:p-5 lg:p-14 overflow-x-clip bg-gradient-to-br from-sky-200 from-5% via-white to-white">
      <div className="absolute right-0 top-0 overflow-hidden">
        <div className="fixed right-[-300px] bottom-[-400px] overflow-hidden">
          <Image className="" src="Radial waves.svg" alt="background waves" width={1200} height={1200} />
        </div>
        <div className="fixed right-0 bottom-0 overflow-hidden scale-50 sm:scale-50 md:scale-75 lg:scale-100 origin-bottom-right">
          <Image className="" src="page1_church.svg" alt="background church" width={500} height={500} />
        </div>
      </div>

      <div className="relative top-2 h-14">
        <a href="https://visitorreach.com" className="inline-block">
          <Image src={'Logo-2.svg'} alt="VR Logo" width={500} height={500} className="origin-top-left scale-50" />
        </a>
      </div>

      <div className="relative m-6 mt-10 sm:mt-16">
        <h1 className="mt-2 text-3xl sm:text-5xl lg:text-6xl text-black font-medium">Discover your Church’s</h1>
        <h1 className="mt-2 text-3xl sm:text-5xl lg:text-6xl text-[#0179FF] font-medium">Digital Health Score</h1>
      </div>

      <div className="relative m-6 mt-10 sm:mt-20 sm:landscape:w-1/2">
        <p className="text-lg sm:text-xl lg:text-2xl text-black">
          Can people in your community find your church? This tool was designed to help churches check their overall
          digital health and discoverability. Complete the form with your church’s information and receive a free
          Digital Health Assessment in your email.
        </p>

        <div className="relative top-10 sm:top-20 origin-left scale-75 sm:scale-100">
          <Link href={`/form?${searchParams}`}>
            <button className="text-2xl font-medium text-white rounded-full hover:bg-white bg-gradient-to-br from-vr-button-first via-vr-button-second to-vr-button-third hover:text-vr-button-third  h-16 w-48">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
