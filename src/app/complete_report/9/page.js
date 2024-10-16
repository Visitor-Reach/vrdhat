"use client"
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import NavBar from "../components/navbar.js"
import Circularbar from "../../../app/components/Circularbar1.js";
import Link from 'next/link.js';
import Summary from "../../../app/components/ScoreSummarySimple.js"
import { useSearchParams } from 'next/navigation'

export default function CompleteReportPage9() {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const [isLoading, setIsLoading] = useState(true);
    const [church_name, set_church_name] = useState('');
    const [digitalVoice, setDigitalVoice] = useState(0);
    const [appleMaps, setAppleMaps] = useState(0);
    const [googleMaps, setGoogleMaps] = useState(0);
    const [socialClarity, setsocialClarity] = useState(0);
    const [websiteAuthority, setwebsiteAuthority] = useState(0);
    const [vrVoice, setvrVoice] = useState(0);
    const [vrMaps, setvrMaps] = useState(0);
    const [vrSocial, setvrSocial] = useState(0);
    const [vrWebsite, setvrWebsite] = useState(0);
    const [last_month_searches, set_last_month_searches] = useState(0);
    const [loc_city, setLoc_city] = useState("");
    const [loc_zipcode, setLoc_zipcode] = useState("");
    const [loc_address, setLoc_address] = useState("");
    const [loc_state, setLoc_state] = useState("");
    const [webpage, setWebpage] = useState("");

    const searchParams = useSearchParams()
    const user_key = searchParams.get('user_key')

    useEffect(() => {
        const fetchData = async () => {
          try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Access-Control-Allow-Origin", "*")
            const response = await fetch('http://localhost:8080/api/fetch-data', {
                method: 'POST',
                body: JSON.stringify({"user_key" : user_key}),
                headers: myHeaders,
            })
            
            const data = await response.json()
      
            set_church_name(data.church_name);
            setDigitalVoice(data.digitalVoice);
            setAppleMaps(data.appleMaps);
            setGoogleMaps(data.googleMaps);
            setsocialClarity(data.socialClarity);
            setwebsiteAuthority(data.websiteAuthority);
            setvrVoice(data.vrVoice);
            setvrMaps(data.vrMaps);
            setvrSocial(data.vrSocial);
            setvrWebsite(data.vrWebsite);
            set_last_month_searches(data.last_month_searches);
            setLoc_city(data.loc_city);
            setLoc_address(data.loc_address);
            setLoc_zipcode(data.loc_zipcodesetLoc_ziploc_zipcode);
            setLoc_state(data.loc_state);
            setWebpage(data.website);
            console.log('Sucess fetching data: ', data)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, []);

    return (
        <div className="">
            <div id="cr_page9" className='relative min-w-[1920px] w-[1920px] min-h-[1080px] h-[1080px] m-auto grid grid-cols-2 overflow-hidden'>
                <div className='flex ml-[116px]'> 
                    <div className='flex flex-col'>
                        
                        <div className="mt-[74px] flex justify-start">
                            <Image
                                className='h-[58px]'
                                src={"/Logo.svg"}
                                alt={" "}
                                height={58}
                                width={393}
                            />
                        </div>

                        <h1 className = "mt-[122px] text-[#050938] font-medium w-[863px] text-[100px] font-[500] leading-[125%] tracking-[-4px]">Grow Your <a className = "text-[#0179FF]">Church</a> with VisitorReach</h1>
                        <p className="text-[#75778B] mt-[33px] w-[734px] text-[36px] font-[400] leading-[150%] tracking-[-1.4px]"> To learn more about VisitorReach, <span className="text-[#0179FF] mt-5">  <Link href = {{pathname:"https://connect.visitorreach.com/digital-health-follow-up"}}> schedule a quick 15 minute call</Link > </span>  with our team today.</p>
                        <div className="w-[250px] mt-[80px]">
                            <Image
                                src={"/QR.svg"}
                                alt={" "}
                                height={600}
                                width={600}
                            />
                        </div>

                    </div>
                    
                    <div className='relative flex flex-col'>
                        <div className="absolute left-[520px] w-[399px] h-[836px] top-0">
                            <Image
                                src={"/guzman.svg"}
                                alt={" "}
                                height={836}
                                width={399}
                            />
                        </div>
                        <div className="absolute left-[100px] w-[399px] h-[836px] top-[374px]">
                            <Image
                                src={"/app_messages.svg"}
                                alt={" "}
                                height={836}
                                width={399}
                            />
                        </div>
                    </div>
                </div>
                <div className='w-full h-full'>
                    
                    
                    <div className='w-4/6 relative top-40 left-32'>
                        

                    </div>
                    

                </div>
                <div className='relative w-full h-full'>
                    
                    
                    
                </div>

                
            </div>
            
          
           
        </div>
    )
}