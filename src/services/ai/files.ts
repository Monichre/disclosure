import { AI } from '../../lib/openAI';

const fs = require('fs')
// https://api.openai.com/v1/files

export type UploadFileResponse = {
  id: string
  object: string
  bytes: number
  created_at: number
  filename: string
  purpose: 'fine-tune'
}

export const uploadFile = async (file: string) => {
  // "mydata.jsonl"
  const response = await AI.createFile(fs.createReadStream(file), 'fine-tune')
  console.log('response: ', response)
  return response
}

export const listFiles = async () => await AI.listFiles()

export const retrieveFileContent = async (fileId: string) => {
  const fileContent = await AI.downloadFile(fileId)
  console.log('fileContent: ', fileContent)

  return fileContent
}
