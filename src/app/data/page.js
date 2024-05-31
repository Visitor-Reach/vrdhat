'use client'

import { useEffect, useState } from 'react'

import { getDirectory } from '@/api/misc/files'
import moment from 'moment'

const dateFormatString = "MMM DD YYYY, h:mm:ss a"

export default function Data() {
  const [fileData, setFileData] = useState([])

  useEffect(() => {
    getDirectory('./public/data').then(data => {
      setFileData(data)
    })
  },[])

  return (
    <div className="m-10 w-2/3">
      <h1 className="text-xl font-bold">DHA Data Files</h1>
      
      <div className="rounded-lg border-gray-500 border-spacing-1 p-5 my-3 shadow-sm bg-white">
        {fileData.map((file, index) => (
          <div key={index} className="flex justify-between hover:bg-gray-100">
            <div className="w-1/3">{file.displayName}</div>
            <div className="w-1/3">{moment(file.date).format(dateFormatString)}</div>
            <div>
              <a href={`/data/${file.id}`} className="text-blue-500">View</a>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

