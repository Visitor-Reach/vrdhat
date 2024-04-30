"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import 'next/router'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import './page.css';

export default function Page() {
  const church_sizes = ['0-100', '100-300', '300-500', '500-1000', '+1000', '2,000-4,999', '5,000-9,999', '10,000+']
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [showAnimation, setShowAnimation] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [map, setMap] = useState('')
 
  const [email, set_email] = useState('')
  
  useEffect(() => {
    if (submitted) {
      const timeoutId = setTimeout(() => {
        setShowAnimation(true)
        router.push("/user_report?user_key="+email+"&map_key="+map)
    }, 8000)
        
      return () => clearTimeout(timeoutId)
    }
  }, [submitted])
 
  const LoadingAnimation = () => {
    
    return (
        <div className="pt loading flex-grow flex flex-col justify-center items-center">
            
            <div className=' '>
                <Player
                    autoplay
                    loop
                    src="/Message Loading 1.json"
                    style={{ width: '100%' }}
                >
                <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
                </Player>
            </div>
        </div>
    )
  }
 
  async function onSubmit(event) {
    event.preventDefault()
 
    try {
      setIsSubmitting(true)
      console.log("submitted form")
      
      
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", "*")
      const churchInfo = JSON.stringify({
        "firstName": event.target.elements.firstName.value,
        "lastName": event.target.elements.lastName.value,
        "mobilePhone": event.target.elements.mobilePhone.value,
        "email": event.target.elements.email.value,
        "churchName": event.target.elements.churchName.value,
        "churchWebsite": event.target.elements.churchWebsite.value,
        "churchSize": event.target.elements.churchSize.value,
        "churchPhone": event.target.elements.churchPhone.value,
        "churchAddress": event.target.elements.churchAddress.value,
        "churchState": event.target.elements.churchState.value,
        "churchCity": event.target.elements.churchCity.value,
        "churchZipCode": event.target.elements.churchZipCode.value,
        "churchFacebook": event.target.elements.churchFacebook.value,
        "churchInstagram": event.target.elements.churchInstagram.value
      });
      set_email(event.target.elements.email.value)
      console.log(churchInfo)
       const response = await fetch('http://localhost:8080/submit-form', {
        method: 'POST',
        body: churchInfo,
        headers: myHeaders,
      })
     
      const data = await response.json()
      setMap(data.map_index)


      setSubmitted(true)
    } catch (error) {
      console.error(error)
    } finally {
    //   setIsSubmitting(false)
      
    }
  }
 
  return (
    <div id='loading_page' className="m-auto  justify-center min-h-screen flex flex-col mt-20">
        {isLoading ? (
            <div className="pt loading flex-grow flex flex-col justify-center items-center">
                <div className='flex flex-col items-center w-2/12'>

                </div>
    
            </div>
      ) : isSubmitting ? (
<LoadingAnimation />
      ) : (
<form onSubmit={onSubmit}>
  <div className="flex flex-col justify-center items-center text-2xl text-vr-form-title font-medium">
    <h1 className="w-2/3 text-vr-form-title max-md:text-4xl text-6xl">Let's get some information for your report</h1>
    <div className='fields-container m-auto flex flex-wrap rounded-2xl bg-white border-solid border-2 border-slate-200  max-md:w-full w-10/12 overflow-hidden'>
      <div className="flex flex-wrap m-auto w-full p-[10px] gap-5">
        <div className="form-page-input-row-2-elements">
          <input className="form-page-input" type=" text" name="firstName" placeholder="First Name" />
          <input className="form-page-input" type=" text" name="lastName" placeholder="Last Name" />
        </div>
        <div className="form-page-input-row-2-elements">
          <input className="form-page-input" type=" text" name="mobilePhone" placeholder="Mobile Phone" />
          <input className="form-page-input" type=" text" name="email" placeholder="Email"/>
        </div>
        <div className="form-page-input-row-2-elements">
            <input className="form-page-input" type=" text" name="churchName" placeholder="Church Name"/>
            <input className="form-page-input" type=" text" name="churchWebsite" placeholder="Church Website"/>
        </div>
        <div className="form-page-input-row-2-elements">
            <select className="form-page-input" name="churchSize">
                <option value=""> Church Size </option>
                {church_sizes.map((church_sizes) => (
                    <option key={church_sizes} value={church_sizes}>
                        {church_sizes}
                    </option>
                ))}
            </select>
            <input className="form-page-input" type=" text" name="churchPhone" placeholder="Church Phone"/>
        </div>
        <div className="form-page-input-row-1-element">
            <input className="form-page-input-full" type=" text" name="churchAddress" placeholder="Church Address"/>
        </div>
        <div className="form-page-input-row-3-elements">
            <input className="form-page-input-sm" type=" text" name="churchState" placeholder="State"/>
            <input className="form-page-input-sm" type=" text" name="churchCity" placeholder="City"/>
            <input className="form-page-input-sm" type=" text" name="churchZipCode" placeholder="Zip Code"/>
        </div>
        <div className="form-page-input-row-2-elements">
            <input className="form-page-input" type=" text" name="churchInstagram" placeholder="Church Instagram Handle"/>
            <input className="form-page-input" type=" text" name="churchFacebook" placeholder="Church Facebook Handle"/>
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