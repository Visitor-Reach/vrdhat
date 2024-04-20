"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import 'next/router'
import { useRouter } from 'next/navigation' // Import useRouter hook
import Image from 'next/image'
import { Player, Controls } from '@lottiefiles/react-lottie-player';



export default function Page() {
    const church_sizes = ['0-99', '100-299', '300-499', '500-999', '1,000-1,999', '2,000-4,999', '5,000-9,999', '10,000+']; // Replace with your list of cities
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter() // Initialize the router
    const [showAnimation, setShowAnimation] = useState(false);
    const [submitted, setSubmitted] = useState(false); // Track form submission state

    const [church_name, set_church_name] = useState('');
    const [digitalVoice, setDigitalVoice] = useState(0);
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

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/fetch-data'); 
            const data = await response.json();
      
            set_church_name(data.church_name);
            setDigitalVoice(data.digitalVoice);
            setDigitalMaps(data.digitalMaps);
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
            setWebpage(data.website)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, []);


    useEffect(() => {
        if (submitted) {
          const timeoutId = setTimeout(() => setShowAnimation(true), 8000); // Show after 8 seconds if submitted
            console.log("time out")
          return () => clearTimeout(timeoutId);
        }
      }, [submitted]); // Re-run effect on submit state change
 
    async function onSubmit(event) {
    event.preventDefault()
    
 
    try {
        console.log("submited form")
        const formData = new FormData(event.currentTarget)
        
        const response = await fetch('http:///localhost:5000/submit-form', {
            method: 'POST',
            body: formData,
        })
        console.log(formData)
        // Handle response if necessary
        const data = await response.json()
        
        setSubmitted(true)
        // ...
        } catch (error) {
        // Handle error if necessary
        console.error(error)
        } finally {
        router.push('/user_report')
        }
  }
 
  return (
    <div id='loading_page' className="m-auto justify-center min-h-screen flex flex-col mt-20">
      {showAnimation ? (
        <div className="pt flex-grow flex flex-col justify-center items-center">
        <div className='flex flex-col items-center w-2/12'>
        <Image
                      src="message 1.svg"
                      alt="Picture of the author"
                      width={400}
                      height={400}
                    />
        </div>
         
                  <div className="mb-20  text-center  pt-40 w-5/6">
        <p className='text-2xl text-vr-body-color font-medium'>
                      Visitor Reach helps churches like yours make <a className='text-2xl text-vr-title-second font-medium block'>10 - 30 connections per week</a> with people looking for a church to attend.
        </p>
        </div>
         
                  <div className='relative'>
        <Player
                      autoplay
                      loop
                      src="https://lottie.host/e0da974d-e53a-490f-89fa-0e9f8f16c209/Je1BihubMQ.json"
                      style={{ width: '400px', height: '200px' }}
        >
        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
        </Player>
        </div>
        </div>
      ) : (
        
        <form onSubmit={onSubmit}>
        <div className="">
            <h1 className="relative tablet-vertical:top-36 phone:top-20 phone::left-20 tablet-vertical:left-44 tablet-vertical:text-6xl phone:text-2xl w-2/3 text-vr-form-title font-medium" >Let’s get some information for your report</h1>
            <div className='m-auto mt-60 flex flex-wrap rounded-2xl bg-white border-solid border-2 border-slate-200  w-5/6'>
                <div className="flex flex-wrap m-auto w-full phone:gap-1 ">
                    <div className="grid grid-cols-2 m-auto justify-center justify-items-center w-10/12 mt-5 gap-5">
                        <input className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400" type=" text" name="firstName" placeholder="First Name"/>
                        <input className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400" type=" text" name="lastName" placeholder="Last Name"/>
                    </div>
                    <div className="grid grid-cols-2 m-auto justify-center justify-items-center  w-10/12 mt-5 gap-5">
                        <input className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400" type=" text" name="mobilePhone" placeholder="Mobile Phone"/>
                        <input className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400" type=" text" name="email" placeholder="Email"/>
                    </div>
                    <div className="grid grid-cols-2 m-auto justify-center justify-items-center  w-10/12 mt-5 gap-5">
                        <input className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400" type=" text" name="churchName" placeholder="Church Name"/>
                        <input className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400" type=" text" name="churchWebsite" placeholder="Church Website"/>
                    </div>
                    <div className="grid grid-cols-2 m-auto justify-center justify-items-center  w-10/12 mt-5 gap-5">
                        <select className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400" name="churchSize">
                            <option value=""> Church Size </option>
                            {church_sizes.map((church_sizes) => (
                                <option key={church_sizes} value={church_sizes}>
                                    {church_sizes}
                                </option>
                            ))}
                        </select>
                        <input className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400" type=" text" name="churchPhone" placeholder="Church Phone"/>
                    </div>
                    <div className="grid grid-cols-1 m-auto justify-center  w-10/12 mt-5 gap-5">
                        <input className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-1full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400" type=" text" name="churchAddress" placeholder="Church Address"/>
                    </div>
                    <div className="grid grid-cols-3 m-auto justify-center justify-items-center  w-10/12 mt-5 gap-5">
                        <input className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400" type=" text" name="churchState" placeholder="State"/>
                        <input className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400" type=" text" name="churchCity" placeholder="City"/>
                        <input className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400" type=" text" name="churchZipCode" placeholder="Zip Code"/>
                    </div>
                    <div className="grid grid-cols-2 m-auto justify-center justify-items-center  w-10/12 mt-5 gap-5">
                        <input className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400" type=" text" name="churchInstagram" placeholder="Church Instagram Handle"/>
                        <input className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400" type=" text" name="churchFacebook" placeholder="Church Facebook Handle"/>
                    </div>
                    <div className='pt-10 w-10/12 m-auto'>
                        <label
                            className='phone:text-sm tablet-vertical:text-2xl text-slate-700'>By submitting this form, you agree to VisitorReach's{" "}  
                            <Link href="https://www.visitorreach.com/terms-of-use" 
                                className='phone:text-md tablet-vertical:text-2xl font-bold hover:text-blue-500 text-slate-700'>
                                    Terms of Use
                            </Link>
                                , 
                            <Link href="https://www.visitorreach.com/privacy-policy" 
                                className='phone:text-md tablet-vertical:text-2xl font-bold hover:text-blue-500 text-slate-700'>
                                     Privacy Policy
                                    </Link>
                                    , and VisitorReach contacting you via text and email.
                        </label>
                    </div>
                </div>
                <div className='pt-10 pl-10 pb-10'>
                     
                        <button className= "w-60 h-14 rounded-full text-white text-2xl bg-vr-title-second hover:bg-slate-100 hover:text-vr-title-second hover:shadow-sm" type="submit" >
                            Create Report
                        </button>

                    
                </div>
                
            </div>

            
        </div>
    </form>
        
      )}
    </div>
  );
}