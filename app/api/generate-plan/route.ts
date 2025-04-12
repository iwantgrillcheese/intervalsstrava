import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Ensure this is set in Vercel environment variables
});

// Define the route handler
export async function POST(req: Request) {
  try {
    // Extract data from the request body
    const { prompt } = await req.json();

    // Make the OpenAI API call
    const result = await openai.completions.create({
      model: 'gpt-3.5-turbo',
      prompt: prompt || 'You are the best triathlon coach in the world. Please generate a professional level triathlon plan based on the inputs from the form',
      max_tokens: 100
    });

    // Return the result to the client
    return new Response(JSON.stringify({ plan: result.choices[0].text }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error generating plan:', error);
    return new Response(JSON.stringify({ error: 'Error generating plan' }), {
      status: 500,
    });
  }
}
