'use client'

import { useEffect, useState } from 'react'

export default function Data({ params }) {
  const [run, setRun] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    getData(params.id).then((runData) => {
      setRun(runData)
      console.log(runData)
    })
  },[])

  useEffect(() => {
    if (run?.data_file) {
      getJson(run.data_file).then((data) => {
        setData(data)
        console.log(data)
      })
    }
  }, [run?.data_file])

  if (data) {
    return (
      <div className="m-10 w-full">
        <h1 className="text-xl font-bold"><a href="/data" className="text-blue-500">DHA Data Files</a> / {data.name}</h1>
        
        <div className="flex flex-row gap-3">
          <div className="w-1/2 rounded-lg border-gray-500 border-spacing-1 p-5 pt-3 my-3 shadow-sm bg-white">
            <h3 className="text-base font-semibold leading-6 text-gray-900 mb-2">Church Info</h3>
            <div className="text-gray-700">{data.address}</div>
            <div className="text-gray-700">{data.city}, {data.state} {data.zipcode}</div>
            <div className="text-gray-700">{data.phone}</div>
            <div className="text-gray-700">{data.webpage}</div>
          </div>

          <div className="w-1/2 rounded-lg border-gray-500 border-spacing-1 p-5 pt-3 my-3 shadow-sm bg-white">
            <h3 className="text-base font-semibold leading-6 text-gray-900 mb-2">Contact Info</h3>
            <div className="text-gray-700">{data.first_name} {data.last_name}</div>
            <div className="text-gray-700">{data.mobile_phone}</div>
            <div className="text-gray-700">{data.email}</div>
          </div>
        </div>
        
        <div className="rounded-lg border-gray-500 border-spacing-1 p-5 pt-3 shadow-sm bg-white">
          <h3 className="text-xl font-semibold leading-6 text-gray-900 mb-2">Total Digital Health Score</h3>
          <div className="text-xl font-bold mt-2">{data.digital_search_assesment_score} <span className="text-gray-400 font-normal">/ 750</span></div>
        </div>

        {/* Yelp */}
        <div className="rounded-lg border-gray-500 border-spacing-1 p-5 pt-3 my-3 shadow-sm bg-white">
          <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-2">Digital Voice Score</h3>
          <div className="text-lg font-bold my-2">{data.voice_score} <span className="text-gray-400 font-normal">/ 250</span></div>

          <table className="text-gray-700 w-full">
            <thead>
              <tr>
                <th className="w-1/5 text-left text-md">Yelp Property</th>
                <th className="w-1/8 text-left text-md">Score</th>
                <th className=" w-1/8 text-left text-md">Similarity</th>
                <th className="w-1/4 text-left text-md">Expected</th>
                <th className="w-1/4 text-left text-md">Actual <span className="font-normal text-gray-400">(Yelp)</span></th>
              </tr>
            </thead>
            <tbody className="">
                <tr>
                  <td className="text-left">Name</td>
                  <td className="text-left">{data.yelp_name_score}</td>
                  <td className="text-left">{data.yelp_name_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 95)</span></td>
                  <td className="text-left">{data.name}</td>
                  <td className="text-left">{data.yelp_name}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left">Category</td>
                  <td className="text-left">{data.yelp_category_score}</td>
                  {data.yelp_category_score > 0 && (
                    <td className="text-left text-green-600">&#10003;</td>
                  )}
                  {data.yelp_category_score == 0 && (
                    <td className="text-left text-red-500">&#10007;</td>
                  )}
                  <td className="text-left">church</td>
                  <td className="text-left max-w-[200px]">
                    {data.yelp_category?.length >= 3 && (
                      <>
                        <div data-tooltip-target="tooltip-yc1" className="inline truncate">List (hover to view)</div>
                        {data.yelp_category && (
                          <div id="tooltip-yc1" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            {data.yelp_category.join(', ')}
                            <div className="tooltip-arrow" data-popper-arrow></div>
                          </div>
                        )}
                      </>
                    )}
                    {data.yelp_category?.length < 3 && (
                      <div>{data.yelp_category.join(', ')}</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-left">Description</td>
                  <td className="text-left">{data.yelp_description_score}</td>
                  {data.yelp_description_score > 0 && (
                    <td className="text-left text-green-600">&#10003;</td>
                  )}
                  {data.yelp_description_score == 0 && (
                    <td className="text-left text-red-500">&#10007;</td>
                  )}
                  <td className="text-left"><i>-- not blank --</i></td>
                  <td className="text-left max-w-[200px]">
                    <div data-tooltip-target="tooltip-yd1" className="truncate">{data.yelp_description}</div>
                    {data.yelp_description && (
                      <div id="tooltip-yd1" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        {data.yelp_description}
                        <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>
                    )}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left">Schedule</td>
                  <td className="text-left">{data.yelp_schedule_score}</td>
                  {data.yelp_schedule_score > 0 && (
                    <td className="text-left text-green-600">&#10003;</td>
                  )}
                  {data.yelp_schedule_score == 0 && (
                    <td className="text-left text-red-500">&#10007;</td>
                  )}
                  <td className="text-left">day: &quot;Sun&quot; exists, not &quot;Closed&quot;</td>
                  <td className="text-left">
                    {data.yelp_schedule?.length > 0 && data.yelp_schedule.find(d => d.day === 'Sun' && d.hours !== 'Closed') && (
                      <div>{data.yelp_schedule.find(d => d.day === 'Sun').hours}</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-left">Webpage</td>
                  <td className="text-left">{data.yelp_webpage_score}</td>
                  <td className="text-left">{data.yelp_webpage_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 85)</span></td>
                  <td className="text-left">{data.webpage}</td>
                  <td className="text-left">{data.yelp_webpage}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left">Phone</td>
                  <td className="text-left">{data.yelp_phone_score}</td>
                  <td className="text-left">{data.yelp_phone_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 95)</span></td>
                  <td className="text-left">{data.phone}</td>
                  <td className="text-left">{data.yelp_phone}</td>
                </tr>
                <tr>
                  <td className="text-left">Address</td>
                  <td className="text-left">{data.yelp_address_score}</td>
                  <td className="text-left">{data.yelp_address_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 85)</span></td>
                  <td className="text-left">{data.address}</td>
                  <td className="text-left">{data.yelp_address}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left">State</td>
                  <td className="text-left">{data.yelp_state_score}</td>
                  <td className="text-left">{data.yelp_state_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 95)</span></td>
                  <td className="text-left">{data.state}</td>
                  <td className="text-left">{data.yelp_state}</td>
                </tr>
                <tr>
                  <td className="text-left border-b-[1px] border-gray-300">Fudge Factor</td>
                  <td className="text-left border-b-[1px] border-gray-300">34</td>
                  <td className="text-left"></td>
                  <td className="text-left"></td>
                  <td className="text-left"></td>
                </tr>
                <tr>
                  <td className="text-left font-bold pt-2">Total</td>
                  <td className="text-left font-bold pt-2">{data.voice_score}</td>
                  <td className="text-left"></td>
                  <td className="text-left"></td>
                  <td className="text-left"></td>
                </tr>
            </tbody>
          </table>

        </div>

        {/* Google Maps */}
        <div className="rounded-lg border-gray-500 border-spacing-1 p-5 pt-3 my-3 shadow-sm bg-white">
          <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-2">Google Maps Score</h3>
          <div className="text-lg font-bold my-2">{data.google_maps_score} <span className="text-gray-400 font-normal">/ 125</span></div>

          <table className="text-gray-700 w-full">
            <thead>
              <tr>
                <th className="w-1/5 text-left text-md">Google Property</th>
                <th className="w-1/8 text-left text-md">Score</th>
                <th className="w-1/8 text-left text-md">Similarity</th>
                <th className="w-1/4 text-left text-md">Expected</th>
                <th className="w-1/4 text-left text-md">Actual <span className="font-normal text-gray-400">(Google)</span></th>
              </tr>
            </thead>
            <tbody className="">
                <tr>
                  <td className="text-left">Name</td>
                  <td className="text-left">{data.google_name_score}</td>
                  <td className="text-left">{data.google_name_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 95)</span></td>
                  <td className="text-left">{data.name}</td>
                  <td className="text-left">{data.google_name}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left">Category</td>
                  <td className="text-left">{data.google_category_score}</td>
                  {data.google_category_score > 0 && (
                    <td className="text-left text-green-600">&#10003;</td>
                  )}
                  {data.google_category_score == 0 && (
                    <td className="text-left text-red-500">&#10007;</td>
                  )}
                  <td className="text-left">church</td>
                  <td className="text-left max-w-[200px]">
                    {data.google_category?.length >= 3 && (
                      <>
                        <div data-tooltip-target="tooltip-gc1" className="inline truncate">List (hover to view)</div>
                        {data.google_category && (
                          <div id="tooltip-gc1" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            {data.google_category.join(', ')}
                            <div className="tooltip-arrow" data-popper-arrow></div>
                          </div>
                        )}
                      </>
                    )}
                    {data.google_category?.length < 3 && (
                      <div>{data.google_category.join(', ')}</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-left">Description</td>
                  <td className="text-left">{data.google_description_score}</td>
                  {data.google_description_score > 0 && (
                    <td className="text-left text-green-600">&#10003;</td>
                  )}
                  {data.google_description_score == 0 && (
                    <td className="text-left text-red-500">&#10007;</td>
                  )}
                  <td className="text-left max-w-[200px]">
                    <div data-tooltip-target="tooltip-gd1" className="truncate">{data.apple_description}</div>
                    {data.apple_description && (
                      <div id="tooltip-gd1" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        {data.apple_description}
                        <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>
                    )}
                  </td>
                  <td className="text-left max-w-[200px]">
                    <div data-tooltip-target="tooltip-gd2" className="truncate">{data.google_description}</div>
                    {data.google_description && (
                      <div id="tooltip-gd2" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        {data.google_description}
                        <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>
                    )}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left">Schedule</td>
                  <td className="text-left">{data.google_schedule_score}</td>
                  {data.google_schedule_score > 0 && (
                    <td className="text-left text-green-600">&#10003;</td>
                  )}
                  {data.google_schedule_score == 0 && (
                    <td className="text-left text-red-500">&#10007;</td>
                  )}
                  <td className="text-left">day: &quot;sunday&quot;, not &quot;Closed&quot;</td>
                  <td className="text-left">
                    {data.google_schedule?.length > 0 && data.google_schedule.find(d => d.sunday && d.sunday !== 'Closed') !== null && (
                      <div>{data.google_schedule.find(d => d.sunday && d.sunday !== 'Closed').sunday}</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-left">Webpage</td>
                  <td className="text-left">{data.google_webpage_score}</td>
                  <td className="text-left">{data.google_webpage_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 85)</span></td>
                  <td className="text-left">{data.webpage}</td>
                  <td className="text-left">{data.google_webpage}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left">Phone</td>
                  <td className="text-left">{data.google_phone_score}</td>
                  <td className="text-left">{data.google_phone_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 95)</span></td>
                  <td className="text-left">{data.phone}</td>
                  <td className="text-left">{data.google_phone}</td>
                </tr>
                <tr>
                  <td className="text-left">Address</td>
                  <td className="text-left">{data.google_address_score}</td>
                  <td className="text-left">{data.google_address_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 85)</span></td>
                  <td className="text-left">{data.address}</td>
                  <td className="text-left">{data.google_address}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left">State</td>
                  <td className="text-left">{data.google_state_score}</td>
                  <td className="text-left">{data.google_state_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 95)</span></td>
                  <td className="text-left">{data.state}</td>
                  <td className="text-left">{data.google_state}</td>
                </tr>
                <tr>
                  <td className="text-left border-b-[1px] border-gray-300">Fudge Factor</td>
                  <td className="text-left border-b-[1px] border-gray-300">6</td>
                  <td className="text-left"></td>
                  <td className="text-left"></td>
                  <td className="text-left"></td>
                </tr>
                <tr>
                  <td className="text-left font-bold pt-2">Total</td>
                  <td className="text-left font-bold pt-2">{data.google_maps_score}</td>
                  <td className="text-left"></td>
                  <td className="text-left"></td>
                  <td className="text-left"></td>
                </tr>
            </tbody>
          </table>

        </div>

        {/* Apple Maps */}
        <div className="rounded-lg border-gray-500 border-spacing-1 p-5 pt-3 my-3 shadow-sm bg-white">
          <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-2">Apple Maps Score</h3>
          <div className="text-lg font-bold my-2">{data.apple_maps_score} <span className="text-gray-400 font-normal">/ 125</span></div>

          <table className="text-gray-700 w-full">
            <thead>
              <tr>
                <th className="w-1/5 text-left text-md">Apple Property</th>
                <th className="w-1/8 text-left text-md">Score</th>
                <th className="w-1/8 text-left text-md">Similarity</th>
                <th className="w-1/4 text-left text-md">Expected</th>
                <th className="w-1/4 text-left text-md">Actual <span className="font-normal text-gray-400">(Apple)</span></th>
              </tr>
            </thead>
            <tbody className="">
                <tr>
                  <td className="text-left">Name</td>
                  <td className="text-left">{data.apple_name_score}</td>
                  <td className="text-left">{data.apple_name_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 95)</span></td>
                  <td className="text-left">{data.name}</td>
                  <td className="text-left">{data.apple_name}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left">Category</td>
                  <td className="text-left">{data.apple_category_score}</td>
                  {data.apple_category_score > 0 && (
                    <td className="text-left text-green-600">&#10003;</td>
                  )}
                  {data.apple_category_score == 0 && (
                    <td className="text-left text-red-500">&#10007;</td>
                  )}
                  <td className="text-left">church</td>
                  <td className="text-left max-w-[200px]">
                    {data.apple_category?.length >= 3 && (
                      <>
                        <div data-tooltip-target="tooltip-ac1" className="inline truncate">List (hover to view)</div>
                        {data.apple_category && (
                          <div id="tooltip-ac1" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            {data.apple_category.join(', ')}
                            <div className="tooltip-arrow" data-popper-arrow></div>
                          </div>
                        )}
                      </>
                    )}
                    {data.apple_category?.length < 3 && (
                      <div>{data.apple_category.join(', ')}</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-left">Description</td>
                  <td className="text-left">{data.apple_description_score}</td>
                  {data.apple_description_score > 0 && (
                    <td className="text-left text-green-600">&#10003;</td>
                  )}
                  {data.apple_description_score == 0 && (
                    <td className="text-left text-red-500">&#10007;</td>
                  )}
                  <td className="text-left max-w-[200px]">
                    <div data-tooltip-target="tooltip-ad1" className="truncate">{data.google_description}</div>
                    {data.google_description && (
                      <div id="tooltip-ad1" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        {data.google_description}
                        <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>
                    )}
                  </td>
                  <td className="text-left max-w-[200px]">
                    <div data-tooltip-target="tooltip-ad2" className="truncate">{data.apple_description}</div>
                    {data.apple_description && (
                      <div id="tooltip-ad2" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        {data.apple_description}
                        <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>
                    )}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left">Schedule</td>
                  <td className="text-left">{data.apple_schedule_score}</td>
                  {data.apple_schedule_score > 0 && (
                    <td className="text-left text-green-600">&#10003;</td>
                  )}
                  {data.apple_schedule_score == 0 && (
                    <td className="text-left text-red-500">&#10007;</td>
                  )}
                  <td className="text-left">day: &quot;sunday&quot; exists</td>
                  <td className="text-left">
                    {data.apple_schedule?.sunday && (
                      <div>{data.apple_schedule.sunday}</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-left">Webpage</td>
                  <td className="text-left">{data.apple_webpage_score}</td>
                  <td className="text-left">{data.apple_webpage_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 85)</span></td>
                  <td className="text-left">{data.webpage}</td>
                  <td className="text-left">{data.apple_webpage}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left">Phone</td>
                  <td className="text-left">{data.apple_phone_score}</td>
                  <td className="text-left">{data.apple_phone_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 95)</span></td>
                  <td className="text-left">{data.phone}</td>
                  <td className="text-left">{data.apple_phone}</td>
                </tr>
                <tr>
                  <td className="text-left">Address</td>
                  <td className="text-left">{data.apple_address_score}</td>
                  <td className="text-left">{data.apple_address_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 85)</span></td>
                  <td className="text-left">{data.address}</td>
                  <td className="text-left">{data.apple_address}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="text-left">State</td>
                  <td className="text-left">{data.apple_state_score}</td>
                  <td className="text-left">{data.apple_state_similarity_score} <span className="font-normal text-gray-400 text-sm">(&gt; 95)</span></td>
                  <td className="text-left">{data.state}</td>
                  <td className="text-left">{data.apple_state}</td>
                </tr>
                <tr>
                  <td className="text-left border-b-[1px] border-gray-300">Fudge Factor</td>
                  <td className="text-left border-b-[1px] border-gray-300">6</td>
                  <td className="text-left"></td>
                  <td className="text-left"></td>
                  <td className="text-left"></td>
                </tr>
                <tr>
                  <td className="text-left font-bold pt-2">Total</td>
                  <td className="text-left font-bold pt-2">{data.apple_maps_score}</td>
                  <td className="text-left"></td>
                  <td className="text-left"></td>
                  <td className="text-left"></td>
                </tr>
            </tbody>
          </table>

        </div>

      {/* Google Search 'church' near me */}
        <div className="rounded-lg border-gray-500 border-spacing-1 p-5 pt-3 my-3 shadow-sm bg-white">
          <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-2">Website Authority Score</h3>
          <div className="text-lg font-bold my-2">{data.domain_trust_score} <span className="text-gray-400 font-normal">/ 250</span></div>

          <table className="text-gray-700 w-2/3">
            <thead>
              <tr>
                <th className="w-1/4 text-left text-md">Position</th>
                <th className="w-3/4 text-left text-md">Church Name</th>
              </tr>
            </thead>
            <tbody>
              {data.church_search_results.map((result, i) => (
                  <tr key={i} className={i % 2 !== 0 ? 'bg-gray-100' : ''}>
                    <td className="text-left">{result.split(' - ')[0]}</td>
                    <td className="text-left">{result.split(' - ')[1]}</td>
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/api/fetch-data/${id}`)
  return response.json()
  }
  catch (error) {
    console.error('Error fetching data:', error)
  }
}

async function getJson(jsonFile) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/api/fetch-run-data/${jsonFile}`)
    return response.json()
  }
  catch (error) {
    console.error('Error fetching data:', error)
  }
}