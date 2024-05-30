import fs from 'fs'

export default function Data({ params }) {
  const jsonString = fs.readFileSync(`${process.cwd()}/public/data/${params.id}.json`, 'utf8')
  const data = JSON.parse(jsonString)

  return (
    <div className="m-10 w-1/2">
      <h1 className="text-xl font-bold">{data.name}</h1>
      
      <div className="rounded-lg border-gray-500 border-spacing-1 p-5 pt-3 my-3 shadow-sm bg-white">
        <h3 className="text-base font-semibold leading-6 text-gray-900 mb-2">Church Info</h3>
        <div className="text-gray-700">{data.address}</div>
        <div className="text-gray-700">{data.city}, {data.state} {data.zipcode}</div>
        <div className="text-gray-700">{data.phone}</div>
        <div className="text-gray-700">{data.webpage}</div>
      </div>

      <div className="rounded-lg border-gray-500 border-spacing-1 p-5 pt-3 my-3 shadow-sm bg-white">
        <h3 className="text-base font-semibold leading-6 text-gray-900 mb-2">Contact Info</h3>
        <div className="text-gray-700">{data.first_name} {data.last_name}</div>
        <div className="text-gray-700">{data.mobile_phone}</div>
        <div className="text-gray-700">{data.email}</div>
      </div>
      
      <div className="rounded-lg border-gray-500 border-spacing-1 p-5 pt-3 my-3 shadow-sm bg-white">
        <h3 className="text-base font-semibold leading-6 text-gray-900 mb-2">Scores</h3>
        <div className="text-gray-700">Digital Voice Score: {data.voice_score}</div>
        <div className="text-gray-700">Google Maps Score: {data.google_maps_score}</div>
        <div className="text-gray-700">Apple Maps Score: {data.apple_maps_score}</div>
        <div className="text-gray-700">Website Authority Score: {data.domain_trust_score}</div>
        <div className="font-bold mt-2">Total Digital Health Score: {data.digital_search_assesment_score}</div>
      </div>
    </div>
  )
}
