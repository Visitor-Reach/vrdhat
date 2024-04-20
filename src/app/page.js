"use client"
import React from "react";
import Image from 'next/image'
import "./globals.css";
import Link from 'next/link'
import Pdf from 'react-to-pdf';
import { useRef, useState } from 'react';

export default function Home() {
  const ref = useRef();
  return (
    <div className="h-[100vh]" >
      <div className = "relative left-[-700px] top-16 w-[320px]">
          <Image
          src={"Logo.svg"}
          alt="VR Logo"
          width={500}
          height={500}
          />
      </div>
      <div className="">
        <div style={{position: "absolute", right: "-300px", bottom:"-450px", overflow: "hidden"}}>
          <Image
                  className=""
                  src="Radial waves.svg"
                  alt="Picture of the author" 
                  width={1200}
                  height={1200}
                />
        </div>
        <div style={{position: "absolute", right: "0px", bottom:"0px", overflow: "hidden"}}>   
              <Image
                  className=""
                  src="page1_church.svg"
                  alt="Picture of the author" 
                  width={500}
                  height={500}
                />
         </div>     
      </div>  
      <div className="">  
        <h1 className="md:text-7xl sm:text-6xl text-black	 text-left font-medium absolute top-48 left-20">Discover your Church’s</h1> 
        <h1 className="md:text-7xl sm:text-6xl text-[#0179FF]	 text-left font-medium absolute top-72  left-20 ">Digital Health Score</h1>
      </div>
      <div className="relative top-[400px] left-[90px] w-1/3">
              <p className="  text-black text-[22px]">Can people in your community find your church? This tool was designed to help churches check their overall digital health and discoverability. Complete the form with your church’s information and receive a free Digital Health Assessment in your email.</p>    

              <div className="relative top-24">
                <Link href="/form">
                  <button className="text-2xl font-medium text-white rounded-full hover:bg-white bg-gradient-to-br from-vr-button-first via-vr-button-second to-vr-button-third hover:text-vr-button-third  h-16 w-48">
                    
                      Get Started
                    
                    
                  </button>
                </Link>
              </div>
              
              
            </div>
    </div>
  );
}

