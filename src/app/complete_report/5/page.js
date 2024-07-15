'use client'

import React, { useEffect, useState } from 'react'

import Circularbar from '../../../app/components/Circularbar1.js'
import Image from 'next/image'
import NavBar from '../components/navbar.js'
import { useSearchParams } from 'next/navigation'

export default function CompleteReportPage4() {
  const [instagramScore, setInstagramScore] = useState(0)
  const [facebookScore, setFacebookScore] = useState(0)

  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append('Access-Control-Allow-Origin', '*')
        const response = await fetch(process.env.NEXT_PUBLIC_API_ROOT + '/api/fetch-data/' + id + '/json', {
          method: 'GET',
          headers: myHeaders,
        })

        const data = await response.json()
        setInstagramScore(data.instagram_score)
        setFacebookScore(data.facebook_score)
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
        id="cr_page5"
        className="relative min-w-[1920px] w-[1920px] min-h-[1080px] h-[1080px] m-auto grid grid-cols-9 grid-rows-2 justify-center bg-white overflow-hidden"
      >
        <div className="absolute left-[40px] top-[77px] w-[200px] z-[1000]">
          <Image src={'/full_report_logo.svg'} alt={' '} height={400} width={400} />
        </div>
        <div className="relative col-span-2 row-span-2 menu-shadow">
          <div>
            <NavBar id={id} page={5}></NavBar>
          </div>
        </div>

        <div className="col-span-7 row-span-2 bg-[#F9FCFD] pt-[90px] pl-[130px] overflow-hidden">
          
          <div className="flex items-center w-full gap-[20px]">
            
            <div className="rounded-3xl w-[772px] h-[430px] card-shadow bg-[url('/bg-ct1-page4.png')] bg-cover overflow-hidden">
              <div className="w-[797px] h-[430px] pt-[100px] relative">
                <h1 className="text-[#050938] w-[319px] text-[32px] font-medium leading-[130%] tracking-[-1.2px] absolute left-11 top-11">
                  Americans average<br/>
                  <a className="text-[#0179FF]">7.5 hours a week</a> on<br/>
                  social media—<br/>
                  <a className="text-[#0179FF]">six</a> times more than<br/>
                  they spend in<br/>
                  church.
                </h1>
              </div>
            </div>

            <div className="flex flex-col items-center w-[453px] h-[430px] pt-[40px] rounded-3xl card-blue-shadow">
              <div className="flex items-center gap-[20px]">
                <div className="w-[40px]">
                  <Image src={'/img-ct3-page4.png'} alt={' '} height={65} width={65} />
                </div>
                <h1 className="text-[30px] font-medium text-[#050938] w-[267px] leading-[115%] tracking-[-1.2px]">
                  Your Instagram Clarity Score
                </h1>
              </div>
              <div className="mt-[40px]">
                <Circularbar value={instagramScore} title={undefined} max_value={100} />
              </div>
            </div>

          </div>

          <div className="flex items-center w-full gap-[20px] mt-[25px]">

            <div className="rounded-3xl w-[772px] h-[430px] large-card-shadow">
              <div className="w-[120px] m-auto mt-[25px]">
                <Image className="w-[177px]" src={'/img-ct2-page4.png'} alt={' '} height={400} width={400} />
              </div>
              <h1 className="mt-[20px] text-[#050938] w-[500px] text-[32px] font-medium text-center m-auto leading-[130%] tracking-[-1.2px]">
                What is your <a className="text-[#0179FF]">Social Clarity </a>Score & Why does it Matter
              </h1>
              <h2 className="mt-[20px] text-[#75778B] w-[716px] text-[20px] font-[400] text-center m-auto leading-[143%] tracking-[-0.8px]">
              Your Social Clarity Score reviews your church’s social information and
              validates whether your content is listed correctly and aligns with
              major directories. VisitorReach specializes in perfecting your social
              clarity score to maximize your digital reach through social media.
              </h2>
            </div>

            <div className="flex flex-col items-center w-[453px] h-[430px] pt-[40px] rounded-3xl card-blue-shadow">
              <div className="flex items-center gap-[20px]">
                <div className="w-[40px]">
                  <Image className="w-[177px]" src={'/img-ct4-page4.png'} alt={' '} height={65} width={66} />
                </div>
                <h1 className="text-[30px] font-medium text-[#050938] w-[267px] leading-[115%] tracking-[-1.2px]">
                  Your Facebook Clarity Score
                </h1>
              </div>
              <div className="mt-[40px]">
                <Circularbar value={facebookScore} title={undefined} max_value={150} />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
