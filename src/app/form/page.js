'use client'

import 'next/router'
import './page.css'

import { Controls, Player } from '@lottiefiles/react-lottie-player'
import React, { useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Page() {
  const church_sizes = ['0-100', '100-300', '300-500', '500-1000', '+1000', '2,000-4,999', '5,000-9,999', '10,000+']
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [showAnimation, setShowAnimation] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [id, setId] = useState('')

  const [email, set_email] = useState('')

  const states = [
    { id: 'AL', title: 'Alabama' },
    { id: 'AK', title: 'Alaska' },
    { id: 'AZ', title: 'Arizona' },
    { id: 'AR', title: 'Arkansas' },
    { id: 'CA', title: 'California' },
    { id: 'CO', title: 'Colorado' },
    { id: 'CT', title: 'Connecticut' },
    { id: 'DE', title: 'Delaware' },
    { id: 'FL', title: 'Florida' },
    { id: 'GA', title: 'Georgia' },
    { id: 'HI', title: 'Hawaii' },
    { id: 'ID', title: 'Idaho' },
    { id: 'IL', title: 'Illinois' },
    { id: 'IN', title: 'Indiana' },
    { id: 'IA', title: 'Iowa' },
    { id: 'KS', title: 'Kansas' },
    { id: 'KY', title: 'Kentucky' },
    { id: 'LA', title: 'Louisiana' },
    { id: 'ME', title: 'Maine' },
    { id: 'MD', title: 'Maryland' },
    { id: 'MA', title: 'Massachusetts' },
    { id: 'MI', title: 'Michigan' },
    { id: 'MN', title: 'Minnesota' },
    { id: 'MS', title: 'Mississippi' },
    { id: 'MO', title: 'Missouri' },
    { id: 'MT', title: 'Montana' },
    { id: 'NE', title: 'Nebraska' },
    { id: 'NV', title: 'Nevada' },
    { id: 'NH', title: 'New Hampshire' },
    { id: 'NJ', title: 'New Jersey' },
    { id: 'NM', title: 'New Mexico' },
    { id: 'NY', title: 'New York' },
    { id: 'NC', title: 'North Carolina' },
    { id: 'ND', title: 'North Dakota' },
    { id: 'OH', title: 'Ohio' },
    { id: 'OK', title: 'Oklahoma' },
    { id: 'OR', title: 'Oregon' },
    { id: 'PA', title: 'Pennsylvania' },
    { id: 'RI', title: 'Rhode Island' },
    { id: 'SC', title: 'South Carolina' },
    { id: 'SD', title: 'South Dakota' },
    { id: 'TN', title: 'Tennessee' },
    { id: 'TX', title: 'Texas' },
    { id: 'UT', title: 'Utah' },
    { id: 'VT', title: 'Vermont' },
    { id: 'VA', title: 'Virginia' },
    { id: 'WA', title: 'Washington' },
    { id: 'WV', title: 'West Virginia' },
    { id: 'WI', title: 'Wisconsin' },
    { id: 'WY', title: 'Wyoming' },
  ]

  useEffect(() => {
    if (submitted) {
      const timeoutId = setTimeout(() => {
        setShowAnimation(true)
        router.push('/user_report?id=' + id)
      }, 8000)

      return () => clearTimeout(timeoutId)
    }
  }, [submitted])

  const LoadingAnimation = () => {
    return (
      <div className="pt loading flex-grow flex flex-col justify-center items-center">
        <div className=" ">
          <Player autoplay loop src="/Message Loading 1.json" style={{ width: '100%' }}>
            <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
          </Player>
        </div>
      </div>
    )
  }

  async function parseAddress() {
    setTimeout(() => {
      document.getElementById('spinner1').style.display = 'block'
      const address = document.forms[0].churchAddress.value
      fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${address}&filter=countrycode:us,ca&format=json&apiKey=db974c6b48e44e5a822f9b88a9c267b1`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          if (!data || !data.results || data.results.length === 0) return
          const results = data.results
          if (results.length > 0 && results[0]?.rank?.confidence === 1) {
            const address = results[0].address_line1
            const city = results[0].city
            const state = results[0].state_code
            const zip = results[0].postcode
            document.forms[0].churchAddress.value = address
            document.forms[0].churchCity.value = city
            document.forms[0].churchState.value = state
            document.forms[0].churchZipCode.value = zip
            document.forms[0].churchAddress.style.border = '2px solid rgb(228, 231, 234)'
            document.forms[0].churchZipCode.style.border = '2px solid rgb(228, 231, 234)'
            document.forms[0].churchState.style.border = '2px solid rgb(228, 231, 234)'
            document.forms[0].churchCity.style.border = '2px solid rgb(228, 231, 234)'
          }
        })
        .catch((error) => {
          console.log('error', error)
        })
        .finally(() => {
          document.getElementById('spinner1').style.display = 'none'
        })
    }, 4)
  }

  async function lookupZipCode(event) {
    let zip = event.target.value
    if (!zip || !zip.trim()) return
    zip = zip.trim().toUpperCase()

    document.getElementById('spinner2').style.display = 'block'
    const country = 'US'
    fetch(`https://api.zippopotam.us/${country}/${zip.split(' ')[0]}`)
      .then((res) => {
        if (res.status == 200) {
          return res.json()
        }
      })
      .then((data) => {
        if (data && data.places && data.places.length > 0) {
          document.forms[0].churchState.value = data.places[0]['state abbreviation']
          document.forms[0].churchCity.value = data.places[0]['place name']
          document.forms[0].churchState.style.border = '2px solid rgb(228, 231, 234)'
          document.forms[0].churchCity.style.border = '2px solid rgb(228, 231, 234)'
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
      .finally(() => {
        document.getElementById('spinner2').style.display = 'none'
      })
  }

  function getFormErrors() {
    let errors = []
    const form = document.forms[0]
    const firstName = form.firstName.value
    const lastName = form.lastName.value
    const mobilePhone = form.mobilePhone.value
    const email = form.email.value
    const churchName = form.churchName.value
    const churchWebsite = form.churchWebsite.value
    const churchSize = form.churchSize.value
    const churchPhone = form.churchPhone.value
    const churchAddress = form.churchAddress.value
    const churchState = form.churchState.value
    const churchCity = form.churchCity.value
    const churchZipCode = form.churchZipCode.value
    const churchFacebook = form.churchFacebook.value
    const churchInstagram = form.churchInstagram.value
    const role = form.role.value

    if (!firstName || !firstName.trim()) {
      errors.push({ msg: 'First Name is required', field: 'firstName' })
    }
    if (!lastName || !lastName.trim()) {
      errors.push({ msg: 'Last Name is required', field: 'lastName' })
    }
    if (!mobilePhone || !mobilePhone.trim()) {
      errors.push({ msg: 'Mobile Phone is required', field: 'mobilePhone' })
    }
    if (!email || !email.trim()) {
      errors.push({ msg: 'Email is required', field: 'email' })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email && email.trim() && !emailRegex.test(email)) {
      errors.push({ msg: 'Email is the wrong format', field: 'email' })
    }
    if (!churchName || !churchName.trim()) {
      errors.push({ msg: 'Church Name is required', field: 'churchName' })
    }
    if (!churchWebsite || !churchWebsite.trim()) {
      errors.push({ msg: 'Church Website is required', field: 'churchWebsite' })
    }
    if (!churchSize || !churchSize == 'Church Size') {
      errors.push({ msg: 'Church Size is required', field: 'churchSize' })
    }
    if (!churchPhone || !churchPhone.trim()) {
      errors.push({ msg: 'Church Phone is required', field: 'churchPhone' })
    }
    if (!churchAddress || !churchAddress.trim()) {
      errors.push({ msg: 'Church Address is required', field: 'churchAddress' })
    }
    if (!churchState || !churchState == 'State') {
      errors.push({ msg: 'State is required', field: 'churchState' })
    }
    if (!churchCity || !churchCity.trim()) {
      errors.push({ msg: 'City is required', field: 'churchCity' })
    }
    if (!churchZipCode || !churchZipCode.trim()) {
      errors.push({ msg: 'Zip Code is required', field: 'churchZipCode' })
    }
    // if (!churchFacebook || !churchFacebook.trim()) {
    //   errors.push({ msg: 'Church Facebook is required', field: 'churchFacebook' })
    // }
    // if (!churchInstagram || !churchInstagram.trim()) {
    //   errors.push({ msg: 'Church Instagram is required', field: 'churchInstagram' })
    // }
    if (!role || !role.trim()) {
      errors.push({ msg: 'Your Role is required', field: 'role' })
    }

    return errors
  }

  function onInputBlur(event) {
    const errors = getFormErrors()
    const element = document.forms[0][event.target.name]
    element.style.border = '2px solid rgb(228, 231, 234)'
    if (errors.length > 0) {
      if (element && errors.find((error) => error.field === event.target.name)) {
        element.style.border = '2px solid red'
      }
    }
    // helpfully add https:// to the church website if it's missing
    if (
      document.forms[0].churchWebsite.value &&
      !document.forms[0].churchWebsite.value.startsWith('http://') &&
      !document.forms[0].churchWebsite.value.startsWith('https://')
    ) {
      document.forms[0].churchWebsite.value = 'https://' + document.forms[0].churchWebsite.value
    }
  }

  async function onSubmit(event) {
    event.preventDefault()

    try {
      setIsSubmitting(true)
      // reset field errors
      for (let i = 0; i < document.forms[0].elements.length; i++) {
        let element = document.forms[0].elements[i]
        element.style.border = '2px solid rgb(228, 231, 234)'
      }
      // validate fields
      const errors = getFormErrors()
      if (errors.length > 0) {
        errors.forEach((error) => {
          document.getElementsByName(error.field)[0].style.border = '2px solid red'
        })
        setIsSubmitting(false)
        const message = errors.map((error) => error.msg).join('\n')
        document.getElementById('dialogcontent').innerText = message
        document.querySelector('dialog').showModal()
        return
      }

      // we survived validation, let's submit the form
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
        role: event.target.elements.role.value,
      })
      set_email(event.target.elements.email.value)

      const response = await fetch(process.env.NEXT_PUBLIC_API_ROOT + '/submit-form', {
        method: 'POST',
        body: churchInfo,
        headers: myHeaders,
      })

      const data = await response.json()
      setId(data.id)

      setSubmitted(true)
    } catch (error) {
      console.error(error)
    } finally {
      //   setIsSubmitting(false)
    }
  }

  return (
    <>
      <dialog id="dialog" className="p-5 w-1/3 rounded-xl shadow-2xl text-center">
        <h1 className="text-lb mb-2 font-bold text-center">Please review &amp; update these fields...</h1>
        <p id="dialogcontent"></p>
        <button
          onClick={() => document.querySelector('dialog').close()}
          className="w-60 h-10 mt-5 rounded-full text-white text-xl bg-gray-500 hover:bg-gray-400"
          type="button"
        >
          Close
        </button>
      </dialog>

      <div id="loading_page" className="m-auto justify-center min-h-screen flex flex-col mt-20">
        {isLoading ? (
          <div className="pt loading flex-grow flex flex-col justify-center items-center">
            <div className="flex flex-col items-center w-2/12"></div>
          </div>
        ) : isSubmitting ? (
          <LoadingAnimation />
        ) : (
          <form onSubmit={onSubmit}>
            <div className="flex flex-col justify-center items-center text-2xl text-vr-form-title font-medium">
              <h1 className="w-2/3 text-vr-form-title max-md:text-4xl text-6xl">
                Let's get some information for your report
              </h1>

              <div className="fields-container m-auto flex flex-wrap rounded-2xl bg-white border-solid border-2 border-slate-200  max-md:w-full w-10/12 overflow-hidden">
                <div className="flex flex-wrap m-auto w-full p-[10px] gap-5">
                  <div className="form-page-input-row-2-elements">
                    <input
                      className="form-page-input"
                      type=" text"
                      name="firstName"
                      placeholder="First Name"
                      onBlur={onInputBlur}
                    />
                    <input
                      className="form-page-input"
                      type=" text"
                      name="lastName"
                      placeholder="Last Name"
                      onBlur={onInputBlur}
                    />
                  </div>
                  <div className="form-page-input-row-2-elements">
                    <input
                      className="form-page-input"
                      type=" text"
                      name="mobilePhone"
                      placeholder="Mobile Phone"
                      onBlur={onInputBlur}
                    />
                    <input
                      className="form-page-input"
                      type=" text"
                      name="email"
                      placeholder="Email"
                      onBlur={onInputBlur}
                    />
                  </div>
                  <div className="form-page-input-row-2-elements">
                    <input
                      className="form-page-input"
                      type=" text"
                      name="churchName"
                      placeholder="Church Name"
                      onBlur={onInputBlur}
                    />
                    <input
                      className="form-page-input"
                      type=" text"
                      name="churchWebsite"
                      placeholder="Church Website"
                      onBlur={onInputBlur}
                    />
                  </div>
                  <div className="form-page-input-row-2-elements">
                    <div className="relative phone:w-full tablet-vertical:w-full">
                      <select className="form-page-input appearance-none" name="churchSize" onBlur={onInputBlur}>
                        <option value=""> Church Size </option>
                        {church_sizes.map((church_sizes) => (
                          <option key={church_sizes} value={church_sizes}>
                            {church_sizes}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-[15px] top-[5px] text-3xl text-gray-300">&#8964;</div>
                    </div>
                    <input
                      className="form-page-input"
                      type=" text"
                      name="churchPhone"
                      placeholder="Church Phone"
                      onBlur={onInputBlur}
                    />
                  </div>
                  <div className="form-page-input-row-1-element">
                    <div className="flex-row relative">
                      <input
                        className="form-page-input"
                        type=" text"
                        name="churchAddress"
                        placeholder="Church Address"
                        onPaste={() => parseAddress(this)}
                        onBlur={onInputBlur}
                      />
                      <div id="spinner1" className="hidden absolute right-[20px] top-[16px]">
                        <div className="lds-spinner">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-page-input-row-3-elements">
                    <div className="flex-row relative phone:w-full tablet-vertical:w-full">
                      <input
                        className="form-page-input"
                        type=" text"
                        name="churchZipCode"
                        placeholder="Zip Code"
                        onBlur={(e) => {
                          onInputBlur(e)
                          lookupZipCode(e)
                        }}
                      />
                      <div id="spinner2" className="hidden absolute right-[20px] top-[16px]">
                        <div className="lds-spinner">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                    <input
                      className="form-page-input"
                      type=" text"
                      name="churchCity"
                      placeholder="City"
                      onBlur={onInputBlur}
                    />
                    <div className="relative phone:w-full tablet-vertical:w-full">
                      <select className="form-page-input appearance-none" name="churchState" onBlur={onInputBlur}>
                        <option value=""> State </option>
                        {states.map((state) => (
                          <option key={state.id} value={state.id}>
                            {state.title}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-[15px] top-[5px] text-3xl text-gray-300">&#8964;</div>
                    </div>
                  </div>
                  <div className="form-page-input-row-3-elements">
                    <input
                      className="form-page-input"
                      type=" text"
                      name="churchInstagram"
                      placeholder="Church Instagram Handle"
                      onBlur={onInputBlur}
                    />
                    <input
                      className="form-page-input"
                      type=" text"
                      name="churchFacebook"
                      placeholder="Church Facebook Handle"
                      onBlur={onInputBlur}
                    />
                    <div className="relative phone:w-full tablet-vertical:w-full">
                      <select className="form-page-input appearance-none" name="role" onBlur={onInputBlur}>
                        <option value=""> Your Role </option>
                        <option key="role_1" value="Senior leadership">Senior leadership</option>
                        <option key="role_2" value="Staff position">Staff position</option>
                        <option key="role_3" value="Member of Church">Member of Church</option>
                      </select>
                      <div className="absolute right-[15px] top-[5px] text-3xl text-gray-300">&#8964;</div>
                    </div>
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
    </>
  )
}
