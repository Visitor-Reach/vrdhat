import { useState } from 'react';
import Image from "next/image";
import Link from "next/link"


export default function NavBar() {


  return (
    <div className=''>
        <div className='round-full w-full relative top-[262px]'>
            <Link href={{pathname:"#cr_page3"}}>
                <button className='text-gray-500 text-[20px] bg-white h-12 w-80 relative left-8 rounded-xl hover:bg-[#E6F2FF] hover:text-[#0179FF]'>Digital Voice Score</button>
                <div className="relative left-10 -top-10 w-[30px]">
                    <Image
                        src={"/digital_voice_icon.svg"}
                        alt=" "
                        height={400}
                        width={400}
                    />
                </div>
            </Link>
        </div>
        <div className='round-full w-full relative top-[262px] '>
            <Link href={{pathname:"#cr_page4"}}>
                <button className='text-gray-500 text-[20px] bg-white h-12 w-80 relative left-8 rounded-xl hover:bg-[#E6F2FF] hover:text-[#0179FF]'>Digital Maps Score</button>
                <div className="relative left-10 -top-10 w-[30px]">
                    <Image
                        src={"/digital_maps_icon.svg"}
                        alt=" "
                        height={400}
                        width={400}
                    />
                </div>
            </Link>
        </div>
        
        <div className='round-full w-full relative top-[262px] '>
            <Link href={{pathname:"#cr_page6"}}>
                <button className='text-gray-500 text-[20px] bg-white h-12 w-80 relative left-8 text rounded-xl hover:bg-[#E6F2FF] hover:text-[#0179FF]'>Website Authority Score</button>
                <div className="relative left-10 -top-10 w-[30px]">
                    <Image
                        src={"/authority_icon.svg"}
                        alt=" "
                        height={400}
                        width={400}
                    />
                </div>
            </Link>
        </div>
        <div className='round-full w-full relative top-[262px] '>
            <Link href={{pathname:"#cr_page7"}}>
                <button className='text-gray-500 text-[20px] bg-white h-12 w-80 relative left-8 text rounded-xl hover:bg-[#E6F2FF] hover:text-[#0179FF]'>Digital Health Score</button>
                <div className="relative left-10 -top-10 w-[30px]">
                    <Image
                        src={"/digital_health_icon.svg"}
                        alt=" "
                        height={400}
                        width={400}
                    />
                </div>
            </Link>
        </div>
        <div className='w-full relative top-[262px] '>
            <Link href={{pathname:"#cr_page8"}}>
                <button className='text-gray-500 text-[20px] bg-white h-12 w-80 relative left-8 text rounded-xl hover:bg-[#E6F2FF] hover:text-[#0179FF]'>Visitor Reach Process</button>
                    <div className="relative left-12 -top-10 w-[25px]">
                    <Image
                        src={"/visitor_reach_process.svg"}
                        alt=" "
                        height={400}
                        width={400}
                    />
                </div>
            </Link>
        </div>
    </div>
  );
}
