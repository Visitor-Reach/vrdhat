'use client'

import './1.css'

import React, { useEffect, useState } from 'react'

import Circularbar from '../../../app/components/Circularbar1.js'
import Image from 'next/image'
import Link from 'next/link.js'
import NavBar from '../components/navbar.js'
import Summary from '../../../app/components/ScoreSummarySimple.js'
import { useSearchParams } from 'next/navigation'

export default function CompleteReportPage1() {
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
    <div
      id="cr_page1"
      className="relative min-w-[1920px] w-[1920px] min-h-[1080px] h-[1080px] m-auto bg-white overflow-hidden"
    >
      <div className="">
        <div className="mt-[93px] ml-[71px]">
          <Image
            className="w-[339px] h-[42px]"
            src={'/full_report_logo.svg'}
            alt={'visitorreach logo'}
            height={400}
            width={400}
          />
        </div>
        <div className="absolute right-[0px] top-[445px] bg-clip-content">
          <Image className="h-[630px] w-full" src={'/Omnichannel.png'} alt={' '} height={700} width={1000} />
        </div>

        <h2 className="mt-[168px] ml-[78px] text-[60px] font-medium text-[#0179FF] inline-block bg-clip-text">
          Digital Health Assessment
        </h2>
        <h1 className="ml-[74px] mt-[-30px] p-[0] text-[140px] text-black text-[65px] font-medium">{church_name}</h1>
        <div className="">
          <div className="flex items-center gap-[18px] ml-[78px] mt-[18px]">
            <div className="w-[21.8px]">
              <Image src={'/location_icon.svg'} alt={' '} height={400} width={400} />
            </div>
            <p className="text-[#75778B] text-[30px] font-medium">
              {loc_address}, {loc_city}, {loc_state} {loc_zipcode}
            </p>
          </div>
          <div className="flex items-center gap-[18px] ml-[78px] mt-[18px]">
            <div className="w-[23.8px] text-[#75778B] text-[30px] font-medium">
              <Image src={'/website_icon.svg'} alt={' '} height={400} width={400} />
            </div>
            <p className="text-[#75778B] text-[30px] font-medium">{webpage}</p>
          </div>
        </div>
        <p className="block w-full mt-[318px] ml-[78px] text-[#75778B] text-[24px] font-medium">
          {' '}
          Assessment performed on <a className="font-semibold">{today.toDateString()}</a>{' '}
        </p>
      </div>
    </div>
  )
}
