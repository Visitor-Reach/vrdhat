"use client"
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import NavBar from "../components/navbar.js"
import Circularbar from "../../../app/components/Circularbar1.js";
import Link from 'next/link.js';
import Summary from "../../../app/components/ScoreSummarySimple.js"
import { useSearchParams } from 'next/navigation'
import './7.css';


export default function CompleteReportPage7() {
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
    const map = searchParams.get('map_key')

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

            
            <div id="cr_page7" className='relative min-w-[1920px] w-[1920px] min-h-[1080px] h-[1080px] m-auto grid grid-cols-9 grid-rows-2 justify-center bg-white overflow-hidden'>
                <div className="absolute left-[40px] top-[77px] w-[200px] z-[1000]">
                    <Image
                        src={"/full_report_logo.svg"}
                        alt={" "}
                        height={400}
                        width={400}
                    />
                </div>
                <div className="relative col-span-2 row-span-2 menu-shadow">   
                    <div>
                        <NavBar user_key={user_key} map={map} page={7}></NavBar>
                    </div>
                    
                </div>
                
                    
                <div className="col-span-7 row-span-2 bg-[#F9FCFD] pt-[90px] pl-[130px] overflow-hidden">
                    <div className='flex gap-[20px]'>
                        <div className='flex flex-col gap-[20px]'>

                            <div className='w-[800px] page-7-shadow-box-1'>
                                <Summary
                                    digitalVoiceScore={digitalVoice} 
                                    avgDigitalVoiceScore={vrVoice} 
                                    digitalMapsScore={googleMaps + appleMaps} 
                                    avgDigitalMapsScore={vrMaps}
                                    socialClarityScore={socialClarity} 
                                    avgSocialClarityScore={vrSocial} 
                                    websiteAuthorityScore={websiteAuthority}  
                                    avgWebsiteAuthorityScore={vrWebsite}
                                />
                            </div>

                            <div className="bg-[url('/bg-ct2-page6.png')] bg-cover rounded-3xl h-[430px] w-[800px] overflow-hidden pt-[70px] pl-[50px] page-7-shadow-box-2">
                                <h1 className='text-white text-[24px] font-regular w-[403px] leading-[143%] tracking-[-0.9px]'>
                                    What can your church do to improve your digital outreach strategy to engage those who are lost, hurting, and seeking the truth of the gospel message?
                                </h1>
                            </div>

                        </div>
                        <div className='flex flex-col'>
                            <div className='bg-white rounded-3xl justify-center justify-items-center m-auto w-[453px] h-[880px] pt-[45px] page-7-shadow-box-3'>
                                <h1 className='text-[30px] text-[#050938] font-medium text-center w-[304px] m-auto leading-[115%] tracking-[-1.2px]'>Your Church’s Total Digital Health Score</h1>
                                <div className='flex justify-center mt-[30px]'>
                                    <Circularbar value={digitalVoice + googleMaps + appleMaps + socialClarity + websiteAuthority} title={undefined} max_value={750}/>
                                </div>
                                <h2 className='text-[#75778B] text-[18px] font-regular w-[352px] m-auto mt-[10px] text-center leading-[143%] tracking-[-0.7px]'>If you’re surprised by your digital health score, you are not alone. Most churches are in the same boat.</h2>
                                <div className="w-[200px] m-auto mt-[80px]">
                                    <Image
                                        className='w-[253px]'
                                        src={"/people_im.svg"}
                                        alt={" "}
                                        height={400}
                                        width={400}
                                    />
                                </div>
                                <h1 className='text-[#050938] text-[24px] m-auto text-center leading-[143%] tracking-[-0.9px] mt-[30px]'> 79% of churches </h1>
                                <h2 className='text-[#75778B] text-[18px] font-regular m-auto mt-[15px] w-[352px] text-center leading-[143%] tracking-[-0.7px]'>feel they don’t “have a well-defined digital ministry” for engaging nonbelievers or people outside their church community.</h2>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                {/*<div className='col-span-2 row-span-2 rounded-3xl shadow-2xl justify-center justify-items-center m-auto h-[80vh] relative top-[2vh] '>
                    <h1 className='text-[24px] text-[#050938] relative top-16 left-0 font-medium text-center'>Your Church’s Total Digital Health Score</h1>
                    <div className='relative m-auto grid justify-center top-20'>
                        <Circularbar value={digitalVoice + googleMaps + appleMaps + socialClarity + websiteAuthority} title={undefined} max_value={750}/>
                    </div>
                    <h2 className='text-[#75778B] text-[16px] font-regular relative top-20 w-5/6 m-auto text-center'>If you’re surprised by your digital health score, you are not alone. Most churches are in the same boat.</h2>
                    <div className="relative top-24 w-[200px] m-auto">
                        <Image
                            src={"/people_im.svg"}
                            alt={" "}
                            height={400}
                            width={400}
                        />
                    </div>
                    <h1 className='text-[#050938] text-[22px] relative top-28 w-5/6 m-auto text-center'> 79% of churches </h1>
                    <h2 className='text-[#75778B] text-[16px] font-regular relative top-36 w-5/6 m-auto  pb-56 text-center'>feel they don’t “have a well-defined digital ministry” for engaging nonbelievers or people outside their church community.</h2>
                </div>
                <div className=''>

                </div>
                
    </div>*/}
            </div>

    )
}