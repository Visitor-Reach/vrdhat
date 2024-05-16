'use client'

import './3.css'

import React, { useEffect, useState } from 'react'

import Circularbar from '../../../app/components/Circularbar1.js'
import Image from 'next/image'
import Link from 'next/link.js'
import NavBar from '../components/navbar.js'
import Summary from '../../../app/components/ScoreSummarySimple.js'
import { useSearchParams } from 'next/navigation'

export default function CompleteReportPage3() {
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
  const map = searchParams.get('map_key')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append('Access-Control-Allow-Origin', '*')
        const response = await fetch(process.env.NEXT_PUBLIC_API_ROOT + '/api/fetch-data', {
          method: 'POST',
          body: JSON.stringify({ user_key: user_key }),
          headers: myHeaders,
        })

        const data = await response.json()

        set_church_name(data.church_name)
        setDigitalVoice(data.digitalVoice)
        setAppleMaps(data.appleMaps)
        setGoogleMaps(data.googleMaps)
        setsocialClarity(data.socialClarity)
        setwebsiteAuthority(data.websiteAuthority)
        setvrVoice(data.vrVoice)
        setvrMaps(data.vrMaps)
        setvrSocial(data.vrSocial)
        setvrWebsite(data.vrWebsite)
        set_last_month_searches(data.last_month_searches)
        setLoc_city(data.loc_city)
        setLoc_address(data.loc_address)
        setLoc_zipcode(data.loc_zipcodesetLoc_ziploc_zipcode)
        setLoc_state(data.loc_state)
        setWebpage(data.website)
        console.log('Sucess fetching data: ', data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="">
      <div
        id="cr_page3"
        className="relative min-w-[1920px] w-[1920px] min-h-[1080px] h-[1080px] m-auto grid grid-cols-9 justify-center bg-white overflow-hidden"
      >
        <div className="absolute left-[40px] top-[77px] w-[200px] z-[1000]">
          <Image src={'/full_report_logo.svg'} alt={' '} height={400} width={400} />
        </div>
        <div className="relative col-span-2 row-span-2 menu-shadow">
          <div>
            <NavBar user_key={user_key} map={map} page={3}></NavBar>
          </div>
        </div>
        <div className="col-span-7 row-span-2 bg-[#F9FCFD] pt-[90px] pl-[130px] overflow-hidden ">
          <div className="flex">
            <div className="flex flex-col">
              <div className="bg-white w-[797px] h-[430px] rounded-3xl m-auto card-shadow py-[35px]">
                <div className="m-auto w-[120px]">
                  <Image src={'/homepod.svg'} alt={' '} height={400} width={400} />
                </div>
                <h1 className="mt-[16px] font-medium text-[32px] text-[#050938] w-full text-center m-auto leading-[115%] tracking-[-1.28px]">
                  What Is <a className="text-[#0179FF]">Voice Search</a> & Why It’s Important
                </h1>
                <h2 className="mt-[16px] font-medium text-[20px] text-[#75778B] w-[658px] text-center m-auto leading-[143%] tracking-[-0.8px]">
                  Voice technology allows people to perform a hands-free search by asking questions to their smart
                  devices such as smartphones, smart speakers, and in-car systems. Your church’s Digital Voice Score
                  shows how optimized your digital presence is when it comes to showing up in voice search results.
                </h2>
              </div>

              <div className="bg-white w-[797px] h-[430px] rounded-3xl m-auto card-shadow bg-[url('/woman-background.png')] bg-cover overflow-hidden">
                <div className="w-[797px] h-[430px] pt-[100px] page-3-box-gradient">
                  <h1 className="text-white w-2/3 ml-10 text-[80px] font-bold">57%</h1>
                  <h2 className="text-white w-[253px] ml-10 text-[20px] leading-[143%] tracking-[-0.8px]">
                    of American adults use voice assistants on their devices to find out information on a daily basis.
                  </h2>
                  <h3 className="text-white w-2/3 ml-10 mt-[40px] text-[14px]">Source: NPR</h3>
                </div>
              </div>
            </div>
            <div className="flex ml-[20px]">
              <div className=" w-[453px] h-[880px] rounded-3xl ml-[0px] py-[66px] vertical-card-shadow">
                <h1 className="text-[#050938] w-[353px] m-auto text-center font-[570] text-[32px] justify-center justify-items-center leading-[115%] tracking-[-1.3px]">
                  Your Digital Voice Score
                </h1>
                <div className="m-auto grid justify-center mt-[30px]">
                  <Circularbar value={digitalVoice} title={undefined} max_value={250} />
                </div>
                <div className="m-auto grid justify-center mt-[50px] w-[110px]">
                  <Image src={'/2p_church.svg'} alt={' '} height={400} width={400} />
                </div>
                <h1 className="text-[#050938] text-[24px] font-medium m-auto grid justify-center mt-[40px] leading-[115%] tracking-[-0.9px]">
                  Only 2% of churches
                </h1>
                <h2 className="text-[#75778B] text-[20px] font-regular m-auto grid justify-center w-5/6 mt-[40px] leading-[143%] tracking-[-0.8px] text-center">
                  are optimized for voice search. If your church’s digital presence isn’t optimized for voice search,
                  people won’t be able to find and visit your church!
                </h2>

                <Link href={{ pathname: 'https://www.visitorreach.com' }}>
                  <h3 className="text-[#0179FF] text-[12px] font-regular m-auto grid justify-center w-4/6 mt-[40px] pb-10">
                    Source: VisitorReach
                  </h3>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
