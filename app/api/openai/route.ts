import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_APIKEY, // defaults to process.env["OPENAI_API_KEY"]
  });
export async function GET(request: Request) {
    return new Response('Hello, form openai!')
}

export async function POST(request: Request) {
    const {userText} = await request.json()

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: userText}]
    })
    const aiMessage = completion.choices[0].message.content
    return NextResponse.json({message: aiMessage}, {status: 200})
}