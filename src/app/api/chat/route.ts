import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'
// import { NextResponse } from 'next/server'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

export const runtime = 'edge'

export const POST = async (request: Request) => {
  const { messages } = await request.json()
  console.log(messages)

  // process with openai
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages
  })

  const stream = OpenAIStream(response, {
    onStart: () => { console.log('start') },
    onToken: (token) => { console.log(token) },
    onCompletion: (completion) => { console.log(completion) }
  })

  // return NextResponse.json({ message: 'Hello from the API!' })
  console.log(messages)
  console.log(response)
  console.log(stream)
  return new StreamingTextResponse(stream)
}
