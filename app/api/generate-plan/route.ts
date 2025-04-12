import { OpenAI } from 'openai'

// Create an instance of OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Make sure your key is properly set in Vercel
})

export async function POST(req: Request) {
  const formData = await req.json()

  const { raceType, raceDate, bikeFtp, runPace, swimPace, experience, maxHours, restDay } = formData

  const prompt = `Generate a detailed ${raceType} triathlon training plan starting now until ${raceDate}.
Use the following athlete data:
- FTP: ${bikeFtp}w
- Run Threshold Pace: ${runPace} per mile
- Swim Threshold Pace: ${swimPace} per 100m
- Max Weekly Hours: ${maxHours}
- Experience: ${experience}
- Preferred Rest Day: ${restDay}

Make the plan smart, progressive, and athlete-specific. Just return the first week preview. Use a clean readable format.`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',  // Or use gpt-4 if you want better responses
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    })

    const plan = response.choices?.[0]?.message?.content || 'No plan generated.'

    return NextResponse.json({ plan })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ plan: 'No response from OpenAI.' })
  }
}
