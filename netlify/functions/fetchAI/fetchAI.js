import { Configuration, OpenAIApi } from 'openai'
import { process } from './env'


const configuration = new Configuration({
    //organization: 'org-XC0s1PRokBlhgvcw6fyI5iQa',
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)


const handler = async (event) => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: event.body, 
      max_tokens: 50,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        reply: response.data
       }),
     
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
