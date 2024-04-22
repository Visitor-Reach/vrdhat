'use client'

import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import ScoreSummary from '../components/ScoreSummary'
import { useSearchParams } from 'next/navigation'

export default function SimpleResult() {
  const [isLoading, setIsLoading] = useState(true)
  const [church_name, set_church_name] = useState('')
  const [digitalVoice, setDigitalVoice] = useState(0)
  const [appleMaps, setAppleMaps] = useState(0)
  const [googleMaps, setGoogleMaps] = useState(0)
  const [digitalMaps, setDigitalMaps] = useState(0)
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
  console.log(user_key)
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
        console.log(data)

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div id="loading_page" className="m-auto justify-center justify-items-center min-h-screen flex flex-col mt-20">
      <div id="church_result" className="pt-40 flex-grow flex flex-col justify-center items-center w-full m-auto">
        <br />
        <section id="intro" className="-mt-52 m-auto">
          <div>
            <p className="text-5xl text-center font-medium">
              <span className="text-vr-form-title bg-transparent">Your church's</span>
            </p>
            <p className="text-5xl text-center font-medium">
              <span className="bg-gradient-to-r from-vr-button-first from-0% via-vr-button-second to-vr-button-third bg-clip-text text-transparent">
                Digital Health Assessment
              </span>
            </p>
          </div>
          <div className="m-auto mb-20  text-center  pt-10  w-full">
            <p className="text-xl text-vr-body-color font-medium block">
              Did you know there are{' '}
              <a className="text-xl text-vr-title-second font-medium">{last_month_searches} monthly </a>
              Google searches for <br />
              &#x201C;churches near me&#x201D; in{' '}
              <a className="text-xl text-vr-title-second font-medium">
                {loc_city}, {loc_state}
              </a>
              ?
            </p>
          </div>

          <div className="relative w-[85vw] flex justify-center items-center -top-5" style={{ zoom: '0.9' }}>
            <ScoreSummary
              digitalVoiceScore={digitalVoice}
              digitalMapsScore={googleMaps + appleMaps}
              socialClarityScore={socialClarity}
              websiteAuthorityScore={websiteAuthority}
              avgDigitalVoiceScore={vrVoice}
              avgDigitalMapsScore={vrMaps}
              avgSocialClarityScore={vrSocial}
              avgWebsiteAuthorityScore={vrWebsite}
            />
          </div>
        </section>

        <Link href="https://connect.visitorreach.com/digital-health-follow-up">
          <button className="text-2xl font-medium text-white rounded-full hover:bg-white bg-gradient-to-br from-vr-button-first via-vr-button-second to-vr-button-third hover:text-vr-button-third mt-40 h-16 w-[550px] relative -top-40">
            schedule a 15 minute call to learn more
          </button>
        </Link>
      </div>
    </div>
  )
}
