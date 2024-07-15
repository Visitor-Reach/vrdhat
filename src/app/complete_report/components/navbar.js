import Image from "next/image";
import Link from "next/link"
import { useState } from 'react';

export default function NavBar({user_key, map, page}) {


  return (
    <div className='relative top-[250px] pl-[28px] flex flex-col gap-[22px] pr-[10px]'>
        <div className='round-full w-full'>
            {/*<Link className={'flex gap-[20px] items-center w-full h-[54px] px-[20px] rounded-[10px]' + (page === 3 ? " bg-[#E6F2FF] text-[#0179FF]" : "") } href={{pathname:"complete_report/3?user_key="+user_key+"&map_key="+map}}>*/}
            <Link className={'flex gap-[20px] items-center w-full h-[54px] px-[20px] rounded-[10px]' + (page === 3 ? " bg-[#E6F2FF] text-[#0179FF]" : "") } href={{pathname:""}} onClick={(e) => { e.preventDefault() }}>
                <div className="w-[30px]">
                    <Image
                        src={ page === 3 ? "/img-navbar1-blue.png" : "/img-navbar1.png" }
                        alt=" "
                        height={400}
                        width={400}
                    />
                </div>
                <button style={ page === 3 ? { color: "#0179FF" } : {}}  className={'text-gray-500 text-[24px] font-[400] h-12 rounded-xl hover:bg-[#E6F2FF] hover:text-[#0179FF]' + (page === 3 ? " text-[#0179FF]" : "") }>Digital Voice Score</button>
            </Link>
        </div>
        <div className='round-full w-full'>
            {/*<Link className={'flex gap-[20px] items-center w-full h-[54px] px-[20px] rounded-[10px]' + (page === 4 ? " bg-[#E6F2FF] text-[#0179FF]" : "") } href={{pathname:"/complete_report/4?user_key="+user_key+"&map_key="+map}}>*/}
            <Link className={'flex gap-[20px] items-center w-full h-[54px] px-[20px] rounded-[10px]' + (page === 4 ? " bg-[#E6F2FF] text-[#0179FF]" : "") } href={{pathname:""}} onClick={(e) => { e.preventDefault() }}>
                <div className="w-[30px]">
                    <Image
                        src={ page === 4 ? "/img-navbar2-blue.png" : "/img-navbar2.png" }
                        alt=" "
                        height={400}
                        width={400}
                    />
                </div>
                <button style={ page === 4 ? { color: "#0179FF" } : {}} className='text-gray-500 text-[20px] text-[24px] font-[400] h-12 rounded-xl hover:bg-[#E6F2FF] hover:text-[#0179FF]'>Digital Maps Score</button>
            </Link>
        </div>
        <div className='round-full w-full'>
            {/*<Link className={'flex gap-[20px] items-center w-full h-[54px] px-[20px] rounded-[10px]' + (page === 4 ? " bg-[#E6F2FF] text-[#0179FF]" : "") } href={{pathname:"/complete_report/4?user_key="+user_key+"&map_key="+map}}>*/}
            <Link className={'flex gap-[20px] items-center w-full h-[54px] px-[20px] rounded-[10px]' + (page === 5 ? " bg-[#E6F2FF] text-[#0179FF]" : "") } href={{pathname:""}} onClick={(e) => { e.preventDefault() }}>
                <div className="w-[30px]">
                    <Image
                        src={ page === 5 ? "/img-navbar3-blue.png" : "/img-navbar3.png" }
                        alt=" "
                        height={400}
                        width={400}
                    />
                </div>
                <button style={ page === 5 ? { color: "#0179FF" } : {}} className='text-gray-500 text-[20px] text-[24px] font-[400] h-12 rounded-xl hover:bg-[#E6F2FF] hover:text-[#0179FF]'>Social Clarity Score</button>
            </Link>
        </div>
        <div className='round-full w-full'>
            {/*<Link className={'flex gap-[20px] items-center w-full h-[54px] px-[20px] rounded-[10px]' + (page === 6 ? " bg-[#E6F2FF] text-[#0179FF]" : "") } href={{pathname:"/complete_report/6?user_key="+user_key+"&map_key="+map}}>*/}
            <Link className={'flex gap-[20px] items-center w-full h-[54px] px-[20px] rounded-[10px]' + (page === 6 ? " bg-[#E6F2FF] text-[#0179FF]" : "") } href={{pathname:""}} >
                <div className="w-[30px]">
                    <Image
                        src={ page === 6 ? "/img-navbar4-blue.png" : "/img-navbar4.png" }
                        alt=" "
                        height={400}
                        width={400}
                    />
                </div>
                <button style={ page === 6 ? { color: "#0179FF" } : {}} className='text-gray-500 text-[20px] text-[24px] font-[400] h-12 text rounded-xl hover:bg-[#E6F2FF] hover:text-[#0179FF]'>Website Authority Score</button>
            </Link>
        </div>
        <div className='round-full w-full'>
            {/*<Link className={'flex gap-[20px] items-center w-full h-[54px] px-[20px] rounded-[10px]' + (page === 7 ? " bg-[#E6F2FF] text-[#0179FF]" : "") } href={{pathname:"/complete_report/7?user_key="+user_key+"&map_key="+map}}>*/}
            <Link className={'flex gap-[20px] items-center w-full h-[54px] px-[20px] rounded-[10px]' + (page === 7 ? " bg-[#E6F2FF] text-[#0179FF]" : "") } href={{pathname:""}} onClick={(e) => { e.preventDefault() }}>
                <div className="w-[30px]">
                    <Image
                        src={ page === 7 ? "/img-navbar5-blue.png" : "/img-navbar5.png" }
                        alt=" "
                        height={400}
                        width={400}
                    />
                </div>
                <button style={ page === 7 ? { color: "#0179FF" } : {}} className='text-gray-500 text-[20px] text-[24px] font-[400] h-12 text rounded-xl hover:bg-[#E6F2FF] hover:text-[#0179FF]'>Digital Health Score</button>
            </Link>
        </div>
        <div className='w-full'>
            {/*<Link className={'flex gap-[20px] items-center w-full h-[54px] px-[20px] rounded-[10px]' + (page === 8 ? " bg-[#E6F2FF] text-[#0179FF]" : "") } href={{pathname:"/complete_report/8?user_key="+user_key+"&map_key="+map}}>*/}
            <Link className={'flex gap-[20px] items-center w-full h-[54px] px-[20px] rounded-[10px]' + (page === 8 ? " bg-[#E6F2FF] text-[#0179FF]" : "") } href={{pathname:""}} onClick={(e) => { e.preventDefault() }}>
                <div className="w-[30px]">
                    <Image
                        src={ page === 8 ? "/img-navbar6-blue.png" : "/img-navbar6.png" }
                        alt=" "
                        height={400}
                        width={400}
                    />
                </div>
                <button style={ page === 8 ? { color: "#0179FF" } : {}} className='text-gray-500 text-[20px] text-[24px] font-[400] h-12 text rounded-xl hover:bg-[#E6F2FF] hover:text-[#0179FF]'>Visitor Reach Process</button>
            </Link>
        </div>
    </div>
  );
}
