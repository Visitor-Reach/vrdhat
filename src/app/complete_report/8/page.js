'use client'

import './8.css'

import Image from 'next/image'
import NavBar from '../components/navbar.js'
import React from 'react'

export default function CompleteReportPage8() {
  return (
    <div className="">
      <div
        id="cr_page8"
        className="relative min-w-[1920px] w-[1920px] min-h-[1080px] h-[1080px] m-auto grid grid-cols-9 grid-rows-2 justify-center bg-white overflow-hidden"
      >
        <div className="absolute left-[40px] top-[77px] w-[200px] z-[1000]">
          <Image src={'/full_report_logo.svg'} alt={' '} height={400} width={400} />
        </div>
        <div className="relative col-span-2 row-span-9 menu-shadow">
          <div>
            <NavBar page={8}></NavBar>
          </div>
        </div>
        <div className="col-span-7 row-span-2 bg-[#F9FCFD] pt-[80px] pl-[80px] overflow-hidden">
          <div className="relative z-[2000]">
            <h1 className="text-[#0179FF] text-[48px] font-[500]">
              <span className="text-[#0179FF]">VisitorReach™</span>
              <a className="text-[#050938]">—Your Digital Outreach Platform</a>
            </h1>
            <h2 className="mt-[50px] text-[24px] font-regular text-[#050938] w-[1178px] leading-[143%] tracking-[-0.9px]">
              VisitorReach is much more than just a website optimization platform or advertising agency. It’s a digital
              outreach program empowering pastors to have continual and consistent 1:1 SMS{' '}
              <a className="text-[#0179FF]">conversations with seekers and new people to your city</a>. Churches that
              partner with VisitorReach average 40–160 new conversations every month and see new visitors walking
              through their doors every week.
            </h2>
            <div className="flex justify-items-center gap-20 mt-[50px]">
              <div className="w-[500px] bg-white rounded-2xl py-[20px] w-[609px] page-8-shadow-box">
                <div className="w-full">
                  <Image
                    className="m-auto w-[187px]"
                    src={'/the_fathers_house.png'}
                    alt={' '}
                    height={2000}
                    width={2000}
                  />
                </div>
                <p className="text-[#050938] text-[20px] m-auto mt-[20px] italic font-[300] text-center w-[530px] leading-[130%] tracking-[-0.8px]">
                  "We had new people responding within hours, and we had people showing up to youth and weekend service
                  within one week."
                </p>
                <p className="text-[#050938] m-auto mt-[50px] text-[20px] italic font-[500] text-center leading-[130%] tracking-[-0.8px]">
                  —The Father's House, Vacaville CA
                </p>
              </div>

              <div className="w-[500px] rounded-2xl bg-white py-[20px] w-[609px] page-8-shadow-box">
                <div className="w-full">
                  <Image className="m-auto w-[164px]" src={'/jesus_culture.png'} alt={' '} height={2000} width={2000} />
                </div>
                <p className="text-[#050938] text-[20px] m-auto mt-[20px] italic font-[300] text-center w-[530px] leading-[130%] tracking-[-0.8px]">
                  "Our team loves the simplicity of the VisitorReach platform. It is so easy to use the app, and the
                  aiChurchTech assistance makes it so easy to stay up-to-date with all our new visitors."
                </p>
                <p className="text-[#050938] m-auto mt-[50px] text-[20px] italic font-[500] text-center leading-[130%] tracking-[-0.8px]">
                  —Jesus Culture, Sacramento, CA
                </p>
              </div>
            </div>

            <h1 className="text-[#050938] text-[48px] font-[500] mt-[50px] leading-[115%] tracking-[-1.9px]">
              The VisitorReach Process -
            </h1>
            <h1 className="text-[48px] font-[500] leading-[115%] tracking-[-1.9px] text-[#0179FF]">
              Created for Pastors, by Pastors
            </h1>
          </div>
          <div className="relative z-[1000]">
            <Image
              className="w-[1400px] mt-[-300px] max-w-[none]"
              src={'/timeline.png'}
              alt={' '}
              height={2000}
              width={2000}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
