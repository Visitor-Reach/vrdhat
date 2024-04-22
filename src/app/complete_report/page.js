"use client"
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import NavBar from "../complete_report/components/navbar.js"
import Circularbar from "../../app/components/Circularbar1.js";
import Link from 'next/link.js';
import Summary from "../../app/components/ScoreSummarySimple.js"
import { useSearchParams } from 'next/navigation'
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS


export default function CompleteReport() {
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
    const [keywords, setKeywords] = useState("");

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
            setKeywords(data.keywords.split(","));
            console.log('Sucess fetching data: ', data)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, []);

    return (
        <div className="">
 
        <div id="cr_page4" className="relative w-full md:h-[100vh] flex flex-wrap md:grid md:grid-cols-9 md:grid-rows-2 justify-center bg-white" >
            <div className="absolute left-[40px] top-[77px] w-[200px] ">
                <Image
                    src={"/full_report_logo.svg"}
                    alt={" "}
                    height={400}
                    width={400}
                />
            </div>
            <div className="relative md:col-span-2 md:row-span-2 lg:top-40 hidden md:flex">
                <div style={{zoom: 0.7}}>
                    <NavBar user_key={user_key} map={map}></NavBar>
                </div>
               
               
            </div>
            <div className="relative col-span-2">
                <div className="w-[18vw] h-[30vh]  bg-[url('/Bounds.png')] bg-cover border-2 rounded-3xl relative top-[20vh] left-[5vw]">
                    <h1 className='relative top-[10vh] text-white w-2/3 left-5 text-[15px] lg:text-[15px] xl:text-[21px] font-medium'>
                        People in the U.S. search for “churches near me” over <a className='text-[#0179FF]'>1 million </a>times each month
                    </h1>
                </div>
            </div>
            <div className="relative  col-span-2 ">
                <div className="w-[20vw] h-[30vh] bg-[url('/sample_map.png')] bg-cover rounded-3xl shadow-lg relative top-[20vh] left-[2vw]">
                    <h1 className='relative  top-[10vh] text-[#050938] w-2/3 ml-10 text-[18px] font-medium'>
                        Nearly <a className='text-[#0179FF]'>2 billion </a>people use Google Maps every month
                    </h1>
                </div>
            </div>
            <div className="relative col-span-2 h-[30vh] w-[25vw]  rounded-3xl shadow-lg top-[20vh] left-[1vw]">
                <div className='flex'>
                    <div className="relative top-[2vh] xl:top-[4vh] left-5 xl:left-10 w-[30px]">
                        <Image
                            src={"/google_maps.svg"}
                            alt={" "}
                            height={400}
                            width={400}
                        />
                    </div>
                    <h1 className='relative top-[3vh] left-10 xl:left-16 text-[14px] xl:text-[20px] font-medium xl:font-semibold text-[#050938] w-3/6 xl:w-4/6'>
                        Your Google Maps Search Score
                    </h1>
                </div>
               
                <div className='relative m-auto justify-center top-[4vh] xl:top-[8vh] left-[10vw] ' style={{zoom:0.6}}>
                    <Circularbar value={googleMaps} title={undefined} max_value={250}/>
                </div>
            </div>
            <div className="relative ">
            </div>
            <div className="relative col-span-4 justify-center justify-items-center shadow-lg rounded-3xl w-[39vw] left-[5vw] top-[3vh] h-[30vh]">
                <div className="relative top-1 xl:top-3 w-[90px] m-auto">
                    <Image
                        src={"/pin_map.svg"}
                        alt={" "}
                        height={400}
                        width={400}
                    />
                </div>
                <h1 className='relative top-2 xl:top-5 text-[#050938] w-4/5 left-0 text-[18px] font-medium text-center m-auto'>
                    What is your <a className='text-[#0179FF]'>Digital Maps </a>Score & Why it’s Important
                </h1>
                <h2 className='relative top-4 xl:top-8 text-[#75778B] w-5/6 left-0 text-[13px] lg:text-[10px] xl:text-[15px] 2xl:text-[15px]  font-medium text-center m-auto'>
                    From where we eat to where we visit, digital maps are more important in our lives than ever before. The Digital Maps Score reflects how likely your church is to show up on these digital navigation apps when someone searches for “churches near me,” If your church information isn’t listed correctly, they won’t find you.
                </h2>
            </div>
            <div className="relative col-span-2 h-[30vh] w-[25vw] rounded-3xl shadow-lg left-[1vw] top-[3vh]">
                <div className='flex'>
                    <div className="relative top-10 xl:top-[4vh] left-5 xl:left-10 w-[45px]">
                        <Image
                            src={"/apple_mps.svg"}
                            alt={" "}
                            height={400}
                            width={400}
                        />
                    </div>
                    <h1 className='relative top-10 left-10 xl:left-16 text-[14px] xl:text-[20px] font-medium xl:font-semibold text-[#050938] w-3/6 xl:w-4/6'>
                        Your Apple Maps Search Score
                    </h1>
                </div>
                <div className='relative m-auto justify-center left-[10vw] top-[4vh] xl:top-[8vh]' style={{zoom : 0.6}}>
                    <Circularbar value={appleMaps} title={undefined} max_value={250}/>
                </div>
            </div>
 
 
        </div>
 
 
       
    </div>
    )
}