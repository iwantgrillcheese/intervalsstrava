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

    // Make the API call to OpenAI
    const response = await openai.completions.create({
      model: "gpt-4",  // Switch to GPT-4 if available
      prompt: prompt,
      max_tokens: 1000,  // You can adjust this if needed
    });

    // Ensure the response contains valid plan data
    if (!response || !response.choices || !response.choices[0].text) {
      throw new Error("No plan returned.");
    }

    // Return the generated training plan
    return new Response(JSON.stringify({ plan: response.choices[0].text }), {
      status: 200,
    });
  } catch (error) {
    // Log the error and return a failure response
    console.error("Error generating plan:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Error generating plan" }),
      { status: 500 }
    );
  }
}
