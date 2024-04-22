'use client'

import 'next/router'

import { Controls, Player } from '@lottiefiles/react-lottie-player'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Page() {
  const church_sizes = ['0-99', '100-299', '300-499', '500-999', '1,000-1,999', '2,000-4,999', '5,000-9,999', '10,000+']
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [showAnimation, setShowAnimation] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [email, set_email] = useState('')

  useEffect(() => {
    if (submitted) {
      const timeoutId = setTimeout(() => {
        setShowAnimation(true)
        router.push('/user_report?user_key=' + email)
      }, 8000)

      return () => clearTimeout(timeoutId)
    }
  }, [submitted])

  const LoadingAnimation = () => {
    return (
      <div className="pt loading flex-grow flex flex-col justify-center items-center">
        <div className="relative">
          <Player autoplay loop src="/Message Loading 1.json" style={{ width: '800px', height: '800px' }}>
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
      console.log('submitted form')

      /* const formData = new FormData(event.currentTarget)
 
       const response = await fetch(process.env.NEXT_PUBLIC_API_ROOT + '/submit-form', {
        method: 'POST',
        body: formData,
      })
      console.log(formData)
      const data = await response.json() 
      console.log(data) */
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      myHeaders.append('Access-Control-Allow-Origin', '*')
      const churchInfo = JSON.stringify({
        firstName: event.target.elements.firstName.value,
        lastName: event.target.elements.lastName.value,
        mobilePhone: event.target.elements.mobilePhone.value,
        email: event.target.elements.email.value,
        churchName: event.target.elements.churchName.value,
        churchWebsite: event.target.elements.churchWebsite.value,
        churchSize: event.target.elements.churchSize.value,
        churchPhone: event.target.elements.churchPhone.value,
        churchAddress: event.target.elements.churchAddress.value,
        churchState: event.target.elements.churchState.value,
        churchCity: event.target.elements.churchCity.value,
        churchZipCode: event.target.elements.churchZipCode.value,
        churchFacebook: event.target.elements.churchFacebook.value,
        churchInstagram: event.target.elements.churchInstagram.value,
      })
      set_email(event.target.elements.email.value)
      console.log(churchInfo)
      const response = await fetch(process.env.NEXT_PUBLIC_API_ROOT + '/submit-form', {
        method: 'POST',
        body: churchInfo,
        headers: myHeaders,
      })

      const data = await response.json()

      setSubmitted(true)
    } catch (error) {
      console.error(error)
    } finally {
      //   setIsSubmitting(false)
    }
  }

  return (
    <div id="loading_page" className="m-auto justify-center min-h-screen flex flex-col mt-20">
      {isLoading ? (
        <div className="pt loading flex-grow flex flex-col justify-center items-center">
          <div className="flex flex-col items-center w-2/12"></div>
        </div>
      ) : isSubmitting ? (
        <LoadingAnimation />
      ) : (
        <form onSubmit={onSubmit}>
          <div className="">
            <h1 className="relative tablet-vertical:top-36 phone:top-20 phone::left-20 tablet-vertical:left-44 tablet-vertical:text-6xl phone:text-2xl w-2/3 text-vr-form-title font-medium">
              Let's get some information for your report
            </h1>
            <div className="m-auto mt-60 flex flex-wrap rounded-2xl bg-white border-solid border-2 border-slate-200  w-5/6">
              <div className="flex flex-wrap m-auto w-full phone:gap-1 ">
                <div className="grid grid-cols-2 m-auto justify-center justify-items-center w-10/12 mt-5 gap-5">
                  <input
                    className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400"
                    type=" text"
                    name="firstName"
                    placeholder="First Name"
                  />
                  <input
                    className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400"
                    type=" text"
                    name="lastName"
                    placeholder="Last Name"
                  />
                </div>
                <div className="grid grid-cols-2 m-auto justify-center justify-items-center  w-10/12 mt-5 gap-5">
                  <input
                    className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400"
                    type=" text"
                    name="mobilePhone"
                    placeholder="Mobile Phone"
                  />
                  <input
                    className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400"
                    type=" text"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="grid grid-cols-2 m-auto justify-center justify-items-center  w-10/12 mt-5 gap-5">
                  <input
                    className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400"
                    type=" text"
                    name="churchName"
                    placeholder="Church Name"
                  />
                  <input
                    className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400"
                    type=" text"
                    name="churchWebsite"
                    placeholder="Church Website"
                  />
                </div>
                <div className="grid grid-cols-2 m-auto justify-center justify-items-center  w-10/12 mt-5 gap-5">
                  <select
                    className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400"
                    name="churchSize"
                  >
                    <option value=""> Church Size </option>
                    {church_sizes.map((church_sizes) => (
                      <option key={church_sizes} value={church_sizes}>
                        {church_sizes}
                      </option>
                    ))}
                  </select>
                  <input
                    className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400"
                    type=" text"
                    name="churchPhone"
                    placeholder="Church Phone"
                  />
                </div>
                <div className="grid grid-cols-1 m-auto justify-center  w-10/12 mt-5 gap-5">
                  <input
                    className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-1full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400"
                    type=" text"
                    name="churchAddress"
                    placeholder="Church Address"
                  />
                </div>
                <div className="grid grid-cols-3 m-auto justify-center justify-items-center  w-10/12 mt-5 gap-5">
                  <input
                    className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400"
                    type=" text"
                    name="churchState"
                    placeholder="State"
                  />
                  <input
                    className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400"
                    type=" text"
                    name="churchCity"
                    placeholder="City"
                  />
                  <input
                    className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400"
                    type=" text"
                    name="churchZipCode"
                    placeholder="Zip Code"
                  />
                </div>
                <div className="grid grid-cols-2 m-auto justify-center justify-items-center  w-10/12 mt-5 gap-5">
                  <input
                    className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400"
                    type=" text"
                    name="churchInstagram"
                    placeholder="Church Instagram Handle"
                  />
                  <input
                    className="pl-5 rounded-3xl h-16 phone:text-sm phone:h-10 phone:w-full tablet-vertical:text-xl tablet-vertical:w-full bg-vr-form-field-bg border-2 border-vr-form-field-border text-slate-400"
                    type=" text"
                    name="churchFacebook"
                    placeholder="Church Facebook Handle"
                  />
                </div>
                <div className="pt-10 w-10/12 m-auto">
                  <label className="phone:text-sm tablet-vertical:text-2xl text-slate-700">
                    By submitting this form, you agree to VisitorReach's{' '}
                    <Link
                      href="https://www.visitorreach.com/terms-of-use"
                      className="phone:text-md tablet-vertical:text-2xl font-bold hover:text-blue-500 text-slate-700"
                    >
                      Terms of Use
                    </Link>
                    , 
                    <Link
                      href="https://www.visitorreach.com/privacy-policy"
                      className="phone:text-md tablet-vertical:text-2xl font-bold hover:text-blue-500 text-slate-700"
                    >
                      Privacy Policy
                    </Link>
                    , and VisitorReach contacting you via text and email.
                  </label>
                </div>
              </div>
              <div className="pt-10 pl-10 pb-10">
                <button
                  className="w-60 h-14 rounded-full text-white text-2xl bg-vr-title-second hover:bg-slate-100 hover:text-vr-title-second hover:shadow-sm"
                  type="submit"
                >
                  Create Report
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
