
"use client";
import React, { useState, useEffect } from 'react';
import ScoreSummary from '../components/ScoreSummary';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function SimpleResult() {
  const [isLoading, setIsLoading] = useState(true);
  const [church_name, set_church_name] = useState('');
  const [digitalVoice, setDigitalVoice] = useState(0);
  const [appleMaps, setAppleMaps] = useState(0);
  const [googleMaps, setGoogleMaps] = useState(0);
  const [digitalMaps, setDigitalMaps] = useState(0);
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
  console.log(user_key)
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
        console.log(data)
  
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
 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div id='loading_page' className="m-auto justify-center justify-items-center flex flex-col w-full px-[20px]">
        <div
          id="church_result"
          className="pt-[20px] flex-grow flex flex-col justify-center items-center w-full m-auto">
          <br />
          <section id="intro" className="m-auto w-full">
            <div className='w-full'>
              <p className="text-5xl text-center font-medium">
                <span className="text-vr-form-title bg-transparent">Your church's</span>
              </p>
              <p className="text-5xl text-center font-medium">
                <span className="bg-gradient-to-r from-vr-button-first from-0% via-vr-button-second to-vr-button-third bg-clip-text text-transparent">
                  Digital Health Assessment
                </span>
              </p>
            </div>
            <div className="m-auto mb-20  text-center  pt-10  w-full">
              <p className='text-xl text-vr-body-color font-medium block text-pretty'>
                Did you know there are <span className='text-xl text-vr-title-second font-medium block'>{last_month_searches} </span> Google searches for "churches near me" in <span className='text-xl text-vr-title-second font-medium block'>{loc_city} ,  {loc_state}</span>?
              </p>
            </div>

              <div className="max-md:w-full w-[85vw] flex justify-center items-center" style={{zoom : "0.9"}}>
                  <ScoreSummary
                    digitalVoiceScore={digitalVoice}
                    digitalMapsScore={googleMaps + appleMaps}
                    socialClarityScore={socialClarity}
                    websiteAuthorityScore={websiteAuthority}
                    avgDigitalVoiceScore={vrVoice}
                    avgDigitalMapsScore={vrMaps}
                    avgSocialClarityScore={vrSocial}
                    avgWebsiteAuthorityScore={vrWebsite}  
              />
              </div>
          </section>


            


          <Link href="connect.visitorreach.com/digital-health-follow-up">
            <button className="max-md:text-1xl md:text-2xl  font-medium text-white rounded-full hover:bg-white bg-gradient-to-br from-vr-button-first via-vr-button-second to-vr-button-third hover:text-vr-button-third mt-[20px] h-16 max-md:w-full w-[550px] max-md:p-[10px] " >
              schedule a 15 minute call to learn more
            </button>
          </Link>
      </div>

    </div>
  );
}