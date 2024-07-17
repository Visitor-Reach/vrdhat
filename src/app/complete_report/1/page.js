'use client'

import './1.css'

import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

export default function CompleteReportPage1() {
  const [church_name, set_church_name] = useState('')
  const [loc_city, setLoc_city] = useState('')
  const [loc_zipcode, setLoc_zipcode] = useState('')
  const [loc_address, setLoc_address] = useState('')
  const [loc_state, setLoc_state] = useState('')
  const [webpage, setWebpage] = useState('')
  const [createdAt, setCreatedAt] = useState('')

  const searchParams = useSearchParams()
  const id = searchParams.get('id')

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
        setLoc_city(data.loc_city)
        setLoc_address(data.loc_address)
        setLoc_zipcode(data.loc_zipcodesetLoc_ziploc_zipcode)
        setLoc_state(data.loc_state)
        setWebpage(data.website)
        setCreatedAt(new Date(data.created_at * 1000).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))  
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
        <h1 className="ml-[74px] mt-[-20px] p-[0] text-[140px] text-black text-[65px] font-medium">{church_name}</h1>
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
          Assessment performed on <a className="font-semibold">{createdAt}</a>{' '}
        </p>
      </div>
    </div>
  )
}
