"use client"
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import NavBar from "../components/navbar.js"
import Circularbar from "../../../app/components/Circularbar1.js";
import Link from 'next/link.js';
import Summary from "../../../app/components/ScoreSummarySimple.js"
import { useSearchParams } from 'next/navigation'

export default function CompleteReportPage8() {
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

            <div id="cr_page8" className='relative w-full h-[100vh] grid grid-cols-9 grid-rows-9 justify-center bg-white overflow-hidden'>
                <div className="absolute left-[40px] top-[77px] w-[200px] ">
                    <Image
                        src={"/full_report_logo.svg"}
                        alt={" "}
                        height={400}
                        width={400}
                    />
                </div>
                <div className="relative col-span-2 row-span-9 ">   
                    <div style={{zoom: 0.8}}>
                        <NavBar></NavBar>
                    </div>
                    
                </div>
                <div className='col-span-7 row-span-3 contain-strict'>
                    <h1 className='text-[#0179FF] text-[45px] font-medium relative left-14 top-10'>VisitorReach™<a className='text-[#050938]'>—Your Digital Outreach Platform</a></h1>
                    <h2 className='text-[18px] font-regular text-[#050938] relative m-auto top-20 text-center w-11/12'>
                        VisitorReach is much more than just a website optimization platform or advertising agency. It’s a digital outreach program empowering pastors to have continual and consistent 1:1 SMS <a className='text-[#0179FF]'>conversations with seekers and new people to your city</a>. Churches that partner with VisitorReach average 40–160 new conversations every month and see new visitors walking through their doors every week.
                    </h2>
                </div>
                <div className='col-span-7 row-span-2'>
                    <div className='flex justify-center justify-items-center gap-20'>
                        <div className="w-[500px] shadow-2xl rounded-2xl">
                            <Image
                                src={"/culture.svg"}
                                alt={" "}
                                height={800}
                                width={800}
                            />
                        </div>
                        <div className="w-[500px] shadow-2xl rounded-2xl">
                            <Image
                                src={"/house.svg"}
                                alt={" "}
                                height={800}    
                                width={800}
                            />
                        </div>
                    </div>
                </div>
                <div className='col-span-7 row-span-4 relative left-14 top-10'>
                    <h1 className='text-[#0179FF] text-[45px] font-medium '>
                        The VisitorReach Process - 
                    </h1>
                    <h1 className='text-[45px] font-medium text-[#050938]'>Created for Pastors, by Pastors</h1>
                    <div className="w-[60vw] relative -top-[35vh] left-[10vw]">
                            <Image
                                src={"/footer.svg"}
                                alt={" "}
                                height={2000}    
                                width={2000}
                            />
                        </div>
                </div>
                
            </div>


            
          
           
        </div>
    )
}