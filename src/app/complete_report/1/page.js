'use client'

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
    <div id="cr_page1" className="relative w-full h-[100vh] bg-white overflow-hidden">
      <div className="">
        <div className="absolute left-[71px] top-[93px]">
          <Image src={'/full_report_logo.svg'} alt={' '} height={400} width={400} />
        </div>
        <div className="absolute right-[0px] top-[426px] w-1/2 bg-clip-content">
          <Image src={'/Omnichannel.png'} alt={' '} height={700} width={1000} />
        </div>

        <h2 className="absolute left-[78px] top-[303px] text-[60px] font-medium bg-gradient-to-br from-[#6ECAF8] via-[#0179FF] via-50% to-[#2246E2] inline-block text-transparent bg-clip-text">
          Digital Health Assessment
        </h2>
        <h1 className="absolute left-[71px] top-[381px] text-black text-[90px] font-medium">
          The Father's House - Vacaville
        </h1>
        <div className="">
          <div className="">
            <div className="absolute left-[89px] top-[574px] w-[21px]">
              <Image src={'/location_icon.svg'} alt={' '} height={400} width={400} />
            </div>
            <p className="absolute left-[129px] top-[560px] text-[#75778B] text-[30px] font-medium">
              {loc_address}, {loc_city}, {loc_state} {loc_zipcode}
            </p>
          </div>
          <div className="absolute left-[89px] top-[625px] w-[23px] text-[#75778B] text-[30px] font-medium">
            <Image src={'/website_icon.svg'} alt={' '} height={400} width={400} />
          </div>
          <p className="absolute left-[129px] top-[615px] text-[#75778B] text-[30px] font-medium">{webpage}</p>
        </div>
        <p className="block w-full absolute left-[89px] bottom-[100px] text-[#75778B] text-[20px] font-medium">
          {' '}
          Assessment performed on <a className="font-semibold">{today.toDateString()}</a>{' '}
        </p>
      </div>
    </div>
  )
}
