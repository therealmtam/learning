import fs from 'fs'
import { openai } from './api.js'

const upload = async () => {
  try {
    const response = await openai.createFile(
      fs.createReadStream('./trainingData_prepared.jsonl'),
      "fine-tune"
    );
    console.log('File ID: ', response.data.id)
  } catch (err) {
    console.log('err: ', err)
  }
}

upload()