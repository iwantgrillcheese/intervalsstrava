// app/api/generate-plan/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      raceType,
      raceDate,
      bikeFTP,
      runPace,
      swimPace,
      experience,
      maxHours,
      restDay
    } = body

    const prompt = `You're an expert triathlon coach.
Create a one-week training plan for an athlete with the following inputs:
- Race Type: ${raceType}
- Race Date: ${raceDate}
- Bike FTP: ${bikeFTP} watts
- Run Threshold Pace: ${runPace} min/mi
- Swim Threshold Pace: ${swimPace} per 100m
- Experience Level: ${experience}
- Max Weekly Training Hours: ${maxHours}
- Preferred Rest Day: ${restDay}

Make it readable. Format each day like:
Monday: Swim - 2,000m endurance | Bike - 45min Z2 | Run - Off`

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a triathlon coach.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      })
    })

    const data = await openaiRes.json()
    const reply = data.choices?.[0]?.message?.content || 'No response from OpenAI.'

    return NextResponse.json({ plan: reply })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}

