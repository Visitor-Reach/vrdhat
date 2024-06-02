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
  const id = searchParams.get('id')
  const map = searchParams.get('map_key')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append('Access-Control-Allow-Origin', '*')
        const response = await fetch(process.env.NEXT_PUBLIC_API_ROOT + '/api/fetch-data/' + id, {
          method: 'GET',
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
        id="cr_page4"
        className="relative min-w-[1920px] w-[1920px] min-h-[1080px] h-[1080px] m-auto grid grid-cols-9 grid-rows-2 justify-center bg-white overflow-hidden"
      >
        <div className="absolute left-[40px] top-[77px] w-[200px] z-[1000]">
          <Image src={'/full_report_logo.svg'} alt={' '} height={400} width={400} />
        </div>
        <div className="relative col-span-2 row-span-2 menu-shadow">
          <div>
            <NavBar id={id} map={map} page={4}></NavBar>
          </div>
        </div>
        <div className="col-span-7 row-span-2 bg-[#F9FCFD] pt-[90px] pl-[130px] overflow-hidden">
          <div className="flex items-center w-full gap-[20px]">
            <div className="flex flex-col justify-end pb-[30px] w-[376px] h-[430px]  bg-[url('/Bounds.png')] bg-cover rounded-3xl card-shadow">
              <h1 className="text-white w-[319px] ml-[20px] text-[32px] font-medium leading-[130%] tracking-[-1.2px]">
                People in the U.S. search for “churches near me” over <a className="text-[#0179FF]">1 million </a>times
                each month
              </h1>
            </div>

            <div className="w-[376px] h-[430px] bg-[url('/sample_map.png')] bg-cover rounded-3xl pt-[40px] pl-[30px] card-shadow">
              <h1 className="text-[#050938] w-[319px] text-[32px] font-medium leading-[130%] tracking-[-1.2px]">
                Nearly <a className="text-[#0179FF]">2 billion </a>people use Google Maps every month
              </h1>
            </div>

            <div className="flex flex-col items-center w-[453px] h-[430px] pt-[40px] rounded-3xl card-blue-shadow">
              <div className="flex items-center gap-[20px]">
                <div className="w-[40px]">
                  <Image src={'/google_maps.svg'} alt={' '} height={400} width={400} />
                </div>
                <h1 className="text-[30px] font-medium text-[#050938] w-[267px] leading-[115%] tracking-[-1.2px]">
                  Your Google Maps Search Score
                </h1>
              </div>
              <div className="mt-[40px]">
                <Circularbar value={googleMaps} title={undefined} max_value={125} />
              </div>
            </div>
          </div>

          <div className="flex items-center w-full gap-[20px] mt-[25px]">
            <div className="rounded-3xl w-[772px] h-[430px] large-card-shadow">
              <div className="w-[120px] m-auto mt-[25px]">
                <Image className="w-[177px]" src={'/img-ct3-page3.png'} alt={' '} height={400} width={400} />
              </div>
              <h1 className="mt-[20px] text-[#050938] w-[500px] text-[32px] font-medium text-center m-auto leading-[130%] tracking-[-1.2px]">
                What is your <a className="text-[#0179FF]">Digital Maps </a>Score & Why it’s Important
              </h1>
              <h2 className="mt-[20px] text-[#75778B] w-[716px] text-[20px] font-[400] text-center m-auto leading-[143%] tracking-[-0.8px]">
                From where we eat to where we visit, digital maps are more important in our lives than ever before. The
                Digital Maps Score reflects how likely your church is to show up on these digital navigation apps when
                someone searches for “churches near me,” If your church information isn’t listed correctly, they won’t
                find you.
              </h2>
            </div>

            <div className="flex flex-col items-center w-[453px] h-[430px] pt-[40px] rounded-3xl card-blue-shadow">
              <div className="flex items-center gap-[20px]">
                <div className="w-[40px]">
                  <Image className="w-[177px]" src={'/apple_mps.svg'} alt={' '} height={400} width={400} />
                </div>
                <h1 className="text-[30px] font-medium text-[#050938] w-[267px] leading-[115%] tracking-[-1.2px]">
                  Your Apple Maps Search Score
                </h1>
              </div>
              <div className="mt-[40px]">
                <Circularbar value={appleMaps} title={undefined} max_value={125} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
