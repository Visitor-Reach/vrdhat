'use server'

import fs from 'fs'
import path from 'path'

export async function getDirectory(dirName) {
  const fileData = []
  const files = fs.readdirSync(dirName)
  files.forEach(file => {
    const filePath = path.join(dirName, file);
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