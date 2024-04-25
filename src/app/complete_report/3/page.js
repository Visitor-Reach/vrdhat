"use client"
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import NavBar from "../components/navbar.js"
import Circularbar from "../../../app/components/Circularbar1.js";
import Link from 'next/link.js';
import Summary from "../../../app/components/ScoreSummarySimple.js"
import { useSearchParams } from 'next/navigation'

export default function CompleteReportPage3() {
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
        <div className="">
            
            <div id="cr_page3" className="relative w-full h-[100vh] grid grid-cols-9 justify-center bg-white" >
                <div className="absolute left-[40px] top-[77px] w-[200px]">
                    <Image
                        src={"/full_report_logo.svg"}
                        alt={" "}
                        height={400}
                        width={400}
                    />
                </div>
                <div className="relative col-span-2">
                    <div style={{zoom: 0.8}}>
                        <NavBar user_key={user_key} map={map}></NavBar>
                    </div>
                    
                    
                </div>
                <div className='col-span-4 flex flex-col justify-center justify-items-center'>
                    <div className="bg-white w-5/6 h-[40vh] relative top-[6vh] rounded-3xl m-auto shadow-2xl">
                        <div className="relative m-auto w-[120px] top-10">
                            <Image
                                src={"/homepod.svg"}
                                alt={" "}
                                height={400}
                                width={400}
                            />
                        </div>
                        <h1 className='font-medium text-[25px] text-[#050938] w-10/12 text-center m-auto relative top-20'>What Is <a className="text-[#0179FF]">Voice Search</a> & Why It’s Important</h1>
                        <h2 className='font-medium text-[15px] text-[#75778B] w-10/12 text-center m-auto relative top-24'>
                            Voice technology allows people to perform a hands-free search by asking questions to their smart devices such as smartphones, smart speakers, and in-car systems. Your church’s Digital Voice Score shows how optimized your digital presence is when it comes to showing up in voice search results.
                        </h2>
                    </div>
                    <div className="bg-white w-5/6 h-[34vh] rounded-3xl m-auto shadow-2xl bg-[url('/woman-background.png')] bg-cover relative bottom-[6vh]">
                        <div className='bg-gradient-to-br from-[#11133F] from-10% to-white/30 h-[34vh] rounded-3xl'>
                                <h1 className='relative text-white w-2/3 ml-10 text-[80px]'>57%</h1>
                                <h2 className='relative text-white w-2/3 ml-10 text-[20px]'>of American adults use voice assistants on their devices to find out information on a daily basis.</h2>
                                <h3 className='relative text-white w-2/3 ml-10 mt-10 text-[14px]'>Source: NPR</h3>
                        </div>
                        
                    </div>

                    
                </div>
                <div className='col-span-3 flex flex-col justify-center justify-items-center'>
                    <div className=" w-[25vw] h-[75vh] rounded-3xl ml-[0px] shadow-2xl relative top-[0vh] -left-[3vw]">
                        <h1 className='relative text-[#050938] w-2/3 m-auto text-center font-bold text-[32px] justify-center justify-items-center top-[5vh]'>Your Digital Voice Score</h1>
                        <div className='relative m-auto grid justify-center top-[10vh]' style={{zoom:0.8}}>
                            <Circularbar value={digitalVoice} title={undefined} max_value={250}/>
                        </div>
                        <div className="relative top-[8vh] m-auto grid justify-center mt-0 w-[110px]">
                            <Image
                                src={"/2p_church.svg"}
                                alt={" "}
                                height={400}
                                width={400}
                            />
                        </div>
                        <h1 className='text-[#050938] text-[20px] font-medium relative top-[7vh] m-auto grid justify-center mt-5'>Only 2% of churches</h1>
                        <h2 className='text-[#75778B] text-[15px] font-regular relative top-[6vh] m-auto grid justify-center w-5/6 mt-5'>
                            are optimized for voice search. If your church’s digital presence isn’t optimized for voice search, people won’t be able to find and visit your church!
                        </h2>
                        
                        <Link href={{pathname:"https://www.visitorreach.com"}}>
                            <h3 className='text-[#0179FF] text-[12px] font-regular relative top-[7vh] m-auto grid justify-center w-4/6 mt-5 pb-10'>
                                Source: VisitorReach
                            </h3>
                        </Link>
                        

                    </div>
                </div>
            </div>

        </div>
    )
}