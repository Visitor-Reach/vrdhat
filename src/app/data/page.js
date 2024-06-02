'use client'

import { useEffect, useState } from 'react'

import { getDirectory } from '@/api/misc/files'
import moment from 'moment'

const dateFormatString = "MMM DD YYYY, h:mm:ss a"

export default function Data() {
  const [data, setData] = useState([])

  useEffect(() => {
    getData(1, 10).then((data) => {
      setData(data)
    })
  },[])

  return (
    <div className="m-10 w-2/3 h-[100vh]">
      <h1 className="text-xl font-bold">DHA Data Files</h1>
      
      <div className="rounded-lg border-gray-500 border-spacing-1 p-5 my-3 shadow-sm bg-white">
        {data.map((item, i) => (
          <div key={item.id} className={'flex justify-between hover:bg-gray-200 ' + (i % 2 != 0 ? 'bg-gray-100' : '')}>
            <div className="w-1/3 font-bold">{item.church_name}</div>
            <div className="w-1/3">{moment(item.created_at * 1000).format(dateFormatString)}</div>
            <div>
              <a href={`/data/${item.id}`} className="text-blue-500">View</a>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

async function getData(page, page_size) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/api/fetch-runs?page=${page}&page_size=${page_size}`)
  return response.json()
}

