'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

export default function CompleteReportPage2() {
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
    <div className="">
      <div id="cr_page2" className="relative w-full h-[100vh] bg-[url('/img-bg-page1.png')] bg-cover">
        <div className="relative w-full h-[100vh] bg-gradient-to-br from-white from-10% to-white/30">
          <h1 className="absolute left-[107px] top-[110px] text-[#050938] text-[75px] font-medium w-4/6">
            Did you know there are <span className="text-[#0179FF]">{last_month_searches} monthly</span> Google searches
            for “churches near me” in{' '}
            <span className="text-[#0179FF]">
              {loc_city}, {loc_state}
            </span>
            ?
          </h1>
          <h2 className="absolute left-[107px] bottom-60 text-[#292A36] text-[40px] font-regular w-4/6">
            How many of those seekers find your church?
          </h2>
        </div>
        <div className="absolute right-[100px] bottom-[70px] w-[239px]">
          <Image src={'/full_report_logo.svg'} alt={' '} height={400} width={400} />
        </div>
      </div>
    </div>
  )
}
