/*
tutorial: https://www.youtube.com/watch?v=4qNwoAAfnk4
*/

import { config } from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'
import readline from 'readline'

const envConfigs = config().parsed || {}

const openai = new OpenAIApi(new Configuration({
  apiKey: envConfigs['API_KEY']
}))

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

userInterface.prompt()
userInterface.on('line', async input => {
  const result = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{
      name: 'jack',
      role: 'user',
      content: input
    }]
  })

  const topChoice = result.data.choices[0].message
  const role = topChoice?.role
  const content = topChoice?.content

  console.log('\n')
  console.log(`${role}: ${content}`)
  console.log('\n')

  userInterface.prompt()
})