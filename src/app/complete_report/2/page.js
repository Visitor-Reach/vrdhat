'use client'

import './2.css'

import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

export default function CompleteReportPage2() {
  const [last_month_searches, set_last_month_searches] = useState(0)
  const [loc_city, setLoc_city] = useState('')
  const [loc_state, setLoc_state] = useState('')
  const [map_image, setMap_image] = useState('')

  const searchParams = useSearchParams()
  const id = searchParams.get('id').replace(' ', '+')

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
        set_last_month_searches(data.last_month_searches)
        setLoc_city(data.loc_city)
        setLoc_state(data.loc_state)
        setMap_image(data.map_image)
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
        id="cr_page2"
        className={`relative min-w-[1920px] w-[1920px] min-h-[1080px] h-[1080px] m-auto overflow-hidden`}
      >
        <div className="absolute w-[1920px] map-container ">
          {map_image && (
            <Image
              style={{ maxWidth: 'none' }}
              className="w-[2100px] h-full"
              src={`https://vr-digital-health-files.s3.us-west-2.amazonaws.com/map_images/${map_image}`}
              alt={' '}
              height={2000}
              width={2000}
            />
          )}
        </div>
        <div className="absolute w-full h-full bg-gradient-to-br from-white from-10% to-white/30">
          <h1 className="ml-[107px] mt-[110px] w-[1429px] text-[#050938] text-[75px] font-medium w-4/6 leading-[150%] tracking-[-3px]">
            Did you know there are <span className="text-[#0179FF]">{last_month_searches} monthly</span> Google searches
            for “churches near me” in{' '}
            <span className="text-[#0179FF]">
              {loc_city}, {loc_state}
            </span>
            ?
          </h1>
          <h2 className="ml-[107px] mt-[21px] text-[#292A36] text-[40px] font-regular w-4/6 leading-[260%] tracking-[-1.6px]">
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
