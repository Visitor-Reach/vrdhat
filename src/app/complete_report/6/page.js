"use client"
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import NavBar from "../components/navbar.js"
import Circularbar from "../../../app/components/Circularbar1.js";
import Link from 'next/link.js';
import Summary from "../../../app/components/ScoreSummarySimple.js"
import { useSearchParams } from 'next/navigation'
import Pdf from 'react-to-pdf';
import { useRef } from 'react';

export default function CompleteReportPage6() {
    const ref = useRef();
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

        


            <div id="cr_page6" className="relative w-full h-[100vh] grid grid-cols-9 grid-rows-2 justify-center bg-white overflow-hidden" >
                <div className="absolute left-[40px] top-[77px] w-[200px] ">
                    <Image
                        src={"/full_report_logo.svg"}
                        alt={" "}
                        height={400}
                        width={400}
                    />
                </div>
                <div className="relative col-span-2 row-span-2 ">
                    <div style={{zoom: 0.8}}>
                        <NavBar></NavBar>
                    </div>
                    
                    
                </div>

                <div className='col-span-4  rounded-3xl justify-center justify-items-center shadow-2xl h-96 w-[42vw] relative top-16 left-3'>
                    <div className="relative top-8 w-[120px]  m-auto">
                        <Image
                            src={"/authority_im.svg"}
                            alt={" "}
                            height={400}
                            width={400}
                        />
                    </div>
                    <h1 className='relative top-11 text-[#050938] w-2/3 left-0 text-[26px] font-medium text-center m-auto'>
                        Why your <a className='text-[#0179FF]'>Website Authority Score </a>is Important
                    </h1>
                    <h2 className='relative top-14 text-[#75778B] w-5/6 left-0 text-[18px] font-medium text-center m-auto'>
                        The #1 organic result is 10x more likely to receive a click compared to #10 spot. This makes having a well-ranking website extremely important. A strong online presence leads to more people finding your church, identifying with your mission and culture, and visiting your church.
                    </h2>
                    
                    
                    <h3 className='text-[#0179FF] text-[15px] font-regular relative top-16 left-[32vw]'> Source: backlinko </h3>


                </div>

                <div className='col-span-2  rounded-3xl shadow-2xl h-96 right-2 relative top-16'>
                    <h1 className='relative top-12 text-[22px] font-medium text-[#050938] w-4/6 m-auto text-center'>
                        Your Church Website Authority Score
                    </h1>
                    <div className='relative m-auto grid justify-center top-12'>
                        <Circularbar value={websiteAuthority} title={undefined} max_value={250}/>
                    </div>
                </div>
                <div className=''>

                </div>

                <div className="col-span-2 bg-[url('/computer_im.png')] bg-cover w-full h-[45vh]  shadow-2xl rounded-3xl relative left-2 top-3">
                    <div className="relative w-full h-[45vh] bg-gradient-to-br from-[#11133F] from-10% to-white/30 rounded-3xl ">
                        <h1 className='relative top-36 text-white w-2/3 ml-10 text-[26px] font-medium'>
                            9 out of 10 people will visit your church website before ever visiting in-person
                        </h1>
                    </div>
                </div>
                <div className='col-span-4 w-[42vw] h-[45vh] shadow-2xl rounded-3xl relative left-10 top-3'>
                    <div className="relative -right-72 top-5 w-[200px] m-auto">
                        <Image
                            src={"/keywords_im.svg"}
                            alt={" "}
                            height={400}
                            width={400}
                        />
                    </div>
                    <h1 className='text-[#050938] text-[28px] font-medium w-2/3 relative left-12 -top-16'>Your Church’s Domain Keywords in Organic Search</h1>
                    <h2 className='text-[#75778B] text-[18px] font-regular w-3/4 relative left-12 -top-10' >The top 8 keywords or phrases your website is known for by Google and other search engines</h2>
                    <div className='relative -right-12 bottom-4'>
                        {keywords.length > 0 && (
                            <div className="grid grid-cols-2 gap-4">
                                <ul className='text-xl text-blue-600'>
                                {keywords.slice(0, Math.floor(keywords.length / 2)).map((keyword) => (
                                    <li key={keyword}>{keyword}</li>
                                ))}
                                </ul>
                                <ul className='text-xl text-blue-600'>
                                {keywords.slice(Math.floor(keywords.length / 2)).map((keyword) => (
                                    <li key={keyword}>{keyword}</li>
                                ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    
                </div>

            
            </div>
           

    )
}