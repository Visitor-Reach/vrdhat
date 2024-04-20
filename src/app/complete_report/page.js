"use client"
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import NavBar from "./components/navbar.js"
import Circularbar from "../../app/components/Circularbar1.js";
import Link from 'next/link.js';
import Summary from "../../app/components/ScoreSummarySimple.js"
import { useSearchParams } from 'next/navigation'

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
            console.log('Sucess fetching data: ', data)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, []);

    return (
        <div className="">
            <div id="cr_page1" className="relative w-full h-[100vh] bg-white">
                <div className="">
                    <div className="absolute left-[71px] top-[93px]">
                        <Image
                            src={"/full_report_logo.svg"}
                            alt={" "}
                            height={400}
                            width={400}
                        />
                    </div>
                    <div className="absolute right-[0px] top-[426px] w-1/2 bg-clip-content">
                        <Image
                            src={"/Omnichannel.png"}
                            alt={" "}
                            height={700}
                            width={1000}
                        />
                    </div>
                    
                    <h2 className="absolute left-[78px] top-[303px] text-[60px] font-medium bg-gradient-to-br from-[#6ECAF8] via-[#0179FF] via-50% to-[#2246E2] inline-block text-transparent bg-clip-text">Digital Health Assessment</h2>
                    <h1 className="absolute left-[71px] top-[381px] text-black text-[140px] font-medium">{church_name}</h1>
                    <div className="">
                        <div className="">
                            <div className="absolute left-[89px] top-[574px] w-[21.8px]">
                                <Image
                                    src={"/location_icon.svg"}
                                    alt={" "}
                                    height={400}
                                    width={400}
                                />
                            </div>
                            <p  className="absolute left-[129px] top-[570px] text-[#75778B] text-[30px] font-medium">{loc_address}, {loc_city}, {loc_state} {loc_zipcode}</p>
                        </div>
                        <div className="absolute left-[89px] top-[635px] w-[23.8px] text-[#75778B] text-[30px] font-medium">
                            <Image
                                src={"/website_icon.svg"}
                                alt={" "}
                                height={400}
                                width={400}
                            />
                        </div>
                        <p className="absolute left-[129.5px] top-[625px] text-[#75778B] text-[30px] font-medium">{webpage}</p>
                        
                    </div>
                    <p className="block w-full absolute left-[89px] bottom-[100px] text-[#75778B] text-[20px] font-medium"> Assessment performed on <span className="font-semibold">{today.toDateString()}</span> </p>
                </div>
            </div>
            <div id="cr_page2" className="relative w-full h-[100vh] bg-[url('/img-bg-page1.png')] bg-cover">
                <div className="relative w-full h-[100vh] bg-gradient-to-br from-white from-10% to-white/30">
                    <h1 className="absolute left-[107px] top-[110px] text-[#050938] text-[75px] font-medium w-4/6">Did you know there are <span className="text-[#0179FF]">{last_month_searches} monthly</span> Google searches for “churches near me” in <span className="text-[#0179FF]">{loc_city}, {loc_state}</span>?</h1>
                    <h2 className="absolute left-[107px] bottom-60 text-[#292A36] text-[40px] font-regular w-4/6">How many of those seekers find your church?</h2>
                </div>
                <div className="absolute right-[100px] bottom-[70px] w-[239px]">
                    <Image
                        src={"/full_report_logo.svg"}
                        alt={" "}
                        height={400}
                        width={400}
                    />
                </div>
            </div>
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
                        {/* <NavBar></NavBar> */}
                    </div>
                    
                    
                </div>
                <div className='col-span-4 flex flex-col justify-center justify-items-center'>
                    <div className="bg-white w-5/6 h-3/6 rounded-3xl m-auto shadow-2xl">
                        <div className="relative m-auto w-[120px] top-10">
                            <Image
                                src={"/homepod.svg"}
                                alt={" "}
                                height={400}
                                width={400}
                            />
                        </div>
                        <h1 className='font-medium text-[25px] text-[#050938] w-10/12 text-center m-auto relative top-20'>What Is <span className="text-[#0179FF]">Voice Search</span> & Why It’s Important</h1>
                        <h2 className='font-medium text-[15px] text-[#75778B] w-10/12 text-center m-auto relative top-24'>
                            Voice technology allows people to perform a hands-free search by asking questions to their smart devices such as smartphones, smart speakers, and in-car systems. Your church’s Digital Voice Score shows how optimized your digital presence is when it comes to showing up in voice search results.
                        </h2>
                    </div>
                    <div className="bg-white w-5/6 h-2/6 rounded-3xl m-auto shadow-2xl bg-[url('/woman-background.png')] bg-cover">
                        <h1 className='relative text-white w-2/3 ml-10 text-[80px]'>57%</h1>
                        <h2 className='relative text-white w-2/3 ml-10 text-[20px]'>of American adults use voice assistants on their devices to find out information on a daily basis.</h2>
                        <h3 className='relative text-white w-2/3 ml-10 mt-10 text-[14px]'>Source: NPR</h3>
                    </div>

                    
                </div>
                <div className='col-span-3 flex flex-col justify-center justify-items-center'>
                    <div className="bg-white w-5/6 h-11/12 rounded-3xl ml-[0px] shadow-2xl">
                        <h1 className='relative text-[#050938] w-2/3 m-auto text-center font-bold text-[32px] justify-center justify-items-center'>Your Digital Voice Score</h1>
                        <div className='relative m-auto grid justify-center mt-10'>
                            <Circularbar value={digitalVoice} title={undefined} max_value={250}/>
                        </div>
                        <div className="relative m-auto grid justify-center mt-0 w-[130px]">
                            <Image
                                src={"/2p_church.svg"}
                                alt={" "}
                                height={400}
                                width={400}
                            />
                        </div>
                        <h1 className='text-[#050938] text-[20px] font-medium relative m-auto grid justify-center mt-5'>Only 2% of churches</h1>
                        <h2 className='text-[#75778B] text-[15px] font-regular relative m-auto grid justify-center w-4/6 mt-5'>
                            are optimized for voice search. If your church’s digital presence isn’t optimized for voice search, people won’t be able to find and visit your church!
                        </h2>
                        
                        <Link href={{pathname:"www.visitorreach.com"}}>
                            <h3 className='text-[#0179FF] text-[12px] font-regular relative m-auto grid justify-center w-4/6 mt-5 pb-10'>
                                Source: VisitorReach
                            </h3>
                        </Link>
                        

                    </div>
                </div>
            </div>

            <div id="cr_page4" className="relative w-full h-[100vh] grid grid-cols-9 grid-rows-2 justify-center bg-white" >
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
                        {/* <NavBar></NavBar> */}
                    </div>
                    
                    
                </div>
                <div className="relative col-span-2">
                    <div className="w-full h-full bg-[url('/Bounds.png')] bg-cover">
                        <h1 className='relative top-48 text-white w-2/3 ml-10 text-[26px] font-medium'>
                            People in the U.S. search for “churches near me” over <span className='text-[#0179FF]'>1 million </span>times each month
                        </h1>
                    </div>
                </div>
                <div className="relative  col-span-2 ">
                    <div className="w-full h-full bg-[url('/sample_map.png')] bg-cover rounded-3xl shadow-2xl">
                        <h1 className='relative top-14 text-[#050938] w-2/3 ml-10 text-[26px] font-medium'>
                            Nearly <span className='text-[#0179FF]'>2 billion </span>people use Google Maps every month
                        </h1>
                    </div>
                </div>
                <div className="relative col-span-2 h-full w-11/12  rounded-3xl shadow-2xl">
                    <div className='flex'>
                        <div className="relative top-10 left-5 w-[40px]">
                            <Image
                                src={"/google_maps.svg"}
                                alt={" "}
                                height={400}
                                width={400}
                            />
                        </div>
                        <h1 className='relative top-8 left-12 text-[20px] font-medium text-[#050938] w-4/6'>
                            Your Google Maps Search Score
                        </h1>
                    </div>
                    <div className='relative m-auto grid justify-center top-10'>
                        <Circularbar value={googleMaps} title={undefined} max_value={250}/>
                    </div>
                </div>
                <div className="relative ">
                </div>
                <div className="relative col-span-4 justify-center justify-items-center shadow-2xl rounded-3xl">
                    <div className="relative top-5 w-[180px] m-auto">
                        <Image
                            src={"/pin_map.svg"}
                            alt={" "}
                            height={400}
                            width={400}
                        />
                    </div>
                    <h1 className='relative top-14 text-[#050938] w-2/3 left-0 text-[28px] font-medium text-center m-auto'>
                        What is your <span className='text-[#0179FF]'>Digital Maps </span>Score & Why it’s Important
                    </h1>
                    <h2 className='relative top-14 text-[#75778B] w-2/3 left-0 text-[18px] font-medium text-center m-auto'>
                        From where we eat to where we visit, digital maps are more important in our lives than ever before. The Digital Maps Score reflects how likely your church is to show up on these digital navigation apps when someone searches for “churches near me,” If your church information isn’t listed correctly, they won’t find you.
                    </h2>
                </div>
                <div className="relative col-span-2 h-full w-11/12  rounded-3xl shadow-2xl">
                    <div className='flex'>
                        <div className="relative top-10 left-5 w-[40px]">
                            <Image
                                src={"/google_maps.svg"}
                                alt={" "}
                                height={400}
                                width={400}
                            />
                        </div>
                        <h1 className='relative top-8 left-12 text-[20px] font-medium text-[#050938] w-3/6'>
                            Your Apple Maps Search Score
                        </h1>
                    </div>
                    <div className='relative m-auto grid justify-center top-10'>
                        <Circularbar value={appleMaps} title={undefined} max_value={250}/>
                    </div>
                </div>


            </div>

            <div id="cr_page6" className="relative w-full h-[100vh] grid grid-cols-9 grid-rows-2 justify-center bg-white" >
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
                        {/* <NavBar></NavBar> */}
                    </div>
                    
                    
                </div>

                <div className='col-span-4  rounded-3xl justify-center justify-items-center shadow-2xl'>
                    <div className="relative top-10 w-[120px]  m-auto">
                        <Image
                            src={"/authority_im.svg"}
                            alt={" "}
                            height={400}
                            width={400}
                        />
                    </div>
                    <h1 className='relative top-20 text-[#050938] w-2/3 left-0 text-[26px] font-medium text-center m-auto'>
                        Why your <span className='text-[#0179FF]'>Website Authority Score </span>is Important
                    </h1>
                    <h2 className='relative top-24 text-[#75778B] w-5/6 left-0 text-[18px] font-medium text-center m-auto'>
                        The #1 organic result is 10x more likely to receive a click compared to #10 spot. This makes having a well-ranking website extremely important. A strong online presence leads to more people finding your church, identifying with your mission and culture, and visiting your church.
                    </h2>
                    <h3 className='text-[#0179FF] text-[15px] font-regular relative top-28 left-80'> Source: backlinko </h3>


                </div>

                <div className='col-span-2  rounded-3xl shadow-2xl'>
                    <h1 className='relative top-12 text-[22px] font-medium text-[#050938] w-4/6 m-auto text-center'>
                        Your Church Website Authority Score
                    </h1>
                    <div className='relative m-auto grid justify-center top-12'>
                        <Circularbar value={websiteAuthority} title={undefined} max_value={250}/>
                    </div>
                </div>
                <div className=''>

                </div>

                <div className="col-span-2 bg-[url('/computer_im.png')] bg-cover w-full h-full  shadow-2xl">
                    <div className="relative w-full h-[100vh] bg-gradient-to-br from-[#11133F] from-10% to-white/30 rounded-3xl ">
                        <h1 className='relative top-36 text-white w-2/3 ml-10 text-[26px] font-medium'>
                            9 out of 10 people will visit your church website before ever visiting in-person
                        </h1>
                    </div>
                </div>
                <div className='col-span-4 w-full h-full  shadow-2xl rounded-3xl'>
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

                    
                </div>

                <div className=''>

                </div>
                
            </div>

            <div id="cr_page7" className='relative w-full h-[100vh] grid grid-cols-9 grid-rows-2 justify-center bg-white'>
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
                        {/* <NavBar></NavBar> */}
                    </div>
                    
                </div>
                
                    
                <div className='col-span-4' style={{zoom : "0.9"}}>
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
                
                <div className='col-span-2 row-span-2 rounded-3xl shadow-2xl justify-center justify-items-center m-auto'>
                    <h1 className='text-[24px] text-[#050938] relative top-16 left-0 font-medium text-center'>Your Church’s Total Digital Health Score</h1>
                    <div className='relative m-auto grid justify-center top-20'>
                        <Circularbar value={digitalVoice + googleMaps + appleMaps + socialClarity + websiteAuthority} title={undefined} max_value={1000}/>
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
                <div className="col-span-4 bg-[url('/summary_im.webp')] bg-cover rounded-3xl shadow-2xl">
                    <div className="relative w-full h-[100vh] bg-gradient-to-br from-[#050938] from-10% to-white/10 rounded-3xl">
                        <h1 className='text-white text-[24px] font-regular relative top-20 -left-5 w-2/3 m-auto'>
                            What can your church do to improve your digital outreach strategy to engage those who are lost, hurting, and seeking the truth of the gospel message?
                        </h1>
                    </div>
                </div>
            </div>

            <div id="cr_page8" className='relative w-full h-[100vh] grid grid-cols-9 grid-rows-9 justify-center bg-white overflow-hidden'>
                <div className="absolute left-[40px] top-[77px] w-[200px] ">
                    <Image
                        src={"/full_report_logo.svg"}
                        alt={" "}
                        height={400}
                        width={400}
                    />
                </div>
                <div className="relative col-span-2 row-span-9 ">   
                    <div style={{zoom: 0.8}}>
                        {/* <NavBar></NavBar> */}
                    </div>
                    
                </div>
                <div className='col-span-7 row-span-3 contain-strict'>
                    <h1 className='text-[#0179FF] text-[45px] font-medium relative left-14 top-10'>VisitorReach™<span className='text-[#050938]'>—Your Digital Outreach Platform</span></h1>
                    <h2 className='text-[18px] font-regular text-[#050938] relative m-auto top-20 text-center w-11/12'>
                        VisitorReach is much more than just a website optimization platform or advertising agency. It’s a digital outreach program empowering pastors to have continual and consistent 1:1 SMS <span className='text-[#0179FF]'>conversations with seekers and new people to your city</span>. Churches that partner with VisitorReach average 40–160 new conversations every month and see new visitors walking through their doors every week.
                    </h2>
                </div>
                <div className='col-span-7 row-span-2'>
                    <div className='flex justify-center justify-items-center gap-20'>
                        <div className="w-[500px] shadow-2xl rounded-2xl">
                            <Image
                                src={"/culture.svg"}
                                alt={" "}
                                height={800}
                                width={800}
                            />
                        </div>
                        <div className="w-[500px] shadow-2xl rounded-2xl">
                            <Image
                                src={"/house.svg"}
                                alt={" "}
                                height={800}    
                                width={800}
                            />
                        </div>
                    </div>
                </div>
                <div className='col-span-7 row-span-4 relative left-14 top-10'>
                    <h1 className='text-[#0179FF] text-[45px] font-medium '>
                        The VisitorReach Process - 
                    </h1>
                    <h1 className='text-[45px] font-medium text-[#050938]'>Created for Pastors, by Pastors</h1>
                    <div className="w-[1200px] relative -top-80 -left-24">
                            <Image
                                src={"/footer.svg"}
                                alt={" "}
                                height={2000}    
                                width={2000}
                            />
                        </div>
                </div>
                
            </div>

            <div id="cr_page9" className='relative w-full h-[100vh] grid grid-cols-2 overflow-hidden'>

                <div className='w-full h-full'>
                    <div className="relative left-[116px] top-[74px] w-[300px]">
                        <Image
                            src={"/Logo.svg"}
                            alt={" "}
                            height={600}
                            width={600}
                        />
                    </div>
                    
                    <div className='w-4/6 relative top-40 left-32'>
                        <h1 className = "lg:text-[60px] md:text-[60px] sm:text-[30px] text-[#050938] font-medium relative block">Grow Your <span className = "text-[#0179FF]">Church</span> with VisitorReach</h1>

                        <p className="2xl:text-[35px] xl:text-2xl md:text-[20px] sm:text-[20px] text-[#75778B] relative top-20">
                                    
                            To learn more about VisitorReach, 
                            <span className="text-[#0179FF] "> 
                                <Link href = {{pathname:"https://connect.visitorreach.com/digital-health-follow-up"}}>    
                                    schedule<br />a quick 15 minute call
                                </Link > 
                                
                            </span>  with our team today.
                        </p>
                    </div>
                    <div className="relative 2xl:top-[300px] 2xl:left-32 w-[200px] xl:top-[30vh] xl:left-[20vw]">
                        <Image
                            src={"/QR.svg"}
                            alt={" "}
                            height={600}
                            width={600}
                        />
                    </div>

                </div>
                <div className='relative w-full h-full'>
                    
                    <div className="relative 2xl:left-[25vw] 2xl:-top-[0vh] 2xl:w-[40vw] 2xl:visible xl:visible md:hidden ">
                        <Image
                            src={"/guzman.svg"}
                            alt={" "}
                            height={600}
                            width={600}
                        />
                    </div>
                    <div className="relative 2xl:visible 2xl:-right-[0vw] 2xl:bottom-[0vh] 2xl:w-[20vw] xl:w-[30vw] xl:top-[40vh]  xl:right-[0vw]  md:w-[10vw]">
                        <Image
                            src={"/app_messages.svg"}
                            alt={" "}
                            height={600}
                            width={600}
                        />
                    </div>
                </div>

                
            </div>
            
          
           
        </div>
    )
}