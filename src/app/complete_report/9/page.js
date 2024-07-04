import Image from 'next/image'
import Link from 'next/link.js'
import React from 'react'

export default function CompleteReportPage9() {
  return (
    <div className="">
      <div
        id="cr_page9"
        className="relative min-w-[1920px] w-[1920px] min-h-[1080px] h-[1080px] m-auto grid grid-cols-2 overflow-hidden"
      >
        <div className="flex ml-[116px]">
          <div className="flex flex-col">
            <div className="mt-[74px] flex justify-start">
              <Image className="h-[58px]" src={'/Logo-2.svg'} alt={' '} height={58} width={393} />
            </div>

            <h1 className="mt-[122px] text-[#050938] font-medium w-[863px] text-[100px] font-[500] leading-[125%] tracking-[-4px]">
              Grow Your <a className="text-[#0179FF]">Church</a> with VisitorReach
            </h1>
            <p className="text-[#75778B] mt-[33px] w-[734px] text-[36px] font-[400] leading-[150%] tracking-[-1.4px]">
              {' '}
              To learn more about VisitorReach,{' '}
              <span className="text-[#0179FF] mt-5">
                {' '}
                <Link href={{ pathname: 'https://connect.visitorreach.com/digital-health-follow-up' }}>
                  {' '}
                  schedule a quick 15 minute call
                </Link>{' '}
              </span>{' '}
              with our team today.
            </p>
            <div className="w-[250px] mt-[80px]">
              <Image src={'/QR.svg'} alt={' '} height={600} width={600} />
            </div>
          </div>

          <div className="relative flex flex-col">
            <div className="absolute left-[520px] w-[399px] h-[836px] top-0">
              <Image src={'/guzman.svg'} alt={' '} height={836} width={399} />
            </div>
            <div className="absolute left-[100px] w-[399px] h-[836px] top-[374px]">
              <Image src={'/app_messages.svg'} alt={' '} height={836} width={399} />
            </div>
          </div>
        </div>
        <div className="w-full h-full">
          <div className="w-4/6 relative top-40 left-32"></div>
        </div>
        <div className="relative w-full h-full"></div>
      </div>
    </div>
  )
}
