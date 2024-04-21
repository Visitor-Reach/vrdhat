'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link.js'
import { useSearchParams } from 'next/navigation'

export default function CompleteReportPage9() {
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
      <div id="cr_page9" className="relative w-full h-[100vh] grid grid-cols-2 overflow-hidden">
        <div className="w-full h-full">
          <div className="relative left-[116px] top-[74px] w-[300px]">
            <Image src={'/Logo.svg'} alt={' '} height={600} width={600} />
          </div>

          <div className="w-4/6 relative top-40 left-32">
            <h1 className="lg:text-[60px] md:text-[60px] sm:text-[30px] text-[#050938] font-medium relative block">
              Grow Your <a className="text-[#0179FF]">Church</a> with VisitorReach
            </h1>

            <p className="2xl:text-[35px] xl:text-2xl md:text-[20px] sm:text-[20px] text-[#75778B] relative top-20">
              To learn more about VisitorReach,
              <span className="text-[#0179FF] ">
                <Link href={{ pathname: 'https://connect.visitorreach.com/digital-health-follow-up' }}>
                  schedule
                  <br />a quick 15 minute call
                </Link>
              </span>{' '}
              with our team today.
            </p>
          </div>
          <div className="relative 2xl:top-[300px] 2xl:left-32 w-[200px] xl:top-[30vh] xl:left-[20vw]">
            <Image src={'/QR.svg'} alt={' '} height={600} width={600} />
          </div>
        </div>
        <div className="relative w-full h-full">
          <div className="relative 2xl:left-[25vw] 2xl:-top-[0vh] 2xl:w-[40vw] 2xl:visible xl:visible md:hidden ">
            <Image src={'/guzman.svg'} alt={' '} height={600} width={600} />
          </div>
          <div className="relative 2xl:visible 2xl:-right-[0vw] 2xl:bottom-[0vh] 2xl:w-[20vw] xl:w-[30vw] xl:top-[40vh]  xl:right-[0vw]  md:w-[10vw]">
            <Image src={'/app_messages.svg'} alt={' '} height={600} width={600} />
          </div>
        </div>
      </div>
    </div>
  )
}
