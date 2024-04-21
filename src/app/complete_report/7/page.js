'use client'

import React, { useEffect, useState } from 'react'

import Circularbar from '../../../app/components/Circularbar1.js'
import Image from 'next/image'
import NavBar from '../components/navbar.js'
import Summary from '../../../app/components/ScoreSummarySimple.js'
import { useSearchParams } from 'next/navigation'

export default function CompleteReportPage7() {
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
        const response = await fetch(NEXT_PUBLIC_API_ROOT + '/api/fetch-data', {
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
      <div id="cr_page7" className="relative w-full h-[100vh] grid grid-cols-9 grid-rows-2 justify-center bg-white">
        <div className="absolute left-[40px] top-[77px] w-[200px] ">
          <Image src={'/full_report_logo.svg'} alt={' '} height={400} width={400} />
        </div>
        <div className="relative col-span-2 row-span-2 ">
          <div style={{ zoom: 0.8 }}>
            <NavBar></NavBar>
          </div>
        </div>

        <div className="col-span-4" style={{ zoom: '0.9' }}>
          <Summary
            digitalVoiceScore={digitalVoice}
            avgDigitalVoiceScore={vrVoice}
            digitalMapsScore={googleMaps + appleMaps}
            avgDigitalMapsScore={vrMaps}
            socialClarityScore={socialClarity}
            avgSocialClarityScore={vrSocial}
            websiteAuthorityScore={websiteAuthority}
            avgWebsiteAuthorityScore={vrWebsite}
          />
        </div>

        <div className="col-span-2 row-span-2 rounded-3xl shadow-2xl justify-center justify-items-center m-auto">
          <h1 className="text-[24px] text-[#050938] relative top-16 left-0 font-medium text-center">
            Your Church’s Total Digital Health Score
          </h1>
          <div className="relative m-auto grid justify-center top-20">
            <Circularbar
              value={digitalVoice + googleMaps + appleMaps + socialClarity + websiteAuthority}
              title={undefined}
              max_value={1000}
            />
          </div>
          <h2 className="text-[#75778B] text-[16px] font-regular relative top-20 w-5/6 m-auto text-center">
            If you’re surprised by your digital health score, you are not alone. Most churches are in the same boat.
          </h2>
          <div className="relative top-24 w-[200px] m-auto">
            <Image src={'/people_im.svg'} alt={' '} height={400} width={400} />
          </div>
          <h1 className="text-[#050938] text-[22px] relative top-28 w-5/6 m-auto text-center"> 79% of churches </h1>
          <h2 className="text-[#75778B] text-[16px] font-regular relative top-36 w-5/6 m-auto  pb-56 text-center">
            feel they don’t “have a well-defined digital ministry” for engaging nonbelievers or people outside their
            church community.
          </h2>
        </div>
        <div className=""></div>
        <div className="col-span-4 bg-[url('/summary_im.webp')] bg-cover rounded-3xl shadow-2xl">
          <div className="relative w-full h-[100vh] bg-gradient-to-br from-[#050938] from-10% to-white/10 rounded-3xl">
            <h1 className="text-white text-[24px] font-regular relative top-20 -left-5 w-2/3 m-auto">
              What can your church do to improve your digital outreach strategy to engage those who are lost, hurting,
              and seeking the truth of the gospel message?
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}
