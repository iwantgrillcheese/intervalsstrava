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
      model: 'text-davinci-003',
      prompt: prompt || 'Please generate a training plan for a Half Ironman race.',
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
