import { OpenAI } from 'openai';

// Initialize OpenAI client with the environment variable from Vercel
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Ensure your API key is set in Vercel environment variables
});

export async function generatePlan(req, res) {
  try {
    // Replace with actual logic to interact with OpenAI and return a response
    const result = await openai.completions.create({
      model: 'text-davinci-003',  // Change to appropriate OpenAI model
      prompt: 'Please generate a training plan for a Half Ironman race.',
      max_tokens: 100
    });

    // Return response to frontend
    return res.status(200).json({ plan: result.choices[0].text });
  } catch (error) {
    console.error('Error generating plan:', error);
    return res.status(500).json({ error: 'Error generating plan' });
  }
}
