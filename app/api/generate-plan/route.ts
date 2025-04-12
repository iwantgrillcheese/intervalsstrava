import { OpenAI } from "openai";

// Create a new instance of the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Ensure this matches the Vercel environment variable
});

export async function POST(req: Request) {
  // Parse the request body (which contains the form data)
  const formData = await req.json();

  // Extract the data from the form
  const { raceType, raceDate, bikeFtp, runPace, swimPace, experience, maxWeeklyHours, restDay } = formData;

  // Create the prompt for OpenAI based on form data
  const prompt = `
   You're the best triathlon coach in the world. Create a personalized training plan for the following triathlon details:
    Race Type: ${raceType}
    Race Date: ${raceDate}
    Bike FTP: ${bikeFtp} watts
    Run Threshold Pace: ${runPace} min/mi
    Swim Threshold Pace: ${swimPace} per 100m
    Experience Level: ${experience}
    Max Weekly Training Hours: ${maxWeeklyHours} hours
    Preferred Rest Day: ${restDay}

    Output a structured training plan with detailed workouts for each week, including swim, bike, run, and rest days.
  `;

  try {
    // Call OpenAI's API to generate the plan
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // Specify the GPT model you want to use
      messages: [{ role: "user", content: prompt }],
    });

    // Get the response text
    const plan = response.choices[0].message.content;

    // Return the training plan as a JSON response
    return new Response(JSON.stringify({ plan }), { status: 200 });
  } catch (error) {
    console.error("Error generating plan:", error);
    return new Response("Error generating plan. Please try again.", { status: 500 });
  }
}
