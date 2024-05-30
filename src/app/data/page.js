import fs from 'fs'
import moment from 'moment'
import path from 'path'

export default function Data({ params }) {
  const fileData = getDirectoryData()

  return (
    <div className="m-10 w-2/3">
      <h1 className="text-xl font-bold">List the files</h1>
      
      <div className="rounded-lg border-gray-500 border-spacing-1 p-5 pt-3 my-3 shadow-sm bg-white">
        {fileData.map((file, index) => (
          <div key={index} className="flex justify-between hover:bg-gray-100">
            <div className="w-1/3">{file.displayName}</div>
            <div>{moment(file.date).local(true).format("MMM DD YYYY, h:mm:ss a")}</div>
            <div>
              <a href={`/data/${file.id}`} className="text-blue-500">View</a>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

function getDirectoryData() {
  const fileData = []
  const files = fs.readdirSync('./public/data')
  files.forEach(file => {
    const filePath = path.join('./public/data', file);
    const stats = fs.statSync(filePath)
    const displayName = file.replace('.json', '').replace(/_/g, ' ')
    fileData.push({
        id: file.replace('.json', ''),
        fileName: file,
        displayName,
        date: stats.mtime
    })
  })
  fileData.sort((a, b) => b.date - a.date)
  return fileData
}
