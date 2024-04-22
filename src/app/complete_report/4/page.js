'use client'

import React, { useEffect, useState } from 'react'

import Circularbar from '../../../app/components/Circularbar1.js'
import Image from 'next/image'
import Link from 'next/link.js'
import NavBar from '../components/navbar.js'
import Summary from '../../../app/components/ScoreSummarySimple.js'
import { useSearchParams } from 'next/navigation'

export default function CompleteReportPage4() {
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
        const response = await fetch('http://localhost:8080/api/fetch-data', {
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
      <div id="cr_page4" className="relative w-full h-[100vh] grid grid-cols-9 grid-rows-2 justify-center bg-white">
        <div className="absolute left-[40px] top-[77px] w-[200px] ">
          <Image src={'/full_report_logo.svg'} alt={' '} height={400} width={400} />
        </div>
        <div className="relative col-span-2 row-span-2 ">
          <div style={{ zoom: 0.8 }}>
            <NavBar user_key={user_key} map={map}></NavBar>
          </div>
        </div>
        <div className="relative col-span-2">
          <div className="w-[16vw] h-[40vh]  bg-[url('/Bounds.png')] bg-cover border-2 rounded-3xl relative top-[10vh] left-[5vw]">
            <h1 className="relative top-[10vh] text-white w-2/3 ml-10 text-[26px] font-medium">
              People in the U.S. search for “churches near me” over <a className="text-[#0179FF]">1 million </a>times
              each month
            </h1>
          </div>
        </div>
        <div className="relative  col-span-2 ">
          <div className="w-[18vw] h-[40vh] bg-[url('/sample_map.png')] bg-cover rounded-3xl shadow-2xl relative top-[10vh]">
            <h1 className="relative  top-[10vh] text-[#050938] w-2/3 ml-10 text-[26px] font-medium">
              Nearly <a className="text-[#0179FF]">2 billion </a>people use Google Maps every month
            </h1>
          </div>
        </div>
        <div className="relative col-span-2 h-[40vh] w-11/12  rounded-3xl shadow-2xl top-[10vh] -left-[3vw]">
          <div className="flex">
            <div className="relative top-10 left-5 w-[40px]">
              <Image src={'/google_maps.svg'} alt={' '} height={400} width={400} />
            </div>
            <h1 className="relative top-8 left-12 text-[20px] font-medium text-[#050938] w-4/6">
              Your Google Maps Search Score
            </h1>
          </div>
          <div className="relative m-auto grid justify-center top-10">
            <Circularbar value={googleMaps} title={undefined} max_value={250} />
          </div>
        </div>
        <div className="relative "></div>
        <div className="relative col-span-4 justify-center justify-items-center shadow-2xl rounded-3xl w-[35vw] left-[5vw] top-[1vh] h-[40vh]">
          <div className="relative top-5 w-[120px] m-auto">
            <Image src={'/pin_map.svg'} alt={' '} height={400} width={400} />
          </div>
          <h1 className="relative top-6 text-[#050938] w-2/3 left-0 text-[22px] font-medium text-center m-auto">
            What is your <a className="text-[#0179FF]">Digital Maps </a>Score & Why it’s Important
          </h1>
          <h2 className="relative top-12 text-[#75778B] w-11/12 left-0 text-[14px] font-medium text-center m-auto">
            From where we eat to where we visit, digital maps are more important in our lives than ever before. The
            Digital Maps Score reflects how likely your church is to show up on these digital navigation apps when
            someone searches for “churches near me,” If your church information isn’t listed correctly, they won’t find
            you.
          </h2>
        </div>
        <div className="relative col-span-2 h-[40vh] -left-[3vw] top-[3vh] w-11/12  rounded-3xl shadow-2xl">
          <div className="flex">
            <div className="relative top-10 left-5 w-[45px]">
              <Image src={'/apple_mps.svg'} alt={' '} height={400} width={400} />
            </div>
            <h1 className="relative top-8 left-14 text-[20px] font-medium text-[#050938] w-3/6">
              Your Apple Maps Search Score
            </h1>
          </div>
          <div className="relative m-auto grid justify-center top-10">
            <Circularbar value={appleMaps} title={undefined} max_value={250} />
          </div>
        </div>
      </div>
    </div>
  )
}
