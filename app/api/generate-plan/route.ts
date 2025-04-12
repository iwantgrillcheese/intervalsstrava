import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Ensure your API key is in Vercel or .env.local
});

export async function POST(req: Request) {
  try {
    // Get the data sent from the frontend
    const { raceType, raceDate, bikeFTP, runPace, swimPace, experienceLevel, maxHoursPerWeek, preferredRestDay } = await req.json();

    // Build a custom prompt using the user inputs
    const prompt = `
      Generate a personalized training plan for a triathlon. The user is participating in a ${raceType} race on ${raceDate}.
      The plan should include daily workouts, rest days, and be tailored based on the user's experience level and available training time.
      The user has the following details:
      - Bike FTP: ${bikeFTP} watts
      - Run Threshold Pace: ${runPace} min/mile
      - Swim Threshold Pace: ${swimPace} min/100m
      - Experience Level: ${experienceLevel}
      - Maximum training hours per week: ${maxHoursPerWeek}
      - Preferred Rest Day: ${preferredRestDay}

      Generate the plan to cover all aspects of the race: endurance, speed, technique, and recovery. It should be 12 weeks long.
    `;

    // Make the API call to OpenAI (Use the chat model)
    const response = await openai.chat.completions.create({
      model: "gpt-4",  // Using GPT-4, or use gpt-3.5-turbo if you prefer that
      messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: prompt }],
      max_tokens: 1000,  // Adjust as needed
    });

    // Ensure the response contains valid plan data
    if (!response || !response.choices || !response.choices[0].message.content) {
      throw new Error("No plan returned.");
    }

    // Return the generated training plan
    return new Response(JSON.stringify({ plan: response.choices[0].message.content }), {
      status: 200,
    });
  } catch (error: any) {
    // Log the error and return a failure response
    console.error("Error generating plan:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Error generating plan" }),
      { status: 500 }
    );
  }
}
