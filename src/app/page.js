'use client'

import './globals.css'

import { StyleSheet, useRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const ref = useRef()
  return (
    <div className="h-[100vh] ">
      <div className="relative left-[80px] top-16 sm:w-64 md:w-80 lg:w-96">
        <Image src="Logo.svg" alt="VR Logo" width={320} height={10} />
      </div>
      <div className="">
        <div style={{ position: 'absolute', right: '-300px', bottom: '-450px', overflow: 'hidden' }}>
          <Image className="" src="Radial waves.svg" alt="Picture of the author" width={1200} height={1200} />
        </div>
        <div style={{ position: 'absolute', right: '0px', bottom: '0px', overflow: 'hidden' }}>
          <Image className="" src="page1_church.svg" alt="Picture of the author" width={500} height={500} />
        </div>
      </div>
      <div className="">
        <h1 className="tracking-tight text-3xl lg:text-7xl md:text-5xl text-black	text-left font-medium absolute top-52 left-20">
          Discover your Church’s
        </h1>
        <h1 className="tracking-tight text-3xl lg:text-7xl md:text-5xl text-[#0179FF] text-left font-medium absolute top-72 left-20 bg-gradient-to-r from-vr-text-gradient-first to-vr-text-gradient-second inline-block text-transparent bg-clip-text pb-3 pt-3">
          Digital Health Score
        </h1>
      </div>
      <div className="relative top-[400px] left-[90px] w-2/3">
        <p className="text-black text-[24px]">
          Can people in your community find your church? This tool was designed to help churches check their overall
          digital health and discoverability. Complete the form with your church’s information and receive a free
          Digital Health Assessment in your email.
        </p>

        <div className="relative top-24">
          <Link href="/form">
            <button className="text-2xl font-medium text-white rounded-full hover:bg-white bg-gradient-to-br from-vr-button-first via-vr-button-second to-vr-button-third hover:text-vr-button-third  h-16 w-48">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
