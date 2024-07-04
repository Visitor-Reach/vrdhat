'use client'

import { useEffect, useState } from 'react'

export default function Data({ params }) {
  const [data, setData] = useState(null)

  const totalScoreRatio = (data?.digital_search_assesment_score/750)
  const voiceScoreRatio = (data?.voice_score/250)
  const googleMapsScoreRatio = (data?.google_maps_score/125)
  const appleMapsScoreRatio = (data?.apple_maps_score/125)
  const websiteAuthorityScoreRatio = (data?.domain_trust_score/250)

  useEffect(() => {
    getData(params.id).then((runData) => {
      console.log(runData)
      setData(runData)
    })
  },[])

   // Calculate colors based on progress
  const getGradientColor = (progress) => {
    // Adjust these ranges and colors as needed
    if (progress <= 0.2) {
      return '#E23D3E';
    } else if (progress <= 0.4) {
      return '#EB7E5C';
    } else if (progress <= 0.6) {
      return '#F7C780';
    } else if (progress <= 0.8) {
      return '#A8D281';
    } else {
      return '#4FDD83';
    }
  }

  const getLetterScore = (input_value) => {
    // Adjust these ranges and letters as needed
    if (input_value <= 0.2) {
      return 'F';
    } else if (input_value <= 0.4) {
      return 'D';
    } else if (input_value <= 0.6) {
      return 'C';
    } else if (input_value <= 0.8) {
      return 'B';
    } else {
      return 'A';
    }
  }

  if (data) {
    return (
      <div className="m-10 w-full">
        <h1 className="text-xl font-bold"><a href="/data" className="text-blue-500">Data Runs</a> &gt; {data.name}</h1>
        
        <div className="flex flex-row gap-3">
          <div className="w-1/2 rounded-lg border-gray-500 border-spacing-1 p-5 pt-3 my-3 shadow-sm bg-white">
            <h3 className="text-base font-semibold leading-6 text-gray-900 mb-2">Church Info</h3>
            <div className="text-gray-700 text-sm">{data.address}</div>
            <div className="text-gray-700 text-sm">{data.city}, {data.state} {data.zipcode}</div>
            <div className="text-gray-700 text-sm">{data.phone}</div>
            <div className="text-gray-700 text-sm">{data.webpage}</div>
          </div>

          <div className="w-1/2 rounded-lg border-gray-500 border-spacing-1 p-5 pt-3 my-3 shadow-sm bg-white">
            <h3 className="font-semibold leading-6 text-gray-900 mb-2 text-sm">Contact Info</h3>
            <div className="text-gray-700 text-sm">{data.first_name} {data.last_name}</div>
            <div className="text-gray-700 text-sm">{data.mobile_phone}</div>
            <div className="text-gray-700 text-sm">{data.email}</div>
            {data?.pdf_file && (
              <a href={`https://vr-digital-health-files.s3.us-west-2.amazonaws.com/pdf/${data.pdf_file}`} 
                target="_blank" 
                className="text-blue-500 text-sm">
                Open PDF
              </a>
            )}
          </div>
        </div>
        
        <div className="rounded-lg border-gray-500 border-spacing-1 p-5 pt-3 shadow-sm bg-white">
          <h3 className="text-xl font-semibold leading-6 text-gray-900 mb-2">
            Total Digital Health Score
            <span className={`ml-3 inline-block rounded-full w-[24px] h-[24px] text-white text-center align-middle bg-[${getGradientColor(totalScoreRatio)}]`}>
              {getLetterScore(totalScoreRatio)}
            </span>
          </h3>
          <div className="text-xl font-bold mt-2">{data.digital_search_assesment_score} <span className="text-gray-400 font-normal">/ 750</span></div>
        </div>

        {/* Yelp */}
        <div className="rounded-lg border-gray-500 border-spacing-1 p-5 pt-3 my-3 shadow-sm bg-white">
          <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-2">
            Digital Voice Score
            <span className={`ml-3 inline-block rounded-full w-[24px] h-[24px] text-white text-center align-middle bg-[${getGradientColor(voiceScoreRatio)}]`}>
              {getLetterScore(voiceScoreRatio)}
            </span>
            
          </h3>
          <div className="text-lg font-bold my-2">{data.voice_score} <span className="text-gray-400 font-normal">/ 250</span></div>

          <table className="text-gray-700 w-full">
            <thead>
              <tr>
                <th className="w-1/5 text-left text-sm py-1">Yelp Property</th>
                <th className="w-1/12 text-left text-sm py-1">Score</th>
                <th className="w-1/12 text-left text-sm py-1">Similarity</th>
                <th className="w-1/4 text-left text-sm py-1">Expected</th>
                <th className="w-1/4 text-left text-sm py-1">Actual <span className="font-normal text-gray-400">(Yelp)</span></th>
              </tr>
            </thead>
            <tbody className="">
                <tr>
                  <td className="text-left text-sm py-1">Name</td>
                  <td className="text-left text-sm py-1">{data.yelp_name_score}</td>
                  <td className="text-left text-sm py-1">{data.yelp_name_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 95)</span></td>
                  <td className="text-left text-sm py-1">{data.name}</td>
                  <td className="text-left text-sm py-1">{data.yelp_name}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left text-sm py-1">Category</td>
                  <td className="text-left text-sm py-1">{data.yelp_category_score}</td>
                  {data.yelp_category_score > 0 && (
                    <td className="text-left text-sm py-1 text-green-600">&#10003;</td>
                  )}
                  {data.yelp_category_score == 0 && (
                    <td className="text-left text-sm py-1 text-red-500">&#10007;</td>
                  )}
                  <td className="text-left text-sm py-1">church</td>
                  <td className="text-left text-sm py-1 max-w-[200px]">
                    {data.yelp_category?.length >= 3 && (
                      <div title={data.yelp_category.join(', ')} className="inline truncate">List (hover to view)</div>
                    )}
                    {data.yelp_category?.length < 3 && (
                      <div>{data.yelp_category.join(', ')}</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-left text-sm py-1">Description</td>
                  <td className="text-left text-sm py-1">{data.yelp_description_score}</td>
                  {data.yelp_description_score > 0 && (
                    <td className="text-left text-sm py-1 text-green-600">&#10003;</td>
                  )}
                  {data.yelp_description_score == 0 && (
                    <td className="text-left text-sm py-1 text-red-500">&#10007;</td>
                  )}
                  <td className="text-left text-sm py-1"><i>-- not blank --</i></td>
                  <td className="text-left text-sm py-1 max-w-[200px]">
                    <div title={data.yelp_description} className="truncate">{data.yelp_description}</div>
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left text-sm py-1">Schedule</td>
                  <td className="text-left text-sm py-1">{data.yelp_schedule_score}</td>
                  {data.yelp_schedule_score > 0 && (
                    <td className="text-left text-sm py-1 text-green-600">&#10003;</td>
                  )}
                  {data.yelp_schedule_score == 0 && (
                    <td className="text-left text-sm py-1 text-red-500">&#10007;</td>
                  )}
                  <td className="text-left text-sm py-1">day: &quot;Sun&quot; exists, not &quot;Closed&quot;</td>
                  <td className="text-left text-sm py-1">
                    {data.yelp_schedule?.length > 0 && data.yelp_schedule.find(d => d.day === 'Sun' && d.hours !== 'Closed') && (
                      <div>{data.yelp_schedule.find(d => d.day === 'Sun').hours}</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-left text-sm py-1">Webpage</td>
                  <td className="text-left text-sm py-1">{data.yelp_webpage_score}</td>
                  <td className="text-left text-sm py-1">{data.yelp_webpage_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 85)</span></td>
                  <td className="text-left text-sm py-1">{data.webpage}</td>
                  <td className="text-left text-sm py-1">{data.yelp_webpage}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left text-sm py-1">Phone</td>
                  <td className="text-left text-sm py-1">{data.yelp_phone_score}</td>
                  <td className="text-left text-sm py-1">{data.yelp_phone_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 95)</span></td>
                  <td className="text-left text-sm py-1">{data.phone}</td>
                  <td className="text-left text-sm py-1">{data.yelp_phone}</td>
                </tr>
                <tr>
                  <td className="text-left text-sm py-1">Address</td>
                  <td className="text-left text-sm py-1">{data.yelp_address_score}</td>
                  <td className="text-left text-sm py-1">{data.yelp_address_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 85)</span></td>
                  <td className="text-left text-sm py-1">{data.address}</td>
                  <td className="text-left text-sm py-1">{data.yelp_address}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left text-sm py-1">State</td>
                  <td className="text-left text-sm py-1">{data.yelp_state_score}</td>
                  <td className="text-left text-sm py-1">{data.yelp_state_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 95)</span></td>
                  <td className="text-left text-sm py-1">{data.state}</td>
                  <td className="text-left text-sm py-1">{data.yelp_state}</td>
                </tr>
                <tr>
                  <td className="text-left font-bold">Total</td>
                  <td className="text-left font-bold">{data.voice_score}</td>
                  <td className="text-left"></td>
                  <td className="text-left"></td>
                  <td className="text-left"></td>
                </tr>
            </tbody>
          </table>

        </div>

        {/* Google Maps */}
        <div className="rounded-lg border-gray-500 border-spacing-1 p-5 pt-3 my-3 shadow-sm bg-white">
          <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-2">
            Google Maps Score
            <span className={`ml-3 inline-block rounded-full w-[24px] h-[24px] text-white text-center align-middle bg-[${getGradientColor(googleMapsScoreRatio)}]`}>
              {getLetterScore(googleMapsScoreRatio)}
            </span>
          </h3>
          <div className="text-lg font-bold my-2">{data.google_maps_score} <span className="text-gray-400 font-normal">/ 125</span></div>

          <table className="text-gray-700 w-full">
            <thead>
              <tr>
                <th className="w-1/5 text-left text-sm py-1">Google Property</th>
                <th className="w-1/12 text-left text-sm py-1">Score</th>
                <th className="w-1/12 text-left text-sm py-1">Similarity</th>
                <th className="w-1/4 text-left text-sm py-1">Expected</th>
                <th className="w-1/4 text-left text-sm py-1">Actual <span className="font-normal text-gray-400">(Google)</span></th>
              </tr>
            </thead>
            <tbody className="">
                <tr>
                  <td className="text-left text-sm py-1">Name</td>
                  <td className="text-left text-sm py-1">{data.google_name_score}</td>
                  <td className="text-left text-sm py-1">{data.google_name_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 95)</span></td>
                  <td className="text-left text-sm py-1">{data.name}</td>
                  <td className="text-left text-sm py-1">{data.google_name}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left text-sm py-1">Category</td>
                  <td className="text-left text-sm py-1">{data.google_category_score}</td>
                  {data.google_category_score > 0 && (
                    <td className="text-left text-sm py-1 text-green-600">&#10003;</td>
                  )}
                  {data.google_category_score == 0 && (
                    <td className="text-left text-sm py-1 text-red-500">&#10007;</td>
                  )}
                  <td className="text-left text-sm py-1">church</td>
                  <td className="text-left text-sm py-1 max-w-[200px]">
                    {data.google_category?.length >= 3 && (
                      <div className="inline truncate" title={data.google_category.join(', ')}>List (hover to view)</div>
                    )}
                    {data.google_category?.length < 3 && (
                      <div>{data.google_category.join(', ')}</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-left text-sm py-1">Description</td>
                  <td className="text-left text-sm py-1">{data.google_description_score}</td>
                  {data.google_description_score > 0 && (
                    <td className="text-left text-sm py-1 text-green-600">&#10003;</td>
                  )}
                  {data.google_description_score == 0 && (
                    <td className="text-left text-sm py-1 text-red-500">&#10007;</td>
                  )}
                  <td className="text-left text-sm py-1 max-w-[200px]">
                    <div className="truncate" title={data.apple_description}>{data.apple_description}</div>
                  </td>
                  <td className="text-left text-sm py-1 max-w-[200px]">
                    <div className="truncate" title={data.google_description}>{data.google_description}</div>
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left text-sm py-1">Schedule</td>
                  <td className="text-left text-sm py-1">{data.google_schedule_score}</td>
                  {data.google_schedule_score > 0 && (
                    <td className="text-left text-sm py-1 text-green-600">&#10003;</td>
                  )}
                  {data.google_schedule_score == 0 && (
                    <td className="text-left text-sm py-1 text-red-500">&#10007;</td>
                  )}
                  <td className="text-left text-sm py-1">day: &quot;sunday&quot;, not &quot;Closed&quot;</td>
                  <td className="text-left text-sm py-1">
                    {data.google_schedule?.length > 0 && data.google_schedule.find(d => d.sunday && d.sunday !== 'Closed') !== null && (
                      <div>{data.google_schedule.find(d => d.sunday && d.sunday !== 'Closed').sunday}</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-left text-sm py-1">Webpage</td>
                  <td className="text-left text-sm py-1">{data.google_webpage_score}</td>
                  <td className="text-left text-sm py-1">{data.google_webpage_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 85)</span></td>
                  <td className="text-left text-sm py-1">{data.webpage}</td>
                  <td className="text-left text-sm py-1">{data.google_webpage}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left text-sm py-1">Phone</td>
                  <td className="text-left text-sm py-1">{data.google_phone_score}</td>
                  <td className="text-left text-sm py-1">{data.google_phone_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 95)</span></td>
                  <td className="text-left text-sm py-1">{data.phone}</td>
                  <td className="text-left text-sm py-1">{data.google_phone}</td>
                </tr>
                <tr>
                  <td className="text-left text-sm py-1">Address</td>
                  <td className="text-left text-sm py-1">{data.google_address_score}</td>
                  <td className="text-left text-sm py-1">{data.google_address_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 85)</span></td>
                  <td className="text-left text-sm py-1">{data.address}</td>
                  <td className="text-left text-sm py-1">{data.google_address}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left text-sm py-1">State</td>
                  <td className="text-left text-sm py-1">{data.google_state_score}</td>
                  <td className="text-left text-sm py-1">{data.google_state_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 95)</span></td>
                  <td className="text-left text-sm py-1">{data.state}</td>
                  <td className="text-left text-sm py-1">{data.google_state}</td>
                </tr>
                <tr>
                  <td className="text-left font-bold">Total</td>
                  <td className="text-left font-bold">{data.google_maps_score}</td>
                  <td className="text-left"></td>
                  <td className="text-left"></td>
                  <td className="text-left"></td>
                </tr>
            </tbody>
          </table>

        </div>

        {/* Apple Maps */}
        <div className="rounded-lg border-gray-500 border-spacing-1 p-5 pt-3 my-3 shadow-sm bg-white">
          <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-2">
            Apple Maps Score
            <span className={`ml-3 inline-block rounded-full w-[24px] h-[24px] text-white text-center align-middle bg-[${getGradientColor(appleMapsScoreRatio)}]`}>
              {getLetterScore(appleMapsScoreRatio)}
            </span>
          </h3>
          <div className="text-lg font-bold my-2">{data.apple_maps_score} <span className="text-gray-400 font-normal">/ 125</span></div>

          <table className="text-gray-700 w-full">
            <thead>
              <tr>
                <th className="w-1/5 text-left text-sm py-1">Apple Property</th>
                <th className="w-1/12 text-left text-sm py-1">Score</th>
                <th className="w-1/12 text-left text-sm py-1">Similarity</th>
                <th className="w-1/4 text-left text-sm py-1">Expected</th>
                <th className="w-1/4 text-left text-sm py-1">Actual <span className="font-normal text-gray-400">(Apple)</span></th>
              </tr>
            </thead>
            <tbody className="">
                <tr>
                  <td className="text-left text-sm py-1">Name</td>
                  <td className="text-left text-sm py-1">{data.apple_name_score}</td>
                  <td className="text-left text-sm py-1">{data.apple_name_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 95)</span></td>
                  <td className="text-left text-sm py-1">{data.name}</td>
                  <td className="text-left text-sm py-1">{data.apple_name}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left text-sm py-1">Category</td>
                  <td className="text-left text-sm py-1">{data.apple_category_score}</td>
                  {data.apple_category_score > 0 && (
                    <td className="text-left text-sm py-1 text-green-600">&#10003;</td>
                  )}
                  {data.apple_category_score == 0 && (
                    <td className="text-left text-sm py-1 text-red-500">&#10007;</td>
                  )}
                  <td className="text-left text-sm py-1">church</td>
                  <td className="text-left text-sm py-1 max-w-[200px]">
                    {data.apple_category?.length >= 3 && (
                        <div className="inline truncate" title={data.apple.category.join(', ')}>List (hover to view)</div>
                    )}
                    {data.apple_category?.length < 3 && (
                      <div>{data.apple_category.join(', ')}</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-left text-sm py-1">Description</td>
                  <td className="text-left text-sm py-1">{data.apple_description_score}</td>
                  {data.apple_description_score > 0 && (
                    <td className="text-left text-sm py-1 text-green-600">&#10003;</td>
                  )}
                  {data.apple_description_score == 0 && (
                    <td className="text-left text-sm py-1 text-red-500">&#10007;</td>
                  )}
                  <td className="text-left text-sm py-1 max-w-[200px]">
                    <div className="truncate" title={data.google_description}>{data.google_description}</div>
                  </td>
                  <td className="text-left text-sm py-1 max-w-[200px]">
                    <div className="truncate" title={data.apple_description}>{data.apple_description}</div>
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left text-sm py-1">Schedule</td>
                  <td className="text-left text-sm py-1">{data.apple_schedule_score}</td>
                  {data.apple_schedule_score > 0 && (
                    <td className="text-left text-sm py-1 text-green-600">&#10003;</td>
                  )}
                  {data.apple_schedule_score == 0 && (
                    <td className="text-left text-sm py-1 text-red-500">&#10007;</td>
                  )}
                  <td className="text-left text-sm py-1">day: &quot;sunday&quot; exists</td>
                  <td className="text-left text-sm py-1">
                    {data.apple_schedule?.sunday && (
                      <div>{data.apple_schedule.sunday}</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-left text-sm py-1">Webpage</td>
                  <td className="text-left text-sm py-1">{data.apple_webpage_score}</td>
                  <td className="text-left text-sm py-1">{data.apple_webpage_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 85)</span></td>
                  <td className="text-left text-sm py-1">{data.webpage}</td>
                  <td className="text-left text-sm py-1">{data.apple_webpage}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left text-sm py-1">Phone</td>
                  <td className="text-left text-sm py-1">{data.apple_phone_score}</td>
                  <td className="text-left text-sm py-1">{data.apple_phone_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 95)</span></td>
                  <td className="text-left text-sm py-1">{data.phone}</td>
                  <td className="text-left text-sm py-1">{data.apple_phone}</td>
                </tr>
                <tr>
                  <td className="text-left text-sm py-1">Address</td>
                  <td className="text-left text-sm py-1">{data.apple_address_score}</td>
                  <td className="text-left text-sm py-1">{data.apple_address_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 85)</span></td>
                  <td className="text-left text-sm py-1">{data.address}</td>
                  <td className="text-left text-sm py-1">{data.apple_address}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left text-sm py-1">State</td>
                  <td className="text-left text-sm py-1">{data.apple_state_score}</td>
                  <td className="text-left text-sm py-1">{data.apple_state_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 95)</span></td>
                  <td className="text-left text-sm py-1">{data.state}</td>
                  <td className="text-left text-sm py-1">{data.apple_state}</td>
                </tr>
                <tr>
                  <td className="text-left font-bold">Total</td>
                  <td className="text-left font-bold">{data.apple_maps_score}</td>
                  <td className="text-left"></td>
                  <td className="text-left"></td>
                  <td className="text-left"></td>
                </tr>
            </tbody>
          </table>

        </div>

      {/* Google Search 'church' near me */}
        <div className="rounded-lg border-gray-500 border-spacing-1 p-5 pt-3 my-3 shadow-sm bg-white">
          <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-2">
            Website Authority Score
            <span className={`ml-3 inline-block rounded-full w-[24px] h-[24px] text-white text-center align-middle bg-[${getGradientColor(websiteAuthorityScoreRatio)}]`}>
              {getLetterScore(websiteAuthorityScoreRatio)}
            </span>
          </h3>
          <div className="text-lg font-bold my-2">{data.domain_trust_score} <span className="text-gray-400 font-normal">/ 250</span></div>

          <table className="text-gray-700 w-2/3">
            <thead>
              <tr>
                <th className="w-1/4 text-left text-sm py-1">Position</th>
                <th className="w-3/4 text-left text-sm py-1">Church Name</th>
              </tr>
            </thead>
            <tbody>
              {data.church_search_results.map((result, i) => (
                  <tr key={i} className={i % 2 !== 0 ? 'bg-gray-100' : ''}>
                    <td className="text-left text-sm py-1">{result.split(' - ')[0]}</td>
                    <td className="text-left text-sm py-1">{result.split(' - ')[1]}</td>
                  </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-gray-500 mt-5">Score based on position; 25 pts deducted for each level below #1</p>
        </div>
      </div>
    )
  } else {
    return <></>
  }
}

async function getData(id) {
  try {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/api/fetch-data/${id}/json`)
  return response.json()
  }
  catch (error) {
    console.error('Error fetching data:', error)
  }
}
