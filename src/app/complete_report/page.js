'use client'

import 'bootstrap/dist/css/bootstrap.min.css' // Import bootstrap CSS

import { useEffect, useState } from 'react'

import Circularbar from '../../app/components/Circularbar1.js'
import Image from 'next/image'
import Link from 'next/link.js'
import NavBar from './components/navbar.js'
import Summary from '../../app/components/ScoreSummarySimple.js'
import { useSearchParams } from 'next/navigation'

export default function CompleteReport() {
  const timeElapsed = Date.now()
  const today = new Date(timeElapsed)
  const [isLoading, setIsLoading] = useState(true)
  const [church_name, set_church_name] = useState('')
  const [digitalVoice, setDigitalVoice] = useState(0)
  const [appleMaps, setAppleMaps] = useState(0)
  const [googleMaps, setGoogleMaps] = useState(0)
  const [socialClarity, setsocialClarity] = useState(0)
  const [websiteAuthority, setwebsiteAuthority] = useState(0)
  const [vrVoice, setvrVoice] = useState(0)
  const [vrMaps, setvrMaps] = useState(0)
  const [vrSocial, setvrSocial] = useState(0)
  const [vrWebsite, setvrWebsite] = useState(0)
  const [last_month_searches, set_last_month_searches] = useState(0)
  const [loc_city, setLoc_city] = useState('')
  const [loc_zipcode, setLoc_zipcode] = useState('')
  const [loc_address, setLoc_address] = useState('')
  const [loc_state, setLoc_state] = useState('')
  const [webpage, setWebpage] = useState('')

  const searchParams = useSearchParams()
  const user_key = searchParams.get('user_key')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append('Access-Control-Allow-Origin', '*')
        const response = await fetch(process.env.NEXT_PUBLIC_API_ROOT + '/api/fetch-data', {
          method: 'POST',
          body: JSON.stringify({ user_key: user_key }),
          headers: myHeaders,
        })

        const data = await response.json()

        set_church_name(data.church_name)
        setDigitalVoice(data.digitalVoice)
        setAppleMaps(data.appleMaps)
        setGoogleMaps(data.googleMaps)
        setsocialClarity(data.socialClarity)
        setwebsiteAuthority(data.websiteAuthority)
        setvrVoice(data.vrVoice)
        setvrMaps(data.vrMaps)
        setvrSocial(data.vrSocial)
        setvrWebsite(data.vrWebsite)
        set_last_month_searches(data.last_month_searches)
        setLoc_city(data.loc_city)
        setLoc_address(data.loc_address)
        setLoc_zipcode(data.loc_zipcodesetLoc_ziploc_zipcode)
        setLoc_state(data.loc_state)
        setWebpage(data.website)
        console.log('Sucess fetching data: ', data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div id="cr_page1" className="relative w-full h-[100vh] bg-white">
      <div id="cr_page1" className="relative min-h-screen bg-white">
        <div className="container mx-auto px-4">
          <div className="absolute left-4 md:left-8 lg:left-20 top-20 md:top-24">
            <Image src={'/full_report_logo.svg'} alt={' '} height={400} width={400} />
          </div>
          <div className="absolute right-0 top-[426px] w-full md:w-1/2">
            <Image src={'/Omnichannel.png'} alt={' '} height={700} width={1000} />
          </div>

          <h2 className="absolute h-24 left-4 md:left-8 lg:left-20 top-60 md:top-72 text-3xl md:text-4xl lg:text-5xl font-medium bg-gradient-to-br from-[#6ECAF8] via-[#0179FF] via-50% to-[#2246E2] inline-block text-transparent bg-clip-text">
            Digital Health Assessment
          </h2>
          <h1 className="absolute left-4 md:left-8 lg:left-20 top-96 md:top-[22rem] text-3xl md:text-5xl lg:text-7xl font-medium text-black">
            {church_name}
          </h1>
          <div className="absolute left-4 md:left-8 lg:left-20 top-[28rem] md:top-[34rem] flex items-center">
            <div className="w-6 md:w-8">
              <Image src={'/location_icon.svg'} alt={' '} height={400} width={400} />
            </div>
            <p className="text-base md:text-lg lg:text-xl text-[#75778B] font-medium ml-2">
              {loc_address}, {loc_city}, {loc_state} {loc_zipcode}
            </p>
          </div>
          <div className="absolute left-4 md:left-8 lg:left-20 top-[32rem] md:top-[38rem] flex items-center">
            <div className="w-6 md:w-8 text-[#75778B]">
              <Image src={'/website_icon.svg'} alt={' '} height={400} width={400} />
            </div>
            <p className="text-base md:text-lg lg:text-xl text-[#75778B] font-medium ml-2">{webpage}</p>
          </div>
          <p className="absolute left-4 md:left-8 lg:left-20 bottom-8 text-sm md:text-base lg:text-lg text-[#75778B] font-medium">
            {' '}
            Assessment performed on <span className="font-semibold">March 23, 2024</span>{' '}
          </p>
        </div>
      </div>

      <div id="cr_page2" className="relative w-full h-[100vh] bg-[url('/img-bg-page1.png')] bg-cover">
        <div className="relative w-full h-full bg-gradient-to-br from-white from-10% to-white/30">
          <div className="container mx-auto px-4">
            <h1 className="absolute left-4 md:left-8 lg:left-20 top-28 md:top-40 text-2xl md:text-4xl lg:text-5xl text-[#050938] font-medium w-3/4 md:w-2/3 lg:w-1/2">
              Did you know there are <span className="text-[#0179FF]">{last_month_searches} monthly</span> Google
              searches for "churches near me" in{' '}
              <span className="text-[#0179FF]">
                {loc_city}, {loc_state}
              </span>
              ?
            </h1>
            <h2 className="absolute left-4 md:left-8 lg:left-20 bottom-16 md:bottom-20 lg:bottom-24 text-base md:text-2xl lg:text-3xl text-[#292A36] font-regular w-3/4 md:w-2/3 lg:w-1/2">
              How many of those seekers find your church?
            </h2>
          </div>
        </div>
        <div className="absolute right-4 md:right-8 lg:right-20 bottom-8 md:bottom-12 lg:bottom-16 w-[200px]">
          <Image src={'/full_report_logo.svg'} alt={' '} height={400} width={400} />
        </div>
      </div>

      <div id="cr_page3BS" className="container m-0 p-0 border " style={{ maxWidth: 'unset ' }}>
        <div className="row ">
          <div className="col-3 bg-white">
            <div className="row">
              <div className="col-12 ml-8 mt-5 ">
                <Image src={'/full_report_logo.svg'} alt={' '} height={200} width={200} />
              </div>
            </div>
            <div className="pt-5">
              <NavBar></NavBar>
            </div>
          </div>

          <div className="col-5" style={{ background: '#f9fcfd' }}>
            <div className="col-10 bg-white mt-36 ms-auto p-9" style={{ borderRadius: '1.0em' }}>
              <div className="relative m-auto w-[120px] top-1">
                <Image src={'/homepod.svg'} alt={' '} height={100} width={100} />
              </div>
              <h1 className="font-medium text-lg sm:text-xl md:text-xl lg:text-xl text-[#050938] w-10/12 text-center m-auto relative top-5">
                What Is <a className="text-[#0179FF]">Voice Search</a> & Why It's Important
              </h1>
              <h2 className="font-medium text-sm sm:text-base md:text-sm lg:text-2x1 text-[#75778B] w-10/12 text-center m-auto relative top-6">
                Voice technology allows people to perform a hands-free search by asking questions to their smart devices
                such as smartphones, smart speakers, and in-car systems. Your church's Digital Voice Score shows how
                optimized your digital presence is when it comes to showing up in voice search results.
              </h2>
            </div>
            {/* <div className="col-10 bg-white mt-5  ms-auto p-6 bg-[url('/woman-background.png')] bg-cover" tyle={{background: '#f9fcfd'}}> */}
            <div className="col-11 bg-white ml-28 p-3 bg-cover" style={{ background: '#f9fcfd' }}>
              <Image src={'/woman-background.png'} alt={' '} height={620} width={620} />
              {/* </div> */}
              <h1 className="relative -top-64 text-white w-2/3 ml-6 text-4xl sm:text-5xl md:text-6xl mt-10">57%</h1>
              <h2 className="relative -top-64 text-white w-2/3 ml-6 text-base sm:text-sm md:text-md">
                of American adults use voice assistants on their devices to find out information on a daily basis.
              </h2>
              <h3 className="relative -top-64 text-white w-2/3 ml-5 mt-10 text-sm sm:text-base">Source: NPR</h3>
            </div>
          </div>

          <div className="col-4" style={{ background: '#f9fcfd' }}>
            <div className="bg-white  border-2 border-white-500 rounded-3xl mt-36 mr-11">
              <h1 className=" text-[#050938] w-3/3 m-auto mt-5 text-center font-bold text-xl sm:text-xl md:text-2xl">
                Your Digital Voice Score
              </h1>
              <div className=" m-auto grid justify-center">
                <Circularbar value={digitalVoice} title={undefined} max_value={250} />
              </div>
              <div className=" m-auto grid justify-center mt-2 w-[130px]">
                <Image src={'/2p_church.svg'} alt={' '} height={80} width={80} />
              </div>
              <h1 className="text-[#050938] text-base sm:text-lg md:text-xl font-medium relative m-auto grid justify-center mt-3">
                Only 2% of churches
              </h1>
              <h2 className="text-[#75778B] text-xs sm:text-sm md:text-base font-regular relative m-auto grid text-center justify-center w-5/6 mt-3">
                are optimized for voice search. If your church's digital presence isn't optimized for voice search,
                people won't be able to find and visit your church!
              </h2>
              <Link href={'https://www.visitorreach.com/'}>
                <h3 className="text-[#0179FF] text-xs sm:text-sm font-regular relative m-auto grid justify-center w-4/6 mt-4 pb-10">
                  Source: VisitorReach
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div id="cr_page4BS" className="container m-0 p-0 border " style={{ maxWidth: 'unset ' }}>
        <div className="row">
          <div className="col-3  bg-white">
            <div className="row">
              <div className="col-12 ml-8 mt-5">
                <Image src={'/full_report_logo.svg'} alt={' '} height={200} width={200} />
              </div>
            </div>
            <div className="pt-5">
              <NavBar></NavBar>
            </div>
          </div>

          <div className="col-9 pt-5" style={{ background: '#f9fcfd' }}>
            <div className="row ps-6">
              <div className="col-md-4 m-0 p-0  relative" style={{ background: '#f9fcfd' }}>
                <img src="/bounds.png" className="w-100 " />
                <h1 className=" absolute top-50 text-white p-2 ml-6 fs-6">
                  People in the U.S. search for "churches near me" over <a className="text-[#0179FF]">1 million </a>
                  times each month
                </h1>
              </div>

              <div className="col-md-4 m-0 p-0  relative" style={{ background: '#f9fcfd' }}>
                <div className="w-full h-full rounded-3xl ">
                  <img src="/sample_map.png" className="w-100 " />

                  <h1 className="absolute top-10 mt-4 ml-5 text-[#050938] fs-5">
                    Nearly <a className="text-[#0179FF]">2 billion </a>people use Google Maps every month
                  </h1>
                </div>
              </div>

              <div className="col-md-4 m-0 p-2 border border-danger relative" style={{ background: '#f9fcfd' }}>
                <div className=" rounded-3xl ">
                  <h1 className="mt-4 ml-5 text-[#050938] fs-5 flex d-inline-flex text-left">
                    <img src="/google_maps.svg" className=" me-2" />
                    Your Google Maps Search Score
                  </h1>
                  <div className="relative mx-auto d-block flex items-center ms-auto me-auto">
                    <Circularbar value={googleMaps} title={undefined} max_value={250} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-8 bg-white">
                <div className="pt-3 rounded-3xl">
                  <div className=" flex items-center ms-auto me-auto">
                    <Image src={'/pin_map.svg'} alt={' '} height={100} width={100} className="mx-auto d-block" />
                  </div>
                  <h1 className="text-[#050938] fs-4 pt-3 text-center">
                    What is your <a className="text-[#0179FF]">Digital Maps </a>Score & Why it's Important
                  </h1>
                  <h2 className=" text-[#75778B] fs-6 text-center">
                    From where we eat to where we visit, digital maps are more important in our lives than ever before.
                    The Digital Maps Score reflects how likely your church is to show up on these digital navigation
                    apps when someone searches for "churches near me," If your church information isn't listed
                    correctly, they won't find you.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative col-span-2 h-full w-11/12 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 mt-10 sm:mt-0">
          <div className="flex items-center">
            <div className="w-[40px]">
              <Image src={'/google_maps.svg'} alt={' '} height={400} width={400} />
            </div>
            <h1 className="text-[20px] sm:text-xl md:text-2xl font-medium text-[#050938] ml-2">
              Your Google Maps Search Score
            </h1>
          </div>
          <div className="relative m-auto grid justify-center top-10">
            <Circularbar value={googleMaps} title={undefined} max_value={250} />
          </div>
        </div>

        <div className="relative col-span-2 h-full w-11/12 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 mt-10 sm:mt-0">
          <div className="flex items-center">
            <div className="w-[40px]">
              <Image src={'/google_maps.svg'} alt={' '} height={400} width={400} />
            </div>
            <h1 className="text-[20px] sm:text-xl md:text-2xl font-medium text-[#050938] ml-2">
              Your Apple Maps Search Score
            </h1>
          </div>
          <div className="relative m-auto grid justify-center top-10">
            <Circularbar value={appleMaps} title={undefined} max_value={250} />
          </div>
        </div>
      </div>

      <div
        id="cr_page4"
        className="relative min-h-screen grid grid-cols-1 md:grid-cols-9 grid-rows-2 justify-center bg-white"
      >
        <div className="absolute left-4 sm:left-8 lg:left-20 top-20 sm:top-24 w-[200px]">
          <Image src={'/full_report_logo.svg'} alt={' '} height={400} width={400} />
        </div>
        <div className="relative col-span-2 row-span-2">
          <div className="mx-auto sm:zoom-80 md:zoom-90 lg:zoom-100">
            <NavBar></NavBar>
          </div>
        </div>
        <div className="relative col-span-2 mt-10 sm:mt-0">
          <div className="w-full h-full bg-[url('/Bounds.png')] bg-cover rounded-lg p-4 sm:p-6 md:p-8">
            <h1 className="relative top-48 text-white w-2/3 ml-10 text-lg sm:text-xl md:text-2xl font-medium">
              People in the U.S. search for "churches near me" over <a className="text-[#0179FF]">1 million </a>times
              each month
            </h1>
          </div>
        </div>
        <div className="relative col-span-2 mt-10 sm:mt-0">
          <div className="w-full h-full bg-[url('/sample_map.png')] bg-cover rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8">
            <h1 className="relative top-14 text-[#050938] w-2/3 ml-10 text-lg sm:text-xl md:text-2xl font-medium">
              Nearly <a className="text-[#0179FF]">2 billion </a>people use Google Maps every month
            </h1>
          </div>
        </div>
        <div className="relative col-span-2 h-full w-11/12 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 mt-10 sm:mt-0">
          <div className="flex items-center">
            <div className="w-[40px]">
              <Image src={'/google_maps.svg'} alt={' '} height={400} width={400} />
            </div>
            <h1 className="text-[20px] sm:text-xl md:text-2xl font-medium text-[#050938] ml-2">
              Your Google Maps Search Score
            </h1>
          </div>
          <div className="relative m-auto grid justify-center top-10">
            <Circularbar value={googleMaps} title={undefined} max_value={250} />
          </div>
        </div>
        <div className="relative col-span-4 justify-center justify-items-center shadow-2xl rounded-3xl p-4 sm:p-6 md:p-8 mt-10 sm:mt-0">
          <div className="relative top-5 w-[180px] m-auto">
            <Image src={'/pin_map.svg'} alt={' '} height={400} width={400} />
          </div>
          <h1 className="relative top-14 text-[#050938] w-2/3 m-auto text-xl sm:text-2xl md:text-3xl font-medium text-center">
            What is your <a className="text-[#0179FF]">Digital Maps </a>Score & Why it's Important
          </h1>
          <h2 className="relative top-14 text-[#75778B] w-2/3 m-auto text-sm sm:text-base md:text-lg font-medium text-center">
            From where we eat to where we visit, digital maps are more important in our lives than ever before. The
            Digital Maps Score reflects how likely your church is to show up on these digital navigation apps when
            someone searches for "churches near me," If your church information isn't listed correctly, they won't find
            you.
          </h2>
        </div>
        <div className="relative col-span-2 h-full w-11/12 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 mt-10 sm:mt-0">
          <div className="flex items-center">
            <div className="w-[40px]">
              <Image src={'/google_maps.svg'} alt={' '} height={400} width={400} />
            </div>
            <h1 className="text-[20px] sm:text-xl md:text-2xl font-medium text-[#050938] ml-2">
              Your Apple Maps Search Score
            </h1>
          </div>
          <div className="relative m-auto grid justify-center top-10">
            <Circularbar value={appleMaps} title={undefined} max_value={250} />
          </div>
        </div>
      </div>

      <div
        id="cr_page6"
        className="relative min-h-screen grid grid-cols-1 md:grid-cols-9 grid-rows-2 justify-center bg-white"
      >
        <div className="absolute left-4 sm:left-8 lg:left-20 top-20 sm:top-24 w-[200px]">
          <Image src={'/full_report_logo.svg'} alt={' '} height={400} width={400} />
        </div>
        <div className="relative col-span-2 row-span-2">
          <div className="mx-auto sm:zoom-80 md:zoom-90 lg:zoom-100">
            <NavBar></NavBar>
          </div>
        </div>

        <div className="col-span-4 rounded-3xl justify-center justify-items-center shadow-2xl p-4 sm:p-6 md:p-8 mt-10 sm:mt-0">
          <div className="relative top-10 w-[120px] m-auto">
            <Image src={'/authority_im.svg'} alt={' '} height={400} width={400} />
          </div>
          <h1 className="relative top-20 text-[#050938] w-2/3 m-auto text-xl sm:text-2xl md:text-3xl font-medium text-center">
            Why your <a className="text-[#0179FF]">Website Authority Score </a>is Important
          </h1>
          <h2 className="relative top-24 text-[#75778B] w-5/6 m-auto text-sm sm:text-base md:text-lg font-medium text-center">
            The #1 organic result is 10x more likely to receive a click compared to #10 spot. This makes having a
            well-ranking website extremely important. A strong online presence leads to more people finding your church,
            identifying with your mission and culture, and visiting your church.
          </h2>
          <h3 className="text-[#0179FF] text-xs sm:text-sm font-regular relative top-28 m-auto"> Source: backlinko </h3>
        </div>

        <div className="col-span-2 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 mt-10 sm:mt-0">
          <h1 className="text-[22px] sm:text-xl md:text-2xl font-medium text-[#050938] w-4/6 m-auto text-center mt-12">
            Your Church Website Authority Score
          </h1>
          <div className="relative m-auto grid justify-center top-12">
            <Circularbar value={websiteAuthority} title={undefined} max_value={250} />
          </div>
        </div>
        <div className=""></div>

        <div className="col-span-2 bg-[url('/computer_im.png')] bg-cover w-full h-full rounded-3xl shadow-2xl mt-10 sm:mt-0">
          <div className="relative w-full h-full bg-gradient-to-br from-[#11133F] from-10% to-white/30 rounded-3xl">
            <h1 className="relative top-36 text-white w-2/3 ml-10 text-lg sm:text-xl md:text-2xl font-medium">
              9 out of 10 people will visit your church website before ever visiting in-person
            </h1>
          </div>
        </div>
        <div className="col-span-4 w-full h-full shadow-2xl rounded-3xl p-4 sm:p-6 md:p-8 mt-10 sm:mt-0">
          <div className="relative -right-72 top-5 w-[200px] m-auto">
            <Image src={'/keywords_im.svg'} alt={' '} height={400} width={400} />
          </div>
          <h1 className="text-[#050938] text-xl sm:text-2xl md:text-3xl font-medium w-2/3 relative m-auto -top-16">
            Your Church's Domain Keywords in Organic Search
          </h1>
          <h2 className="text-[#75778B] text-sm sm:text-base md:text-lg font-regular w-3/4 relative m-auto -top-10">
            The top 8 keywords or phrases your website is known for by Google and other search engines
          </h2>
        </div>
      </div>

      <div
        id="cr_page7"
        className="relative min-h-screen grid grid-cols-1 md:grid-cols-9 grid-rows-2 justify-center bg-white"
      >
        <div className="absolute left-4 sm:left-8 lg:left-20 top-20 sm:top-24 w-[200px]">
          <Image src={'/full_report_logo.svg'} alt={' '} height={400} width={400} />
        </div>
        <div className="relative col-span-2 row-span-2">
          <div className="mx-auto sm:zoom-80 md:zoom-90 lg:zoom-100">
            <NavBar></NavBar>
          </div>
        </div>

        <div className="col-span-4">
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

        <div className="col-span-2 row-span-2 rounded-3xl shadow-2xl justify-center justify-items-center m-auto p-4 sm:p-6 md:p-8">
          <h1 className="text-[24px] sm:text-xl md:text-2xl text-[#050938] font-medium text-center mt-16">
            Your Church's Total Digital Health Score
          </h1>
          <div className="relative m-auto grid justify-center mt-20">
            <Circularbar
              value={digitalVoice + googleMaps + appleMaps + socialClarity + websiteAuthority}
              title={undefined}
              max_value={1000}
            />
          </div>
          <h2 className="text-[#75778B] text-sm sm:text-base md:text-lg font-regular w-5/6 m-auto text-center mt-20">
            If you're surprised by your digital health score, you are not alone. Most churches are in the same boat.
          </h2>
          <div className="relative w-[200px] m-auto mt-24">
            <Image src={'/people_im.svg'} alt={' '} height={400} width={400} />
          </div>
          <h1 className="text-[#050938] text-lg sm:text-xl md:text-2xl w-5/6 m-auto text-center mt-28">
            {' '}
            79% of churches{' '}
          </h1>
          <h2 className="text-[#75778B] text-sm sm:text-base md:text-lg font-regular w-5/6 m-auto text-center mt-36 pb-56">
            feel they don't "have a well-defined digital ministry" for engaging nonbelievers or people outside their
            church community.
          </h2>
        </div>
        <div className=""></div>
        <div className="col-span-4 bg-[url('/summary_im.webp')] bg-cover rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 mt-10 sm:mt-0">
          <div className="relative w-full h-full bg-gradient-to-br from-[#050938] from-10% to-white/10 rounded-3xl">
            <h1 className="text-white text-lg sm:text-xl md:text-2xl font-regular w-2/3 m-auto mt-20">
              What can your church do to improve your digital outreach strategy to engage those who are lost, hurting,
              and seeking the truth of the gospel message?
            </h1>
          </div>
        </div>
      </div>

      <div
        id="cr_page8"
        className="relative min-h-screen grid grid-cols-1 md:grid-cols-9 grid-rows-9 justify-center bg-white overflow-hidden"
      >
        <div className="absolute left-4 sm:left-8 lg:left-20 top-20 sm:top-24 w-[200px]">
          <Image src={'/full_report_logo.svg'} alt={' '} height={400} width={400} />
        </div>
        <div className="relative col-span-2 row-span-9">
          <div className="mx-auto sm:zoom-80 md:zoom-90 lg:zoom-100">
            <NavBar></NavBar>
          </div>
        </div>
        <div className="col-span-7 row-span-3 contain-strict p-4 sm:p-6 md:p-8">
          <h1 className="text-[#0179FF] text-2xl sm:text-3xl md:text-4xl font-medium relative m-auto">
            VisitorReach™<span className="text-[#050938]">—Your Digital Outreach Platform</span>
          </h1>
          <h2 className="text-sm sm:text-base md:text-lg font-regular text-[#050938] w-11/12 m-auto mt-20 text-center">
            VisitorReach is much more than just a website optimization platform or advertising agency. It's a digital
            outreach program empowering pastors to have continual and consistent 1:1 SMS{' '}
            <a className="text-[#0179FF]">conversations with seekers and new people to your city</a>. Churches that
            partner with VisitorReach average 40–160 new conversations every month and see new visitors walking through
            their doors every week.
          </h2>
        </div>

        <div className="col-span-7 row-span-2 flex flex-wrap justify-center items-center gap-20 mt-10 sm:mt-0">
          <div className="w-[500px] sm:w-[40%] shadow-2xl rounded-2xl p-4 sm:p-6 md:p-8">
            <Image src={'/culture.svg'} alt={' '} height={800} width={800} />
          </div>
          <div className="w-[500px] sm:w-[40%] shadow-2xl rounded-2xl p-4 sm:p-6 md:p-8">
            <Image src={'/house.svg'} alt={' '} height={800} width={800} />
          </div>
        </div>
        <div className="col-span-7 row-span-4 relative m-auto mt-10 sm:mt-0">
          <h1 className="text-[#0179FF] text-2xl sm:text-3xl md:text-4xl font-medium m-auto">
            The VisitorReach Process -
          </h1>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#050938] m-auto">
            Created for Pastors, by Pastors
          </h1>
          <div className="w-[1200px] sm:w-[90%] relative -top-80 -left-24">
            <Image src={'/footer.svg'} alt={' '} height={2000} width={2000} />
          </div>
        </div>
      </div>

      <div id="cr_page9" className="relative w-full h-[100vh] grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="w-full h-full">
          <div className="relative left-[116px] top-[74px] w-[300px] sm:w-[40%] m-auto">
            <Image src={'/logo.svg'} alt={' '} height={600} width={600} />
          </div>

          <div className="w-4/6 relative top-40 left-32 sm:m-auto sm:w-4/5 text-center">
            <h1 className="lg:text-[60px] md:text-[60px] sm:text-[30px] text-[#050938] font-medium relative block">
              Grow Your <a className="text-[#0179FF]">Church</a> with VisitorReach
            </h1>

            <p className="2xl:text-[35px] xl:text-2xl md:text-[20px] sm:text-[20px] text-[#75778B] relative top-20">
              To learn more about VisitorReach,
              <span className="text-[#0179FF] ">
                <Link href="https://www.visitorreach.com/get-started">
                  schedule
                  <br />a quick 15 minute call
                </Link>
              </span>{' '}
              with our team today.
            </p>
          </div>
          <div className="relative 2xl:top-[300px] 2xl:left-32 w-[200px] xl:top-[30vh] xl:left-[20vw] sm:w-[30%] sm:m-auto">
            <Image src={'/QR.svg'} height={600} width={600} />
          </div>
        </div>
        <div className="relative w-full h-full">
          <div className="relative 2xl:left-[25vw] 2xl:-top-[0vh] 2xl:w-[40vw] 2xl:visible xl:visible md:hidden">
            <Image src={'/guzman.svg'} alt={' '} height={600} width={600} />
          </div>
          <div className="relative 2xl:visible 2xl:-right-[0vw] 2xl:bottom-[0vh] 2xl:w-[20vw] xl:w-[30vw] xl:top-[40vh] xl:right-[0vw] md:w-[10vw] sm:w-[30%] sm:m-auto">
            <Image src={'/app_messages.svg'} alt={' '} height={600} width={600} />
          </div>
        </div>
      </div>
    </div>
  )
}
