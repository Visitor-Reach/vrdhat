'use client'

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useCallback, useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

import moment from 'moment'

const dateFormatString = "MMM DD YYYY, h:mm:ss a"

export default function Data() {
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get("page")) || 1
  const pageSize = parseInt(searchParams.get("page_size")) || 15

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  useEffect(() => {
    getData(page, pageSize).then((results) => {
      setData(results.items)
      setTotal(results.total)
    })
  },[page, pageSize])

  const start = 1 + (page - 1) * pageSize
  const end = start + data.length - 1
  const totalPages = Math.ceil(total / pageSize)
  
  const pageNumbers = getPageNumbers(pageSize, totalPages, page)

  function getPageNumbers(pageSize, totalPages, currentPage) {
    const maxPages = 11
    let startPage = currentPage - Math.floor(maxPages / 2)
    let endPage = currentPage + Math.floor(maxPages / 2)
    console.log(Math.floor(maxPages / 2))
    if (startPage <= 0) {
      startPage = 1
    }
    if (endPage > totalPages) {
      endPage = totalPages
    }

    // Create an array of page numbers
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }
    return pageNumbers;
}


  return (
    <div className="m-10 w-full h-[100vh]">
      <h1 className="text-xl font-bold">Data Runs ({total})</h1>
      
      <div className="rounded-lg border-gray-500 border-spacing-1 p-5 my-3 shadow-sm bg-white">

        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="w-1/4 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Church
                  </th>
                  <th scope="col" className="w-1/4 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Contact Name
                  </th>
                  <th scope="col" className="w-1/4 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Email
                  </th>
                  <th scope="col" className="w-1/4 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <a href="#" className="group inline-flex">
                      Run Date
                      <span className="ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200">
                        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </a>
                  </th>
                  <th scope="col" className="w-1/8 pl-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                    View
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
              {data.map((item, i) => (
                  <tr key={item.id}>
                    <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {item.church_name}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-0">
                      {item?.first_name} {item?.last_name}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-0">
                      {item?.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">{moment(item.created_at * 1000).format(dateFormatString)}</td>
                    <td className="relative whitespace-nowrap py-3 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href={`/data/${item.id}`} className="text-indigo-600 hover:text-indigo-900">View</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-0 py-4">

          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{start}</span> to <span className="font-medium">{end}</span> of{' '}
                <span className="font-medium">{total}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <a
                  key="back"
                  href={parseInt(page) <= 1 ? '#' : pathname + '?' + createQueryString('page', parseInt(page) - 1)}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </a>
                {pageNumbers.map((p, i) => (
                  <div key={i}>
                  {parseInt(page) === p && (
                    <a
                      key={p}
                      href="#"
                      aria-current="page"
                      className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {p}
                    </a>
                  )}
                  {parseInt(page) !== p && (
                    <a key={p} href={pathname + '?' + createQueryString('page', p.toString())}
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      {p}
                    </a>
                  )}
                  </div>
                ))}
                <a
                  key="next"
                  href={parseInt(page) >= totalPages ? '#' : pathname + '?' + createQueryString('page', parseInt(page) + 1)}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </a>
              </nav>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  )
}

async function getData(page, page_size) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/api/fetch-runs?page=${page}&page_size=${page_size}`)
  return response.json()
}

