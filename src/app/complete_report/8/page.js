'use client'

import React, { useEffect, useState } from 'react'

import Circularbar from '../../../app/components/Circularbar1.js'
import Image from 'next/image'
import Link from 'next/link.js'
import NavBar from '../components/navbar.js'
import Summary from '../../../app/components/ScoreSummarySimple.js'
import { useSearchParams } from 'next/navigation'
import './8.css';

export default function CompleteReportPage8() {
  const timeElapsed = Date.now()
  const today = new Date(timeElapsed)
  const [isLoading, setIsLoading] = useState(true)
  const [church_name, set_church_name] = useState('')
  const [digitalVoice, setDigitalVoice] = useState(0)
  const [appleMaps, setAppleMaps] = useState(0)
  const [googleMaps, setGoogleMaps] = useState(0)
  const [socialClarity, setsocialClarity] = useState(0)
  const [websiteAuthority, setwebsiteAuthority] = useState(0)
  const [vrVoice, setvrVoice] = useState(0)
  const [vrMaps, setvrMaps] = useState(0)
  const [vrSocial, setvrSocial] = useState(0)
  const [vrWebsite, setvrWebsite] = useState(0)
  const [last_month_searches, set_last_month_searches] = useState(0)
  const [loc_city, setLoc_city] = useState('')
  const [loc_zipcode, setLoc_zipcode] = useState('')
  const [loc_address, setLoc_address] = useState('')
  const [loc_state, setLoc_state] = useState('')
  const [webpage, setWebpage] = useState('')

    const searchParams = useSearchParams()
    const user_key = searchParams.get('user_key')
    const map = searchParams.get('map')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append('Access-Control-Allow-Origin', '*')
        const response = await fetch('http://localhost:8080/api/fetch-data', {
          method: 'POST',
          body: JSON.stringify({ user_key: user_key }),
          headers: myHeaders,
        })

        const data = await response.json()

            <div id="cr_page8" className='relative min-w-[1920px] w-[1920px] min-h-[1080px] h-[1080px] m-auto grid grid-cols-9 grid-rows-2 justify-center bg-white overflow-hidden'>
                <div className="absolute left-[40px] top-[77px] w-[200px] z-[1000]">
                    <Image
                        src={"/full_report_logo.svg"}
                        alt={" "}
                        height={400}
                        width={400}
                    />
                </div>
                <div className="relative col-span-2 row-span-9 menu-shadow">   
                    <div>
                        <NavBar user_key={user_key} map={map} page={8}></NavBar>
                    </div>
                    
                </div>
                <div className='col-span-7 row-span-2 bg-[#F9FCFD] pt-[80px] pl-[80px] overflow-hidden'>
                    <div className='relative z-[2000]'>
                        <h1 className='text-[#0179FF] text-[48px] font-[500]'><span className='text-[#0179FF]'>VisitorReach™</span><a className='text-[#050938]'>—Your Digital Outreach Platform</a></h1>
                        <h2 className='mt-[50px] text-[24px] font-regular text-[#050938] w-[1178px] leading-[143%] tracking-[-0.9px]'>
                            VisitorReach is much more than just a website optimization platform or advertising agency. It’s a digital outreach program empowering pastors to have continual and consistent 1:1 SMS <a className='text-[#0179FF]'>conversations with seekers and new people to your city</a>. Churches that partner with VisitorReach average 40–160 new conversations every month and see new visitors walking through their doors every week.
                        </h2>
                        <div className='flex justify-items-center gap-20 mt-[50px]'>
                            <div className="w-[500px] bg-white rounded-2xl py-[20px] w-[609px] page-8-shadow-box">
                                <div className='w-full'>
                                    <Image
                                        className='m-auto w-[187px]'
                                        src={"/the_fathers_house.png"}
                                        alt={" "}
                                        height={2000}    
                                        width={2000}
                                    />
                                </div>
                                <p className='text-[#050938] text-[20px] m-auto mt-[20px] italic font-[300] text-center w-[530px] leading-[130%] tracking-[-0.8px]'>"We had new people responding within hours, and we had people showing up to youth and weekend service within one week."</p>
                                <p className='text-[#050938] m-auto mt-[50px] text-[20px] italic font-[500] text-center leading-[130%] tracking-[-0.8px]'>—The Father's House, Vacaville CA</p>
                            </div>

                            <div className="w-[500px] rounded-2xl bg-white py-[20px] w-[609px] page-8-shadow-box">
                                <div className='w-full'>
                                    <Image
                                        className='m-auto w-[164px]'
                                        src={"/jesus_culture.png"}
                                        alt={" "}
                                        height={2000}    
                                        width={2000}
                                    />
                                </div>
                                <p className='text-[#050938] text-[20px] m-auto mt-[20px] italic font-[300] text-center w-[530px] leading-[130%] tracking-[-0.8px]'>"Our team loves the simplicity of the VisitorReach platform. It is so easy to use the app, and the aiChurchTech assistance makes it so easy to stay up-to-date with all our new visitors."</p>
                                <p className='text-[#050938] m-auto mt-[50px] text-[20px] italic font-[500] text-center leading-[130%] tracking-[-0.8px]'>—Jesus Culture, Sacramento, CA</p>
                            </div>
                        </div>

                        <h1 className='text-[#050938] text-[48px] font-[500] mt-[50px] leading-[115%] tracking-[-1.9px]'>
                            The VisitorReach Process - 
                        </h1>
                        <h1 className='text-[48px] font-[500] leading-[115%] tracking-[-1.9px] text-[#0179FF]'>Created for Pastors, by Pastors</h1>
                    </div>
                    <div className='relative z-[1000]'>
                        <Image
                            className='w-[1400px] mt-[-300px] max-w-[none]'
                            src={"/timeline.png"}
                            alt={" "}
                            height={2000}    
                            width={2000}
                        />
                    </div>
                </div>
            </div>

    fetchData()
  }, [])

  return (
    <div className="">
      <div
        id="cr_page8"
        className="relative w-full h-[100vh] grid grid-cols-9 grid-rows-9 justify-center bg-white overflow-hidden"
      >
        <div className="absolute left-[40px] top-[77px] w-[200px] ">
          <Image src={'/full_report_logo.svg'} alt={' '} height={400} width={400} />
        </div>
        <div className="relative col-span-2 row-span-9 ">
          <div style={{ zoom: 0.8 }}>
            <NavBar></NavBar>
          </div>
        </div>
        <div className="col-span-7 row-span-3 contain-strict">
          <h1 className="text-[#0179FF] text-[45px] font-medium relative left-14 top-10">
            VisitorReach™<a className="text-[#050938]">—Your Digital Outreach Platform</a>
          </h1>
          <h2 className="text-[18px] font-regular text-[#050938] relative m-auto top-20 text-center w-11/12">
            VisitorReach is much more than just a website optimization platform or advertising agency. It’s a digital
            outreach program empowering pastors to have continual and consistent 1:1 SMS{' '}
            <a className="text-[#0179FF]">conversations with seekers and new people to your city</a>. Churches that
            partner with VisitorReach average 40–160 new conversations every month and see new visitors walking through
            their doors every week.
          </h2>
        </div>
        <div className="col-span-7 row-span-2">
          <div className="flex justify-center justify-items-center gap-20">
            <div className="w-[500px] shadow-2xl rounded-2xl">
              <Image src={'/culture.svg'} alt={' '} height={800} width={800} />
            </div>
            <div className="w-[500px] shadow-2xl rounded-2xl">
              <Image src={'/house.svg'} alt={' '} height={800} width={800} />
            </div>
          </div>
        </div>
        <div className="col-span-7 row-span-4 relative left-14 top-5">
          <h1 className="text-[#0179FF] text-[30px] font-medium ">The VisitorReach Process -</h1>
          <h1 className="text-[30px] font-medium text-[#050938]">Created for Pastors, by Pastors</h1>
          <div className="w-[60vw] absolute -bottom-[40vh] left-[30vw]">
            <Image src={'/Radial waves.svg'} alt={' '} height={2000} width={2000} />
          </div>
          <div className="w-[50vw] absolute top-[14vh] left-[5vw]">
            <Image src={'/timeline.svg'} alt={' '} height={2000} width={2000} />
          </div>
          <div className="w-[9vw] absolute top-[14vh] -left-[3vw]">
            <Image src={'/walking.svg'} alt={' '} height={2000} width={2000} />
          </div>
          <div className="w-[10vw] absolute bottom-[10vh] left-[55vw]">
            <Image src={'/church_end.svg'} alt={' '} height={2000} width={2000} />
          </div>
        </div>
      </div>
    </div>
  )
}
