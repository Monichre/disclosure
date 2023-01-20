import { Configuration, OpenAIApi } from 'openai';

// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing Environment Variable OPENAI_API_KEY')
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

export const AI = new OpenAIApi(configuration)
